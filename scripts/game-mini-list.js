//--- Display character cards in home page

// Get data from database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
const gameSection = document.querySelector(".home-game__caroussel-content")

// Get four latest games

// Create card content
for (let i=0; i < 4; i++) {
	let item = games[i]
	let platformsList = document.createElement("div")

	// Add game platforms into a div 
	for (let platform of item.platforms) {
		let platformImage = `
			<img src="assets/icons/${platform}.svg" alt="${platform}">
		`
		platformsList.innerHTML += platformImage
	}

	let card = `
		<div class="game" style="background-image: url(${item.image}); background-size: cover">
			<div class="game__label cta__no-cta">${item.category}</div>
			<img class="game__character" src="${item.characters[0].image}" alt="${item.title}">
			<div class="game__list">
				${platformsList.innerHTML}
			</div>
			<h4 class="game__name">${item.title}</h4>
		</div>
	`
	gameSection.innerHTML += card
}