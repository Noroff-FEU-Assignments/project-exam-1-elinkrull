//Form validation for the contact form

const form = document.querySelector("#contact-form");
const name = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const inputField = document.querySelector("#name", "#email", "#subject", "#message");

function validateForm(event) {

	event.preventDefault();

	if (name.value.trim().length > 5) {
		nameError.style.display = "none";
	} else {
		nameError.style.display = "block";
	}

	if (subject.value.trim().length > 15) {
		subjectError.style.display = "none";
	} else {
		subjectError.style.display = "block";
	}

	if (message.value.trim().length > 25) {
		messageError.style.display = "none";
	} else {
		messageError.style.display = "block";
	}


	if (validateEmail(email.value) === true) {
		emailError.style.display = "none";
	} else {
		emailError.style.display = "block";
	}

}

form.addEventListener("submit", validateForm);

// validate email - regular expression
function validateEmail(email) {
	const regEx = /\S+@\S+.\S+/;
	const patternMatches = regEx.test(email);
	return patternMatches;
}

//function to validate the form when click is made outside the inputfield
document.addEventListener("click", function (event) {
	if (!inputField.contains(event.target)) {
		validateForm(event);
	}
});



