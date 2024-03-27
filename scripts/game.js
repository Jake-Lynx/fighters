// Get data
let games = window.localStorage.getItem("games")
if (games === null) {
	// Get data from database
	const reponseGames = await fetch("database/games.json")
	games = await reponseGames.json()

	// Convert it to JSON format
	const gamesDb = JSON.stringify(games)

	// Save it into localStorage
	window.localStorage.setItem("games", gamesDb)
} else {
	games = JSON.parse(games)
}

// Variables
let gameTitle = document.querySelectorAll(".specific-about__title")
let gamePoster = document.querySelector(".specific-about__minimalist-card")
let gameSynopsis = document.querySelector(".specific-about__synopsis")
let avatarList = document.querySelector(".nav-avatar")
let characterImage = document.querySelector(".specific-characters__image")
let characterName = document.querySelectorAll(".specific-characters__name")
let characterSkills = document.querySelector(".specific-characters__skills-list")
let characterDescription = document.querySelectorAll(".specific-characters__description")

// Get only last game saved in database
// Step 1: Sort database in newest order
let newGames = Array.from(games).sort((a, b) => {
	return b.id - a.id
})

// Step 2: Keep 1st item of sorted database
let game = newGames[0]

// Fill out about section with data
// About section
for (let i=0; i < gameTitle.length; i++) {
	gameTitle[i].textContent = game.title
}
gamePoster.innerHTML = `
	<div class="minimalist-card" style="background-image: url(${game.image}); background-size: cover">
		<img class="minimalist-card__character" src="${game.characters[0].image}" alt="${game.title}">
	</div>
`
gameSynopsis.textContent = game.synopsis

// Characters section
// Game's characters avatar
for (let character of game.characters) {
	let avatarSection = document.createElement("div")
	avatarSection.classList.add("nav-avatar__content")
	avatarSection.innerHTML = `
		<img src="${character.avatar}" alt="Avatar ${character.name}" class="nav-avatar__content-item">
		<div class="nav-avatar__content-blur" id="${character.id}"></div>
	`
	avatarList.appendChild(avatarSection)
}

// Others characters data
// Step 1: Display 1st data
// (When user arrives on page)
const firstCharacter = game.characters[0]
characterImage.src = firstCharacter.image
characterImage.alt = firstCharacter.name
// Show avatar
let firstAvatarBlur = document.querySelector(".nav-avatar__content-blur")
firstAvatarBlur.classList.add("show-avatar")

// Display
// - name
// - description
// - skills
for (let characterTitle of characterName) {
	characterTitle.innerHTML = `
		${firstCharacter.name}
		<br>
		<small class="specific-characters__pseudo">
			(${firstCharacter.pseudo})
		</small>
	`
}
for (let characterSummary of characterDescription) {
	characterSummary.textContent = firstCharacter.description
}
for (let skill of firstCharacter.skills) {
	let skillData = document.createElement("li")
	skillData.classList.add("specific-characters__skills-item")
	skillData.innerHTML = `
		<span class="skill-label">${skill.title}</span>
		<div class="skill-bar">
			<div class="skill-value" style="width: ${skill.value}%"></div>
		</div>
	`
	characterSkills.appendChild(skillData)
}

// Step: 2: Show others character details
// when user click on an avatar (Handle avatar click)
let avatarsBlur = document.querySelectorAll(".nav-avatar__content-blur")
for (let i=0; i < avatarsBlur.length; i++) {
	let avatar = avatarsBlur[i]
	avatar.addEventListener("click", () => {
		// Show active character's avatar
		avatar.classList.add("show-avatar")

		// Hide others characters avatar
		for (let othersAvatar of avatarsBlur) {
			if (othersAvatar.id !== avatar.id) {
				othersAvatar.classList.remove("show-avatar")
			}
		}
		
		// Find right character
		// We use -1 beacause arrays start with 0
		let character = game.characters[avatar.id-1]

		// Show character data
		// - image
		// - name
		// - description
		// - skills (clean old skills list before)
		
		// Image 
		characterImage.src = character.image
		characterImage.alt = character.name

		// Name
		for (let characterTitle of characterName) {
			characterTitle.innerHTML = `
				${character.name}
				<br>
				<small class="specific-characters__pseudo">
					(${character.pseudo})
				</small>
			`
		}

		// Description
		for (let characterSummary of characterDescription) {
			characterSummary.textContent = character.description
		}

		// Skills
		// Clean old skils
		characterSkills.textContent = ""

		// Update skills
		for (let skill of character.skills) {
			let skillData = document.createElement("li")
			skillData.classList.add("specific-characters__skills-item")
			skillData.innerHTML = `
				<span class="skill-label">${skill.title}</span>
				<div class="skill-bar">
					<div class="skill-value" style="width: ${skill.value}%"></div>
				</div>
			`
			
			characterSkills.appendChild(skillData)
		}
	})
}