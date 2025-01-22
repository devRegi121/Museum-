$(document).ready(function () {
    const $usernameInput = $("#username");
    const $passwordInput = $("#password");
    const $loginForm = $("form"); 
  
    // Form submission event for login
    $loginForm.submit(function (event) {
        event.preventDefault(); 
  
        const username = $usernameInput.val().trim();
        const password = $passwordInput.val().trim();
  
        // Validate input fields
        if (username === "" || password === "") {
            alert("Username and password are required.");
            return;  
        }
  
        // Create login object
        const loginData = {
            username,
            password
        };
        console.log("Login data being sent:", loginData);  
        loginUser(loginData);
    });
  
    
    function loginUser(loginData) {
        $.ajax({
            url: "https://localhost:44326/api/Registration/login", 
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function (response) {
                
                localStorage.setItem("jwtToken", response.token);  
                localStorage.setItem("username", loginData.username);
                localStorage.setItem("id", response.user.id);
                localStorage.setItem("role", response.user.role);
                window.location.href = "museumShop.html";  
            },
            error: function (error) {
                alert("Login failed! Please check your credentials.");
                console.error(error);
            }
        });
    }

  });
  