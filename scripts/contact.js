import { handleEmailField, handleSimpleField, showMessage } from "./helper.js"

// Variables
let name = document.getElementById("contact-name")
let email = document.getElementById("contact-email")
let message = document.getElementById("contact-message")
let notificationSection = document.querySelector(".form-notification")
const form = document.querySelector(".form-contact")

form.addEventListener("submit", (e) => {
	try {
		// Block default form behavior
		e.preventDefault()

		// Check fields
		handleSimpleField(name, 2)
		handleSimpleField(message, 2)
		handleEmailField(email)

		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(141, 95%, 44%, 1)"
		showMessage("Message sent!")
	} catch (error) {
		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(360, 94%, 44%, 1)"
		showMessage(error.message)
	}
})
