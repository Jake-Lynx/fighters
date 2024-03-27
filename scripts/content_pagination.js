const paginateContent = document.querySelector(".paginate__content")
let linkContainer = document.querySelector(".paginate__link")

// Create database (a json file can be used in practice)
let cardNumber = 37
let itemPerPage = 6 // item we want to display per page
let database = []

for (let i=1; i <= cardNumber; i++) {
	let card = document.createElement("div")
	card.classList.add("card")
	card.textContent = i
	// Fill out database
	database.push(card)
	
	// FIll out paginate content according to itemPerPage value
	if (i <= itemPerPage) {
		paginateContent.appendChild(card)
	}
}

// CALCULATE pages is needed to display all database content
// according to items that must be show per page
// Handle case where content number is odd (use If/Else & modulo)
let pages = 0
if (database.length%itemPerPage === 0) {
	pages = database.length / itemPerPage
} else {
	pages = (database.length / itemPerPage) + 1
}

// CREATE links according to needed page numbers
for (let i=1; i <= pages; i++) {
	let pageLink = document.createElement("a")
	if (i===1) {
		pageLink.classList.add("paginate__link-item")
		pageLink.classList.add("paginate__link-item--active")
		pageLink.href = "#"
		pageLink.id = i
	} else {
		pageLink.classList.add("paginate__link-item")
		pageLink.href = "#"
		pageLink.id = i
	}
	linkContainer.appendChild(pageLink)
}

// SET contentCount = 0
// SET contentArray = []
// Display item on a page
// SHOW First X item per page
// LISTEN TO event click ON link
let pageLink = document.querySelectorAll(".paginate__link-item")
for (let d=0; d < pageLink.length; d++) {
	let rightLink = pageLink[d]
	rightLink.addEventListener("click", () => {
		console.log(`Link n°${rightLink.id}`)
		// Update clicked link class to make it active
		// Step 1: Remove active class from old link
		let oldActiveLink = document.querySelector(".paginate__link-item--active")
		oldActiveLink.classList.remove("paginate__link-item--active")
		
		// Step 2: Update active link
		rightLink.classList.add("paginate__link-item--active")
		
		// Display right content on page
		let sliceBegin = (rightLink.id * itemPerPage) - itemPerPage
		let sliceEnd = rightLink.id * itemPerPage

		let contentArray = database.slice(sliceBegin, sliceEnd)
		// Empty paginate content
		paginateContent.textContent = ""
		
		// Fill out paginate content with right content
		for (let p=0; p<contentArray.length; p++) {
			paginateContent.appendChild(contentArray[p])
		}
	})
}