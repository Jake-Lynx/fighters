import { showGameIconCategory } from "./helper.js"

// Connect to database
const response = await fetch("database/games.json")
const games = await response.json()

// Variables
let communities = document.querySelector(".community-universe__list")

// Add communities to right section
// PS: community is based on games categories
// Step 1: extract communities list from games database
let communityList = []

for (let game of games) {
	if (!communityList.includes(game.category)) {
		communityList.push(game.category)
	}
}

// Step 2: Add communities list to DOM
for (let community of communityList) {
	let content = `
		<div class="community">
		    <div class="community__top-bar">
		        <img src="assets/icons/${showGameIconCategory(community)}.svg" alt="${community}">
		        <p class="community__title">${community}</p>
		    </div>
		    <div class="community__middle-bar">
		        <img src="assets/images/theme.jpg" alt="${community} community">
		    </div>
		    <div class="community__bottom-bar">
		        <a href="#" class="cta__simple">enter</a>
		    </div>
		</div>
	`
	communities.innerHTML += content
}