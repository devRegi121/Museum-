document.getElementById("SubmitButton").addEventListener("click", function () {
    let visitorName = document.getElementById("visitorName").value;
    let email = document.getElementById("exampleFormControlInput1").value;
    let subject = document.getElementById("subjectInfo").value;
    let discussFor = document.getElementById("floatingSelectGrid").value;
    let message = document.getElementById("exampleFormControlTextarea1").value;


    const contactForm = {
        visitorName: visitorName,
        email: email,
        subject: subject,
        discussFor: discussFor,
        message: message,
    };

    localStorage.setItem("formData", JSON.stringify(contactForm));
  
    document.getElementById("visitorName").value = "";
    document.getElementById("exampleFormControlInput1").value = "";
    document.getElementById("subjectInfo").value = "";
    document.getElementById("floatingSelectGrid").value = "Discuss For";
    document.getElementById("exampleFormControlTextarea1").value = "";


});