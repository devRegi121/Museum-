let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let loginForm = document.querySelector("form");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Login successful! Welcome, ${user.firstName} ${user.lastName}!`);
    } else {
        alert("Error: Invalid email or password. Please try again.");
    }
    resetLoginForm();
});
function resetLoginForm() {
    emailInput.value = "";
    passwordInput.value = "";
}