const myForm = document.getElementsByClassName("container")[0];
const nameElement = document.getElementById("textName");
const emailElement = document.getElementById("textEmail");
const passwordElement = document.getElementById("textPassword");
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
  passwordValidation();
}

function showSubmitBtn() {
  console.log(validFormIndexes);

  submitBtn.classList.remove("disabled");
  if (validFormIndexes.includes(0)) submitBtn.classList.add("disabled");
}

function nameValidation() {
  const nameError = document.getElementsByClassName("nameError")[0];

  console.log(nameError);

  if (nameElement.value.length < 4) {
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

function passwordValidation() {
  const passwordError = document.getElementsByClassName("passwordError")[0];
  if (passwordElement.value.length < 8) {
    passwordElement.classList.add("notValidInput");
    passwordError.classList.remove("hidden");
    validFormIndexes[2] = 0;
  } else {
    passwordElement.classList.remove("notValidInput");
    passwordError.classList.add("hidden");
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
passwordElement.addEventListener("keyup", passwordValidation);
