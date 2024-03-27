// Variables
const body = document.body
const btn = document.querySelector(".header__extra-theme")
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)")

// Images variables
let themeImage = document.querySelector(".theme-image")
let logo = document.querySelector(".logo-image")
let logoFooter = document.querySelector(".footer__logo")
let accountImage = document.querySelector(".account-link__image")
let hamburgerImage = document.querySelector(".nav__hamburger")
let footerSocialImage = document.querySelectorAll(".footer__social-item")
let searchIcons = document.querySelectorAll(".search-field__icon")

// Functions
function addDarkMode() {
	body.classList.remove("light-mode")
	body.classList.add("dark-mode")
}

function addLightMode() {
	body.classList.remove("dark-mode")
	body.classList.add("light-mode")
}

function toggleTheme() {
	// get current url
	let currentUrl = window.location.href

	if (body.classList.contains("dark-mode")) {
		addLightMode()

		// Update necessary images
		themeImage.src = "../assets/icons/moon.svg"
		logo.src = "../assets/logo-day.svg"
		logoFooter.src = "../assets/logo-day.svg"
		accountImage.src = "../assets/icons/account.svg"
		hamburgerImage.src = "../assets/icons/hamburger-menu.svg"
		footerSocialImage[0].src = "../assets/icons/discord.svg"
		footerSocialImage[1].src = "../assets/icons/instagram.svg"
		footerSocialImage[3].src = "../assets/icons/facebook.svg"
		footerSocialImage[4].src = "../assets/icons/twitter.svg"
		for (let icon of searchIcons) {
			icon.src = "../assets/icons/search.svg"
		}

		// Makes updates according to pages
		if (currentUrl.includes("index.html")) {
			// Variables
			let eventIcons = document.querySelectorAll(".event__content-icon")

			// Updates images
			eventIcons[0].src = "../assets/icons/clock.svg"
			eventIcons[1].src = "../assets/icons/place.svg"
		} else if (currentUrl.includes("games.html")) {
			let filterIcon = document.querySelector(".games-filter__icon")
			let cancelIcon = document.querySelector(".cta-reset__icon")
			let previousIcon = document.querySelector(".previous-link__image")
			let nextIcon = document.querySelector(".next-link__image")
			filterIcon.src = "assets/icons/filter.svg"
			cancelIcon.src = "assets/icons/cancel.svg"
			previousIcon.src = "assets/icons/arrow-left.svg"
			nextIcon.src = "assets/icons/arrow-right.svg"
		} else if (currentUrl.includes("specific-game.html")) {
			let navIcon = document.querySelectorAll(".nav__hamburger")
			navIcon[1].src = "../assets/icons/info.svg"
			navIcon[2].src = "../assets/icons/people.svg"
			navIcon[3].src = "../assets/icons/platform.svg"
			navIcon[4].src = "../assets/icons/reviews.svg"
			navIcon[5].src = "../assets/icons/download.svg"
		} else if (currentUrl.includes("authentication.html")) {
			let socialIcons = document.querySelectorAll(".authentication__social-link")
			let closeIcon = document.querySelector(".close-icon")
			socialIcons[0].src = "../assets/icons/facebook.svg"
			socialIcons[1].src = "../assets/icons/discord.svg"
			socialIcons[2].src = "../assets/icons/twitter.svg"
			socialIcons[3].src = "../assets/icons/google.svg"
			closeIcon.src = "../assets/icons/cancel.svg"
		}
	} else {
		addDarkMode()
		// Update necessary images
		themeImage.src = "../assets/icons/sun.svg"
		logo.src = "../assets/logo-night.svg"
		logoFooter.src = "../assets/logo-night.svg"
		accountImage.src = "../assets/icons/account-white.svg"
		hamburgerImage.src = "../assets/icons/hamburger-menu-white.svg"
		footerSocialImage[0].src = "../assets/icons/discord-white.svg"
		footerSocialImage[1].src = "../assets/icons/instagram-white.svg"
		footerSocialImage[3].src = "../assets/icons/facebook-white.svg"
		footerSocialImage[4].src = "../assets/icons/twitter-white.svg"
		for (let icon of searchIcons) {
			icon.src = "../assets/icons/search-white.svg"
		}

		// Makes updates according to pages
		if (currentUrl.includes("index.html")) {
			// Variables
			let eventIcons = document.querySelectorAll(".event__content-icon")

			// Updates images
			eventIcons[0].src = "../assets/icons/clock-white.svg"
			eventIcons[1].src = "../assets/icons/place-white.svg"
		} else if (currentUrl.includes("games.html")) {
			let filterIcon = document.querySelector(".games-filter__icon")
			let cancelIcon = document.querySelector(".cta-reset__icon")
			let previousIcon = document.querySelector(".previous-link__image")
			let nextIcon = document.querySelector(".next-link__image")
			filterIcon.src = "assets/icons/filter-white.svg"
			cancelIcon.src = "assets/icons/cancel-white.svg"
			previousIcon.src = "assets/icons/arrow-left-white.svg"
			nextIcon.src = "assets/icons/arrow-right-white.svg"
		} else if (currentUrl.includes("specific-game.html")) {
			let navIcon = document.querySelectorAll(".nav__hamburger")
			navIcon[1].src = "../assets/icons/info-white.svg"
			navIcon[2].src = "../assets/icons/people-white.svg"
			navIcon[3].src = "../assets/icons/platform-white.svg"
			navIcon[4].src = "../assets/icons/reviews-white.svg"
			navIcon[5].src = "../assets/icons/download-white.svg"
		} else if (currentUrl.includes("authentication.html")) {
			let socialIcons = document.querySelectorAll(".authentication__social-link")
			let closeIcon = document.querySelector(".close-icon")
			socialIcons[0].src = "../assets/icons/facebook-white.svg"
			socialIcons[1].src = "../assets/icons/discord-white.svg"
			socialIcons[2].src = "../assets/icons/twitter-white.svg"
			socialIcons[3].src = "../assets/icons/google-white.svg"
			closeIcon.src = "../assets/icons/cancel-white.svg"
		}
	}
}

function checkPreference() {
	preferenceQuery.matches ? addDarkMode() : addLightMode()
}

// Event listeners
btn.addEventListener("click", () => {
	toggleTheme()
})
preferenceQuery.addEventListener("change", () => {
	checkPreference()
})
window.addEventListener("DOMContentLoaded", () => {
	checkPreference()
})
//(() => checkPreference())()