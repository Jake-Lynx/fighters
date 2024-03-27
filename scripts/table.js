//--- Display character cards in home page
import { showGameIconCategory } from "./helper.js"

// Get data from database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
const tableSection = document.querySelector(".home-top")

// Display table and it's content or message if table is empty
if (games.length === 0) {
	let notification = `
		<h4 style="text-align: center">
			Base de donnée en cours de mise à jour. Revenez ultérieurement
		</h4>
	`
	tableSection.appendChild(notification)
} else {
	// Create table
	let table = document.createElement("table")
	table.classList.add("table")

	// Create table header
	let tableHeader = `
		<tr class="table__title">
			<th class="table__title">Jeu</th>
			<th class="table__title sm-above">Catégorie</th>
			<th class="table__title sm-above">Plateforme(s)</th>
			<th class="table__title l-only">Taille</th>
			<th class="table__title">Téléchargements</th>
		</tr>
	`

	table.innerHTML = tableHeader

	// Fill out table content with database
	// Step 1: Sort table to start with more downloaded games
	let moreDownloaded = games.sort((a, b) => {
		return b.download - a.download
	})

	// Step 2: Slice moreDownloaded variable to keep only 5 first more downloaded games
	moreDownloaded = moreDownloaded.slice(0,5)

	// Step 3: Fill out table
	for (let game of moreDownloaded) {

		// Add game platforms into a div
		let platformsList = document.createElement("span")
		for (let platform of game.platforms) {
			let platformImage = `
				<img src="assets/icons/${platform}.svg" alt="${platform}">
			`
			platformsList.innerHTML += platformImage
		}

		let row = `
			<tr class="table__row">
				<td class="table__row-col1">
					<img src="assets/icons/${showGameIconCategory(game.category)}.svg" alt="${game.category}">
					<span class="content1">${game.title}</span>
				</td>
				<td class="table__row-col2 sm-above">
					${game.category}
				</td>
				<td class="table__row-col3 sm-above">
					${platformsList.innerHTML}
				</td>
				<td class="table__row-col4 l-only">
					${game.size}
				</td>
				<td class="table__row-col5">
					${game.download}m
				</td>
			</tr>
		`

		table.innerHTML += row
	}

	tableSection.appendChild(table)
}