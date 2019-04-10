(() => {
  const mailForm = document.getElementById("contact-form");
  const emailInput = document.getElementById("form-email");
  const errorMessage = document.getElementById("form-email-error");
  const submit = mailForm.querySelector(".submit");
  const successMessage = document.getElementById("form-email-success");

  submit.onclick = async (event) => {
    try {
      event.preventDefault();
      const email = emailInput.value;
      if (!email || !emailInput.checkValidity()) {
        throw "Invalid e-mail!";
      }
      const request = await axios.post('/subscribe', { email });
      successMessage.innerHTML = "Thank you for subscribing!";
    } catch (error) {
      emailInput.toggleAttribute("error", true);
      successMessage.innerHTML = "";
      errorMessage.innerHTML = error.response ? error.response.data.error : error;
    }
  }

  emailInput.oninput = () => {
    emailInput.toggleAttribute("error", false);
    errorMessage.innerHTML = "";
    successMessage.innerHTML = "";
  }
})()