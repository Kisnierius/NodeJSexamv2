/* eslint-disable */

const message = document.getElementById('message');
const idGrid = document.getElementById('groups');

function create(tag) {
  return document.createElement(tag);
}

function showGroup(group) {
  const groupDiv = create('div');
  groupDiv.classList.add('group');
  groupDiv.addEventListener('click', async () => {
    location = `bills.html?group=${group.id}`;
  });
  const id = create('h1');
  const name = create('p');
  id.innerText = 'ID: ' + group.id;
  name.innerText = group.name;
  groupDiv.append(id, name);
  idGrid.append(groupDiv);
}

function displayGroups() {
  const options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  fetch('http://localhost:3000/accounts', options)
    .then(response => {
      if (!response.ok) {
        message.innerText = 'You are not logged in';
      }
      return response.json();
    })
    .then(data => {
      data.forEach(group => {
        showGroup(group);
      });
      
    })
    .catch(error => console.log(error.message));
}

displayGroups();

function addGroup(group) {
  const options = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(group)
};

  fetch('http://localhost:3000/accounts', options)
  .then(response => {
    if (!response.ok) {
      message.innerText = 'You are not logged in';
    }
    return response.json();
  })
  .then(data => {
    idGrid.innerHTML = '';
    displayGroups();
  })
  .catch(error => console.log(error.message));
}

function addGroupHandler(event) {
  event.preventDefault();
  const groupId = document.getElementById('group-number').value;
  const group = { groupId };
  addGroup(group);
}

document.getElementById('add-group').addEventListener('submit', addGroupHandler);