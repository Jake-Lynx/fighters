//--- Display character cards in home page

// Get data from database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
const characterSection = document.querySelector(".home-character__caroussel-content")
let charactersData = []

// Get First characters of first four games characters
for (let i=0; i < 4; i++) {
	charactersData.push(games[i].characters[0])
}

// Create card content
for (let character of charactersData) {
	let card = `
		<div class="character">
			<img class="character__image" src="${character.image}" alt="${character.name}">
			<div class="character__details">
				<hr class="character__details-separator">
				<p class="character__details-name">${character.name}</p>
				<p class="character__details-description">
					${character.description}
				</p>
			</div>
		</div>
	`
	characterSection.innerHTML += card
}