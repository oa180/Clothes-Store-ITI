const myForm = document.getElementsByClassName("container")[0];
const nameElement = document.getElementById("textName");
const emailElement = document.getElementById("textEmail");
const messageElement = document.getElementById("messageTxt");
const submitBtn = document.getElementsByClassName("submitBtn")[0];
const contactCard = document.getElementsByClassName("contact-info")[0];

const validFormIndexes = new Array(3);
validFormIndexes.fill(0);
// console.log(validFormIndexes);

if (!validFormIndexes.includes(0)) {
  // console.log(validFormIndexes);
  submitBtn.classList.remove("disabled");
}

showSubmitBtn();

function formValidation() {
  nameValidation();
  emailValidation();
  messageValidation();
}

function showSubmitBtn() {
  console.log(validFormIndexes);

  submitBtn.classList.remove("disabled");
  if (validFormIndexes.includes(0)) submitBtn.classList.add("disabled");
}

function nameValidation() {
  const nameError = document.getElementsByClassName("nameError")[0];
  const nameReg = /^[a-zA-Z ]+$/;
  const validEmailFormat = nameReg.test(nameElement.value);
  console.log(validEmailFormat);

  if (nameElement.value.trim().length < 3 || !validEmailFormat) {
    nameElement.classList.add("notValidInput");
    nameError.classList.remove("hidden");
    validFormIndexes[0] = 0;
  } else {
    nameElement.classList.remove("notValidInput");
    nameError.classList.add("hidden");
    validFormIndexes[0] = 1;
  }

  showSubmitBtn();
}

function emailValidation() {
  const emailError = document.getElementsByClassName("emailError")[0];
  const emailReg = /^[a-z0-9]+@[a-z]+\.[a-z]{3}$/;
  const validEmailFormat = emailReg.test(emailElement.value);

  if (!validEmailFormat) {
    emailElement.classList.add("notValidInput");
    emailError.classList.remove("hidden");
    validFormIndexes[1] = 0;
  } else {
    emailElement.classList.remove("notValidInput");
    emailError.classList.add("hidden");
    validFormIndexes[1] = 1;
  }
  showSubmitBtn();
}

function messageValidation() {
  const messageError = document.getElementsByClassName("messageError")[0];
  if (messageElement.value.length < 30) {
    messageElement.classList.add("notValidInput");
    messageError.classList.remove("hidden");
    validFormIndexes[2] = 0;
  } else {
    messageElement.classList.remove("notValidInput");
    messageError.classList.add("hidden");
    validFormIndexes[2] = 1;
  }
  showSubmitBtn();
}

function contactRedirect(e) {
  console.log("sss");
  e.preventDefault();

  window.open("./index.html", "_Self");
}
myForm.addEventListener("submit", formValidation);
nameElement.addEventListener("keyup", nameValidation);
emailElement.addEventListener("keyup", emailValidation);
messageElement.addEventListener("keyup", messageValidation);
