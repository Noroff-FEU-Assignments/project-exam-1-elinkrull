//Form validation for the contact form

function validationForm(event) {
	event.preventDefault();

	const form = document.querySelector("#contact-form");
	const name = document.querySelector("#name");
	const nameError = document.querySelector("#name-error");

	if(name.value.length < 5) {
		nameError.style.display = "none";
	} else {
		nameError.style.display = "block";
	}

	console.log("Hello");

	form.addEventListener("submit", validationForm);
}
