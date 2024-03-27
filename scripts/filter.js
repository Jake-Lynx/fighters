import { generateGameList } from "./generate-game-list.js"

// Connect to database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
let searchGame = document.querySelector(".search-field__input")
let gamesSection = document.querySelector(".games-list__content")
let gamesLink = document.querySelector(".games-list__link")
let notificationSection = document.querySelector(".games-list__content-search--notification")
let filterIcon = document.querySelector(".games-filter__icon")
let filterSection = document.querySelector(".games-filter__criteria")
let filterCategory = document.querySelector(".filter-category")
let filterOldest = document.querySelector(".filter-oldest")
let filterDownload = document.querySelector(".filter-download")
let filterFree = document.querySelector(".filter-free")
let filterPaid = document.querySelector(".filter-paid")
let resetButton = document.querySelector(".cta-reset")
let contentToPaginate = []
let itemPerPage = 6

// Handle click on filter icon
// hide/show filter criteria 
filterIcon.addEventListener("click", () => {
	filterSection.classList.toggle("hide-it")
})

// Create a copy of games database
let gamesArray = Array.from(games)

// Handle filter for category
filterCategory.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	contentToPaginate = []

	let categoryA = ""
	let categoryB = ""
	let gameByCategory = games.sort((a,b) => {
		categoryA = a.category
		categoryB = b.category

		if (categoryA > categoryB) {
			return -1
		}
		if (categoryA < categoryB) {
			return 1
		}

		return 0
	})

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})

// Handle filter for oldest
filterOldest.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	contentToPaginate = []

	let gameByCategory = gamesArray.sort((a,b) => {
		return a.id - b.id
	})

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})

// Handle filter for download
filterDownload.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	contentToPaginate = []

	let gameByCategory = gamesArray.sort((a,b) => {
		return b.download - a.download
	})

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})

// Handle filter for free
filterFree.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	contentToPaginate = []

	let gameByCategory = gamesArray.filter(game => game.free)

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})

// Handle filter for paid
filterPaid.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	contentToPaginate = []

	let gameByCategory = gamesArray.filter(game => !game.free)

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})

// Handle reset button 
resetButton.addEventListener("click", () => {

	// Clean data variables
	gamesSection.innerHTML = ""
	gamesLink.classList.toggle("hide-it")
	contentToPaginate = []
	searchGame.value = ""
	notificationSection.textContent = ""

	let gameByCategory = gamesArray.sort((a,b) => {
		return b.id - a.id
	})

	generateGameList(gameByCategory, contentToPaginate, itemPerPage, gamesSection)
})
