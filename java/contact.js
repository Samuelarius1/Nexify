/** @format */

document
	.getElementById("contact-form")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting the default way

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const phone = document.getElementById("phone").value;
		const message = document.getElementById("message").value;

		// You can perform form validation here if needed

		// Simulate form submission (e.g., sending data to a server)
		console.log("Form submitted:", { name, email, phone, message });

		// Clear the form fields
		document.getElementById("contact-form").reset();

		// Show confirmation message
		const confirmationMessage = document.getElementById("confirmation-message");
		confirmationMessage.innerText = "Your message has been sent successfully!";
		confirmationMessage.classList.remove("hidden");

		// Optionally, you can hide the confirmation message after a few seconds
		setTimeout(() => {
			confirmationMessage.classList.add("hidden");
		}, 5000);
	});
