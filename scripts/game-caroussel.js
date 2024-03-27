const paginateContent = document.querySelector(".home-game__caroussel-content--screen-sm")
let linkContainer = document.querySelector(".game-link")

// Create Set up caroussel
let cardNumber = 3
let itemPerPage = 1 // item we want to display per page
let carousselContent = []

// Connect to database
const reponse = await fetch("database/games.json")
const games = await reponse.json()

for (let i=0; i < cardNumber; i++) {
	let card = document.createElement("div")
	let item = games[i]
	let platformsList = document.createElement("div")

	// Add game platforms into a div 
	for (let platform of item.platforms) {
		let platformImage = `
			<img src="assets/icons/${platform}.svg" alt="${platform}">
		`
		platformsList.innerHTML += platformImage
	}

	// Create card content
	let content = `
		<div class="game" style="background-image: url(${item.image}); background-size: cover">
			<div class="game__label cta__no-cta">${item.category}</div>
			<img class="game__character" src="${item.characters[0].image}" alt="${item.title}">
			<div class="game__list">
				${platformsList.innerHTML}
			</div>
			<h4 class="game__name">${item.title}</h4>
		</div>
	`

	// Add content to card
	card.innerHTML = content

	// Fill out database
	carousselContent.push(card)
	
	// Fill out paginate content according to itemPerPage value
	if (i < itemPerPage) {
		paginateContent.appendChild(card)
	}
}

// CALCULATE pages is needed to display all database content
// according to items that must be show per page
// Handle case where content number is odd (use If/Else & modulo)
let pages = 0
if (carousselContent.length%itemPerPage === 0) {
	pages = carousselContent.length / itemPerPage
} else {
	pages = (carousselContent.length / itemPerPage) + 1
}

// CREATE links according to needed page numbers
let linkList = document.createElement("ul")
linkList.classList.add("caroussel__game-list")
for (let i=1; i <= pages; i++) {
	let pageLink = document.createElement("li")
	if (i===1) {
		pageLink.classList.add("caroussel__game-item")
		pageLink.classList.add("caroussel__game-item--active")
		pageLink.id = i
		pageLink.textContent = ""
	} else {
		pageLink.classList.add("caroussel__game-item")
		pageLink.id = i
		pageLink.textContent = ""
	}
	linkList.appendChild(pageLink)
}
linkContainer.appendChild(linkList)

// SET contentCount = 0
// SET contentArray = []
// Display item on a page
// SHOW First X item per page
// LISTEN TO event click ON link
let pageLink = document.querySelectorAll(".caroussel__game-item")
for (let d=0; d < pageLink.length; d++) {
	let rightLink = pageLink[d]
	rightLink.addEventListener("click", () => {
		// Update clicked link class to make it active
		// Step 1: Find and remove active class from old link
		let oldActiveLink = document.querySelector(".caroussel__game-item--active")
		oldActiveLink.classList.remove("caroussel__game-item--active")
		
		// Step 2: Update active link
		rightLink.classList.add("caroussel__game-item--active")
		
		// Display right content on page
		let sliceBegin = (rightLink.id * itemPerPage) - itemPerPage
		let sliceEnd = rightLink.id * itemPerPage

		let contentArray = carousselContent.slice(sliceBegin, sliceEnd)
		// Empty paginate content
		paginateContent.textContent = ""
		
		// Fill out paginate content with right content
		for (let p=0; p<contentArray.length; p++) {
			let card = contentArray[p]
			card.classList.remove("animate_caroussel")
			card.classList.add("animate_caroussel")
			paginateContent.appendChild(contentArray[p])
		}
	})
}