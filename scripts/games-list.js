import { generateGameList } from "./generate-game-list.js"

// Connect to database
const reponse = await fetch("database/games.json")
const games = await reponse.json()

// Variables
const gamesSection = document.querySelector(".games-list__content")
let linkContainer = document.querySelector(".games-list__link")
let itemPerPage = 6 // item we want to display per page
let contentToPaginate = []

let sortedGames = games.sort((a, b) => {return b.id - a.id})

// Display content to page
generateGameList(sortedGames, contentToPaginate, itemPerPage, gamesSection)

// CALCULATE pages is needed to display all database content
// according to items that must be show per page
// Handle case where content number is odd (use If/Else & modulo)
let pages = 0
if (contentToPaginate.length%itemPerPage === 0) {
	pages = contentToPaginate.length / itemPerPage
} else {
	pages = (contentToPaginate.length / itemPerPage) + 1
}

// CREATE links according to needed page numbers
let linkList = document.createElement("ul")
linkList.classList.add("paginate__number")
// Keep pages value without decimal
let rightPageNumber = Math.trunc(pages)

// Create previous & next links
let previousLink = document.createElement("li")
previousLink.classList.add("paginate__number-link", "previous-link")
previousLink.innerHTML = "<img src=\"assets/icons/arrow-left.svg\" alt=\"Page précédente\" class='previous-link__image'>"

let nextLink = document.createElement("li")
nextLink.classList.add("paginate__number-link", "next-link")
nextLink.innerHTML = "<img src=\"assets/icons/arrow-right.svg\" alt=\"Page suivante\" class='next-link__image'>"

// Initialize previous link initial value
previousLink.id = 1
// Initialize next link initial value
nextLink.id = rightPageNumber

// Add only previous link for this moment
linkList.appendChild(previousLink)

for (let i=1; i <= rightPageNumber; i++) {
	let pageLink = document.createElement("li")
	if (i===1) {
		// 1st page
		pageLink.classList.add("paginate__number-link")
		pageLink.classList.add("paginate__number-link--active")
		pageLink.id = i
		pageLink.textContent = `${i}...`
	} else if (i < rightPageNumber) {
		pageLink.classList.add("paginate__number-link")
		pageLink.id = i
		pageLink.textContent = `${i}...`
	} else if (i === rightPageNumber) {
		// last page
		pageLink.classList.add("paginate__number-link")
		pageLink.id = i
		pageLink.textContent = i
	}
	linkList.appendChild(pageLink)
}

// Add next link now
linkList.appendChild(nextLink)

linkContainer.appendChild(linkList)

// SET contentArray = []
// Display item on a page
// SHOW First X item per page
// LISTEN TO event click ON link
let pageLink = document.querySelectorAll(".paginate__number-link")
for (let d=0; d < pageLink.length; d++) {
	let rightLink = pageLink[d]
	rightLink.addEventListener("click", () => {

		// Handle previous & next links click
		// PS: Comment it if you didn't use paginate number class
		if (!rightLink.classList.contains("previous-link") || !rightLink.classList.contains("next-link")) {

			// Update clicked link class to make it active
			// Step 1: Remove active class from old link
			let oldActiveLink = document.querySelector(".paginate__number-link--active")
			oldActiveLink.classList.remove("paginate__number-link--active")

			// Step 2: Update active link
			rightLink.classList.add("paginate__number-link--active")
		}

		// Display right content on page
		let sliceBegin = (rightLink.id * itemPerPage) - itemPerPage
		let sliceEnd = rightLink.id * itemPerPage

		let contentArray = contentToPaginate.slice(sliceBegin, sliceEnd)
		// Empty paginate content
		gamesSection.textContent = ""

		// Fill out paginate content with right content
		for (let p=0; p<contentArray.length; p++) {
			gamesSection.appendChild(contentArray[p])
		}
	})
}