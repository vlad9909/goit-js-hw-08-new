import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!formData[refs.input.name] || !formData[refs.textarea.name]) {
    alert('Все поля должны быть заполнены');
  }
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData[refs.input.name] = ' ';
  formData[refs.textarea.name] = ' ';
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    if (parsedMessage.email) {
      refs.input.value = parsedMessage.email;
      formData[refs.input.name] = parsedMessage.email;
    }
    if (parsedMessage.message) {
      refs.textarea.value = parsedMessage.message;
      formData[refs.textarea.name] = parsedMessage.message;
    }
  }
}
