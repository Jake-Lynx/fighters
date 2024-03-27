// Function that return right icon according to game's category
export function showGameIconCategory(category) {
	let icon = ""
	switch (category) {
	case "sport":
		icon = "medal"
		break
	case "racing":
		icon = "path"
		break
	case "fighting":
		icon = "sword"
		break
	case "strategy":
		icon = "flag"
		break
	default:
		icon = "ghost"
	}

	return icon
}

// Forms fields functions
// Function that checks email validity
export function handleEmailField(emailField) {
	let regex = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+$")
	if (!regex.test(emailField.value)) {
		emailField.classList.add("field-helper--activated")
		throw new Error("Invalid email")
	}
	emailField.classList.remove("field-helper--activated")
}

// Function that checks if field length isn't under the limit length allowed
export function handleSimpleField(fieldName, minLength) {
	if (fieldName.value.length < minLength) {
		fieldName.classList.add("field-helper--activated")
		throw new Error(`${fieldName.name} field value is too short. Please insert at least ${minLength} characters.`)
	} else {
		fieldName.classList.remove("field-helper--activated")
	}
}

// Function that shows error message
// PS: To use this function, be sure adding
// notification HTML code into HTML
// eg:
/*
<div class="form-notification">
	<p class="form-notification__text">Lorem ipsum fds dsfds fsdfs dsfds</p>
	<img src="http://rb.gy/xry91" alt="" id="notification_icon" class="form-notification__close-icon">
</div>
*/
export function showMessage(message) {
	// Assign notification variables 
	const notification = document.querySelector(".form-notification")
	const notificationText = document.querySelector(".form-notification__text")
	const notificationCloseIcon = document.querySelector(".form-notification__close-icon")

	notificationText.textContent = message
	notification.classList.add("show-notification")

	// Close notification on click
	notificationCloseIcon.addEventListener("click", () => {
		notification.classList.remove("show-notification")
		notification.classList.add("hide-notification")
	})
}

export function handleSimplePasswordField (passwordField) {
	// For sign in, it's not oblige to use regex
	if (passwordField.value.length < 3) {
		passwordField.classList.add("field-helper--activated")
		throw new Error("Invalid password, Minimum 3 characters.")
	}
	// Remove helper classes
	passwordField.classList.remove("field-helper--activated")
}

export function handleComplexPasswordField (passwordField, confirmPasswordField) {
	let regex = new RegExp("^[A-Za-z0-9!@#$&()\\-`.+,/\"]{3,}$")
	if (!regex.test(passwordField.value)) {
		passwordField.classList.add("field-helper--activated")
		throw new Error("Invalid password, Minimum 3 characters.")
	} else if (passwordField.value !== confirmPasswordField.value) {
		passwordField.classList.add("field-helper--activated")
		confirmPasswordField.classList.add("field-helper--activated")
		throw new Error("Password didn't match")
	}

	// Remove helper classes
	passwordField.classList.remove("field-helper--activated")
	confirmPasswordField.classList.remove("field-helper--activated")
}