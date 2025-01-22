$(document).ready(function () {
   
    const $usernameInput = $("#username");
    const $emailInput = $("#email");
    const $passwordInput = $("#password");
    const $firstNameInput = $("#firstName");
    const $lastNameInput = $("#lastName");
    const $phoneNumberInput = $("#phoneNumber");
    const $addressInput = $("#address");
    const $cityInput = $("#city");
    const $countryInput = $("#country");
    const $zipCodeInput = $("#zipCode");

   
    const jwtToken = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("id");

   
    if (!jwtToken || !userId) {
        alert("You must be logged in to view your profile.");
        window.location.href = "loginPage.html";  
        return; 
    }

   
    fetchUserProfile(userId);

 
    function fetchUserProfile(userId) {
        $.ajax({
            url: `https://localhost:44326/api/Registration/get-user-byId/${userId}`,  
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`  
            },
            success: function (response) {
                
                $usernameInput.val(response.username);  
                $emailInput.val(response.email);
                $passwordInput.val(response.password);
                $firstNameInput.val(response.firstName);
                $lastNameInput.val(response.lastName);
                $phoneNumberInput.val(response.phoneNumber);
                $addressInput.val(response.address);
                $cityInput.val(response.city);
                $countryInput.val(response.country);
                $zipCodeInput.val(response.zipCode);

               
                setFieldsReadOnly(true);
            },
            error: function (error) {
                alert("Failed to load user profile.");
                console.error(error);
            }
        });
    }

    
    $("#editBtn").click(function () {
       
        console.log("Edit button clicked");

        
        setFieldsReadOnly(false);

        // Hide the Edit button and show Save button
        $(this).hide();  
        $("#saveBtn").show(); 
    });

    // Save button functionality
    $("#saveBtn").click(function () {
        console.log("Save button clicked");

        // Get updated user profile data
        const updatedUserProfile = {
            username: $usernameInput.val().trim(),
            email: $emailInput.val().trim(),
            password: $passwordInput.val().trim(),
            firstName: $firstNameInput.val().trim(),
            lastName: $lastNameInput.val().trim(),
            phoneNumber: $phoneNumberInput.val().trim(),
            address: $addressInput.val().trim(),
            city: $cityInput.val().trim(),
            country: $countryInput.val().trim(),
            zipCode: $zipCodeInput.val().trim()
        };

        // Validate form input
        if (Object.values(updatedUserProfile).includes("")) {
            alert("All fields are required.");
            return;
        }

        // Send the updated data to the server
        $.ajax({
            url: `https://localhost:44326/api/Registration/update-user/${userId}`,  
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${jwtToken}`  
            },
            contentType: "application/json",
            data: JSON.stringify(updatedUserProfile),
            success: function (response) {
                alert("Profile updated successfully!");
                
                window.location.reload();
            },
            error: function (error) {
                alert("Failed to save changes.");
                console.error(error);
            }
        });
    });

    
    function setFieldsReadOnly(readOnly) {
       
        console.log("Setting fields to readonly:", readOnly);

        $usernameInput.prop("readonly", readOnly);
        $emailInput.prop("readonly", readOnly);
        $passwordInput.prop("readonly", readOnly);
        $firstNameInput.prop("readonly", readOnly);
        $lastNameInput.prop("readonly", readOnly);
        $phoneNumberInput.prop("readonly", readOnly);
        $addressInput.prop("readonly", readOnly);
        $cityInput.prop("readonly", readOnly);
        $countryInput.prop("readonly", readOnly);
        $zipCodeInput.prop("readonly", readOnly);
    }
});
