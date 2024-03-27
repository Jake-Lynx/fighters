//--- Display character cards in home page

// Get data from database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
const latestSection = document.querySelector(".home-latest__list")

// Create card content
for (let i=0; i < 4; i++) {
	let item = games[i]

	let card = `
		<div class="latest-game">
			<div class="latest-game__geometric-block" style="background-image: url(${item.image}); background-size: cover"></div>
			<p class="latest-game__title">
				${item.title}
			</p>
			<a class="latest-game__link" href="specific-game.html">En savoir +</a>
		</div>
	`
	latestSection.innerHTML += card
}