(() => {
	const mailForm = document.getElementById("contact-form");
	const emailInput = document.getElementById("form-email");
	const submit = mailForm.querySelector(".submit");

	submit.onclick = (event) => {
		event.preventDefault();
		const email = emailInput.value;
		if (email && emailInput.checkValidity()) {
			fetch("/subscribe", {
	          method: 'post',
	          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
	          body: JSON.stringify({ email })
	        });
		} else {
			emailInput.toggleAttribute("error", true);
		}
	}

	emailInput.oninput = () => emailInput.toggleAttribute("error", false);
})()