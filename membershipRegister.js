let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let phoneNumberInput = document.getElementById("phoneNumber");
let addressInput = document.getElementById("address");
let cityInput = document.getElementById("city");
let countryInput = document.getElementById("country");
let zipCodeInput = document.getElementById("zipCode");
let registerForm = document.querySelector("form");
 
registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
   const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phoneNumber = phoneNumberInput.value.trim();
  const address = addressInput.value.trim();
  const city = cityInput.value.trim();
  const country = countryInput.value;
  const zipCode = zipCodeInput.value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const user = {
    email,
    password, 
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));


  resetForm();

  alert("User registered successfully!");
});
function resetForm() {
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  firstNameInput.value = "";
  lastNameInput.value = "";
  phoneNumberInput.value = "";
  addressInput.value = "";
  cityInput.value = "";
  countryInput.value = "";
  zipCodeInput.value = "";
}
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Registered users:", users); 
}
window.addEventListener("load", loadUsers);