/* ----------------------
-------------------------
GLOBAL VARIABLES
-------------------------
---------------------- */

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


/* ----------------------
-------------------------
FETCH AND DISPLAY EMPLOYEE DATA
-------------------------
---------------------- */

// fetch data from API
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));


function displayEmployees(employeeData) {
  employees = employeeData;
  // store the employee HTML as we create it
  let employeeHTML = '';
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let state = employee.location.state;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}"/>
        <div class="text-container">
          <h2 class="name hover-underline-animation">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}, ${state}</p>
        </div>
      </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}


function displayModal(index) {
  // use object destructuring make our template literal cleaner
  let {
    name,
    dob,
    phone,
    email,
    location: {
      city,
      street,
      state,
      postcode
    },
    picture
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <button id="left-btn">&Lang;</button>
    <button id="right-btn">&Rang;</button>
    <img class="avatar modal-avatar" src="${picture.large}" alt="${name.first} ${name.last}" / >
    <div class="text-container">
      <h2 class="modal-name">${name.first} ${name.last}</h2>
      <p class="modal-email">${email}</p>
      <p class="city">${city}</p>
      <hr class="modal-hr"/>
      <p class="phone">${phone}</p>
      <p class="modal-address" >${street.number} ${street.name}, ${state} ${postcode}</p>
      <p class="dob">Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </p>
    </div>
  `;
  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;

  let rightBtn = document.getElementById('right-btn');
  let leftBtn = document.getElementById('left-btn');

  rightBtn.addEventListener('click', (e) => {
    if (index >= employees.length - 1) {
      index = '-1';
    }
    index = parseInt(index);
    index++;
    index = index.toString();

    let {
      name: {
        first,
        last
      },
      dob,
      phone,
      email,
      location: {
        city,
        street: {
          number,
          name
        },
        state,
        postcode
      },
      picture
    } = employees[index];

    let date = new Date(dob.date);

    document.querySelector('.modal-avatar').src = `${picture.large}`;
    document.querySelector('.modal-name').innerHTML = `${first} ${last}`;
    document.querySelector('.modal-email').innerHTML = `${email}`;
    document.querySelector('.city').innerHTML = `${city}`;
    document.querySelector('.phone').innerHTML = `${phone}`;
    document.querySelector('.modal-address').innerHTML = `${number} ${name}, ${state} ${postcode}`;
    document.querySelector('.dob').innerHTML = `Birthday: ${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
  });


  leftBtn.addEventListener('click', (e) => {
    if (index <= 0) {
      index = '12';
    }
    index = parseInt(index);
    index--;
    index = index.toString();

    let {
      name: {
        first,
        last
      },
      dob,
      phone,
      email,
      location: {
        city,
        street: {
          number,
          name
        },
        state,
        postcode
      },
      picture
    } = employees[index];

    let date = new Date(dob.date);

    document.querySelector('.modal-avatar').src = `${picture.large}`;
    document.querySelector('.modal-name').innerHTML = `${first} ${last}`;
    document.querySelector('.modal-email').innerHTML = `${email}`;
    document.querySelector('.city').innerHTML = `${city}`;
    document.querySelector('.phone').innerHTML = `${phone}`;
    document.querySelector('.modal-address').innerHTML = `${number} ${name}, ${state} ${postcode}`;
    document.querySelector('.dob').innerHTML = `Birthday: ${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
  });
}


gridContainer.addEventListener('click', (e) => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    displayModal(index);
  }
});


/* ----------------------
-------------------------
CLOSE MODAL ON CLOSE BUTTON CLICK EVENT
-------------------------
---------------------- */

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});


/* ----------------------
-------------------------
CLOSE MODAL ON OVERLAY CLICK EVENT
------------------------
---------------------- */

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});


/* ----------------------
-------------------------
EMPLOYEE FILTER 
-------------------------
---------------------- */

function searchUsers() {
  let input = document.getElementById('search').value;
  input = input.toUpperCase();
  let users = document.getElementsByClassName('name');
  let card = document.getElementsByClassName('card');
  for (let i = 0; i < users.length; i++) {
    if (!users[i].innerHTML.toUpperCase().includes(input)) {
      card[i].style.display = "none";
    } else {
      card[i].style.display = "";
    }
  }
}