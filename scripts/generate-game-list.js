export function generateGameList (dataArray, contentToPaginate, itemPerPage, gamesSection) {

	for (let i=0; i < dataArray.length; i++) {
		let item = dataArray[i]
		let platformsList = document.createElement("div")
		let card = document.createElement("div")

		card.classList.add("game-card")
		card.style = `background-image: url(${item.image}); background-size: cover`

		// Add game platforms into a div 
		for (let platform of item.platforms) {
			let platformImage = `
			<img src="assets/icons/${platform}.svg" alt="${platform}">
			`
			platformsList.innerHTML += platformImage
		}

		// Create card content
		let content = `
			<p class="game-card__label cta__no-cta">
				${item.free ? "Gratuit" : "Payant"}
			</p>
			<img class="game-card__character" src="${item.characters[0].image}" alt="meal">
			<div class="game-card__list">
				${platformsList.innerHTML}
			</div>

			<div class="game-card__name-background"></div>
			<h4 class="game-card__name">${item.title}</h4>
			<div class="game-card__extra">
				<p class="game-card__extra-label cta__no-cta">
					${item.category}
				</p>
				<p class="game-card__extra-label cta__no-cta">
					${item.download}${item.unity} download
				</p>
			</div>
			<a class="game-card__link" href="specific-game.html">
				<img src="assets/icons/eye.svg" alt="Lien découvrir jeu">
			</a>
		`

		// Add content to card
		card.innerHTML = content

		// Fill out database
		contentToPaginate.push(card)

		// Fill out paginate content according to itemPerPage value
		if (i < itemPerPage) {
			for (let game of contentToPaginate) {
				gamesSection.appendChild(game)
			}
		}
	}
}