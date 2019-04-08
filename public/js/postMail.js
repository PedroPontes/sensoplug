(() => {
	const mailForm = document.getElementById("contact-form");
	const email = document.getElementById("form-email");
	const submit = mailForm.querySelector(".submit");

	submit.onclick = (event) => {
		event.preventDefault();
		email.value;
		if (email.checkValidity()) {
			fetch("subscribe", {
	          method: 'post',
	          body: JSON.stringify({ email })
	        });
		} else {
			email.toggleAttribute("error", true);
		}
	}

	email.oninput = () => email.toggleAttribute("error", false);
})()