const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
 
    button.removeAttribute('disabled');
    return;
  
  button.setAttribute('disabled', '');
}

       const handleSubmit = (event) => {
       event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/memo.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
