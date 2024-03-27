import { handleEmailField, handleSimpleField, handleSimplePasswordField, handleComplexPasswordField, showMessage } from "./helper.js"

// Variables
let authentication = document.querySelector(".authentication")
const signUpForm = document.querySelector(".form-signup")
const signInForm = document.querySelector(".form-signin")
let pseudo = document.getElementById("pseudo")
let pseudoOrEmail = document.getElementById("pseudo_email")
let email = document.getElementById("signup-email")
let password = document.getElementById("signup-password")
let signInPassword = document.getElementById("signin-password")
let confirmPassword = document.getElementById("confirm-password")
let notificationSection = document.querySelector(".form-notification")
let navSignLink = document.querySelectorAll(".authentication__nav-link")

// Firstly, hide sign in form
signInForm.classList.add("hidden")

// handle authentication nav click
for (let i=0; i < navSignLink.length; i++) {
	let rightNav = navSignLink[i]
	rightNav.addEventListener("click", () => {
		// If user click on sign up nav
		if (rightNav.id === "signup") {
			signUpForm.classList.remove("hidden")
			signInForm.classList.add("hidden")

			// Update background-image
			authentication.style.backgroundImage = "url(assets/images/ps5-console-2.png)"
		} else {
			signUpForm.classList.add("hidden")
			signInForm.classList.remove("hidden")

			// Update background-image
			authentication.style.backgroundImage = "url(assets/images/xbox-console-gray.png)"
		}
	})
}

// Handle Sign Up form
signUpForm.addEventListener("submit", (e) => {
	try {
		e.preventDefault()

		// Check fields
		handleSimpleField(pseudo, 2)
		handleEmailField(email)
		handleComplexPasswordField(password, confirmPassword)

		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(141, 95%, 44%, 1)"
		showMessage("Sign up successfull!")
	} catch (error) {
		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(360, 94%, 44%, 1)"
		showMessage(error.message)
	}
})

// Handle Sign In form
signInForm.addEventListener("submit", (e) => {
	try {
		e.preventDefault()

		// Check fields
		handleSimpleField(pseudoOrEmail, 2)
		handleSimplePasswordField(signInPassword)

		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(141, 95%, 44%, 1)"
		showMessage("Sign in successfull!")
	} catch (error) {
		// Update notification background color & text
		notificationSection.style.backgroundColor = "hsla(360, 94%, 44%, 1)"
		showMessage(error.message)
	}
})