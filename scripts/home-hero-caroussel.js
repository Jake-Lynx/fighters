const paginateContent = document.querySelector(".caroussel__content")
let linkContainer = document.querySelector(".caroussel__link-rectangle")

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
		<div class="hero-caroussel">
			<img src="${item.image}" alt="${item.title}" class="hero-caroussel__poster sm-only">
			<div class="hero-caroussel__game-platform sm-only">
				${platformsList.innerHTML}
			</div>
			<div class="hero-caroussel__container sm-above" style="background-image:url(${item.image}); background-size: cover">
				<div class="hero-caroussel__extra sm-above">
					<a class="hero-caroussel__extra-label cta__no-cta" href="#">
						${item.category}
					</a>
					<a class="hero-caroussel__extra-label cta__no-cta" href="#">
						${item.free ? "Gratuit" : "Payant"}
					</a>
				</div>
				<div class="hero-caroussel__list sm-above">
					${platformsList.innerHTML}
				</div>
				<h1 class="hero-caroussel__name sm-above">${item.title}</h1>
			</div>
			<p class="hero-caroussel__name--screen-small sm-only">${item.title}</p>
			<aside class="hero-caroussel__buttons">
				<a class="hero-caroussel__buttons-cta cta__no-cta sm-only" href="#">
						${item.free ? "Gratuit" : "Payant"}
					</a>
				<a class="hero-caroussel__buttons-cta cta__simple" target="_blank" href="${item.trailer_link}">
					watch trailer
				</a>
			</aside>
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
linkList.classList.add("caroussel__link-rectangle-list")
for (let i=1; i <= pages; i++) {
	let pageLink = document.createElement("li")
	if (i===1) {
		pageLink.classList.add("caroussel__link-rectangle-item")
		pageLink.classList.add("caroussel__link-rectangle-item--active")
		pageLink.id = i
	} else {
		pageLink.classList.add("caroussel__link-rectangle-item")
		pageLink.id = i
	}
	linkList.appendChild(pageLink)
}
linkContainer.appendChild(linkList)

// SET contentCount = 0
// SET contentArray = []
// Display item on a page
// SHOW First X item per page
// LISTEN TO event click ON link
let pageLink = document.querySelectorAll(".caroussel__link-rectangle-item")
for (let d=0; d < pageLink.length; d++) {
	let rightLink = pageLink[d]
	rightLink.addEventListener("click", () => {
		// Update clicked link class to make it active
		// Step 1: Remove active class from old link
		let oldActiveLink = document.querySelector(".caroussel__link-rectangle-item--active")
		oldActiveLink.classList.remove("caroussel__link-rectangle-item--active")
		
		// Step 2: Update active link
		rightLink.classList.add("caroussel__link-rectangle-item--active")
		
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