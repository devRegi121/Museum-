$(document).ready(function () {
  // Select form input elements
  const $usernameInput = $("#username");
  const $emailInput = $("#email");
  const $passwordInput = $("#password");
  const $confirmPasswordInput = $("#confirmPassword");
  const $firstNameInput = $("#firstName");
  const $lastNameInput = $("#lastName");
  const $phoneNumberInput = $("#phoneNumber");
  const $addressInput = $("#address");
  const $cityInput = $("#city");
  const $countryInput = $("#country");
  const $zipCodeInput = $("#zipCode");
  const $registerForm = $("form"); 

  // Form submission event
  $registerForm.submit(function (event) {
      event.preventDefault(); 

      const username = $usernameInput.val().trim();
      
      const email = $emailInput.val().trim();
      
      const password = $passwordInput.val().trim();
    
      const confirmPassword = $confirmPasswordInput.val().trim();
      const firstName = $firstNameInput.val().trim();
      const lastName = $lastNameInput.val().trim();
      const phoneNumber = $phoneNumberInput.val().trim();
      const address = $addressInput.val().trim();
      const city = $cityInput.val().trim();
      const country = $countryInput.val();
      const zipCode = $zipCodeInput.val().trim();

     
      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return; 
      }

     
      const user = {
          username, 
          email,
          password, 
          firstName,
          lastName,
          phoneNumber,
          address,
          city,
          country,
          zipCode,
          role: "User"
      };
      console.log("User data being sent:", user);  
      registerUser(user);
  });

  // Define the function to send data to the API
  function registerUser(user) {
      $.ajax({
          url: "https://localhost:44326/api/Registration/register-newUser", 
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(user),
          success: function (response) {
              alert("User registered successfully!");
              resetForm(); 
          },
          error: function (error) {
              alert("Registration failed! Please check the console.");
              console.error(error);
          }
          
      });
  }
  function resetForm() {
    $registerForm[0].reset();  
}
});
