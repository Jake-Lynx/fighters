let hamburgerIcon = document.querySelector(".nav__hamburger")

hamburgerIcon.addEventListener("click", () => {

	if (!hamburgerIcon.classList.contains("nav__hamburger--active")) {
		hamburgerIcon.src = "assets/icons/hamburger-menu_active.svg"
		hamburgerIcon.classList.remove("nav__hamburger")
		hamburgerIcon.classList.add("nav__hamburger--active")
	} else {
		hamburgerIcon.src = "assets/icons/hamburger-menu.svg"
		hamburgerIcon.classList.remove("nav__hamburger--active")
		hamburgerIcon.classList.add("nav__hamburger")
	}
})