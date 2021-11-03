/* eslint-disable */

const message = document.getElementById('message');

function registerUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  fetch('http://localhost:3000/register', options)
    .then((response) => {
      if (!response.ok) {
        return response.json()
          .then((errResponseData) => {
            const error = new Error('Something went wrong!');
            error.data = errResponseData;
            throw error;
          });
      }
      return response.json();
    })
    .then((data) => {
      if (data.code === 'ER_DUP_ENTRY') {
        message.innerText = 'Failed to register! Email allready exists';
      } else {
        message.innerText = 'Registered!';
      }
    })
    .catch((error) => {
      if (error.data) {
        message.innerText = `Failed to register!\n${error.data.details[0].message}`;
      } else {
        message.innerText = 'Failed to register!\nSomething went wrong';
      }
    });
}

function userRegistrationHandler(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;

  if (password !== password2) {
    message.innerText = 'The passwords doesn\'t match';
    return;
  }

  const user = { email, password };
  registerUser(user);
}

document.getElementById('register-form').addEventListener('submit', userRegistrationHandler);
