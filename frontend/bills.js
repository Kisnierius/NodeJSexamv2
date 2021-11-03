
const message = document.getElementById('message');
const params = new URLSearchParams(document.location.search.substring(1));
const groupId = params.get('group');
const tableBody = document.querySelector('tbody');


function create(tag) {
  return document.createElement(tag);
}


function showBills(bill) {
  const tr = create('tr');
  const tdId = create('td');
  const tdDescription = create('td');
  const tdAmount = create('td');
  tdId.innerText = bill.id;
  tdDescription.innerText = bill.description;
  tdAmount.innerText = '€ ' + bill.amount;
  tr.append(tdId, tdDescription, tdAmount);
  tableBody.append(tr);
}

function displayBillsByGroupId() {

  const options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  fetch(`http://localhost:3000/bills/${groupId}`, options)
    .then(response => {
      if (!response.ok) {
        message.innerText = 'You are not logged in';
      }
      return response.json();
    })
    .then(data => {
      data.forEach(bill => {
        showBills(bill);
      });

    })
    .catch(error => console.log(error.message));
}

displayBillsByGroupId();

function addBill(bill) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(bill)
  };

  fetch('http://localhost:3000/bills', options)
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
    .then(data => {
      message.innerText = data.msg;
      tableBody.innerHTML = '';
      displayBillsByGroupId();
    })
    .catch((error) => {
      if (error.data) {
        message.innerText = `Error! ${error.data.msg}\n${error.data.error.details[0].message}`;
      } else {
        message.innerText = 'Error!\nSomething went wrong';
      }
    });
}

function addBillHandler(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const bill = { groupId, amount, description };
  addBill(bill);
}

document.getElementById('add-bill').addEventListener('submit', addBillHandler);