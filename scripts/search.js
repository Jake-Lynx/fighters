import { generateGameList } from "./generate-game-list.js"

// Connect to database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
let searchGame = document.querySelector(".search-field__input")
let notificationSection = document.querySelector(".games-list__content-search--notification")
let gamesSection = document.querySelector(".games-list__content")
let gamesLink = document.querySelector(".games-list__link")
let contentToPaginate = []
let itemPerPage = 6

searchGame.addEventListener("keypress", (e) => {
	// If user type "enter" to validate
	// name of game searched
	if (e.key === "Enter") {
		let searchValue = e.target.value

		// Filter database to keep games titles
		// that contains title searched
		let searchedGames = games.filter(game => game.title.includes(searchValue))

		if (searchedGames.length > 0) {
			// Clean data variables
			gamesSection.innerHTML = ""
			contentToPaginate = []

			// Generate games list belongs to
			// search result
			generateGameList(searchedGames, contentToPaginate, itemPerPage, gamesSection)
		} else {
			// Clean data variables
			gamesSection.innerHTML = ""
			gamesLink.classList.add("hide-it")
			contentToPaginate = []

			// Tell user that search have
			// no result
			notificationSection.innerHTML = "Aucun résultat.<img src='assets/icons/oups.svg' alt='Icône'>"
		}
	}
})