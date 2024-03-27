// Connect to database
const response = await fetch("database/events.json")
const database = await response.json()

// Date variables
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
const weekDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// Calendar variables
let calendar = document.querySelector(".event__calendar")
let calendarDate = document.querySelector(".event__calendar-date")
let calendarDay = document.querySelector(".event__calendar-day")

// Set Date
const date = new Date()

// Add date (month & year) in calendar
const todayDate = `${months[date.getMonth()]}, ${date.getFullYear()}`
calendarDate.textContent = todayDate

// Add days in calendar
weekDay.map((day) => {
	let dayNumber = document.createElement("th")
	dayNumber.textContent = day.slice(0, 2)
	calendarDay.appendChild(dayNumber)
})

// Add days number in calendar
// Step 1: Know how many days in current month
function getDaysInMonth(year, month) {
	return new Date(year, month, 0).getDate()
}

const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1 // Because month start by 0
let daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth)

// Step 2: know 1rst day of a month
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
const firstDayNumber = firstDay.getDay()
let shortDay = weekDay.map(day => day.slice(0, 2))

// Step 3: Set first day
let tableFirstRow = document.createElement("tr")
tableFirstRow.classList.add("event__calendar-number--row")

let dayCount = 1 // set day number count
// Loop on 1rst week
for (let m=0; m < weekDay.length; m++) {
	let tableCell = document.createElement("td")
	tableCell.classList.add("event__calendar-number--cell")

	// If we're on 1rst day of current month
	if (shortDay[m] === weekDay[firstDayNumber].slice(0,2)) {
		// Set day
		tableCell.textContent = 1
		tableFirstRow.appendChild(tableCell)
		dayCount++
	} else if (m <= firstDayNumber) {
		// Set an empty cell
		tableCell.textContent = ""
		tableFirstRow.appendChild(tableCell)
	} else {
		// Filled out cell rightly
		tableCell.textContent = dayCount
		tableFirstRow.appendChild(tableCell)
		dayCount++
	}
}
calendar.appendChild(tableFirstRow)

// Step 4: Set others days
// I've add +1 beacuse at end of week, dayCount is increased to 1
daysInCurrentMonth = daysInCurrentMonth - dayCount + 1

// Loop on current month still days
// with 7 as steps because a week contains 7 days
for (let i=0; i < daysInCurrentMonth; i +=7) {
	// Create new table row that will contains days
	let tableRow = document.createElement("tr")
	tableRow.classList.add("event__calendar-number--row")

	// Loop on a week (that contains 7 days)
	for (let d=0; d < 7; d++) {
		let tableCell = document.createElement("td")
		tableCell.classList.add("event__calendar-number--cell")
		tableCell.textContent = dayCount
		tableRow.appendChild(tableCell)
		dayCount++
	}
	calendar.appendChild(tableRow)
}

// Step 5: Set events on days
// We need some database
// Here, we use an objects array as database
// It'll be easy to use JSON file (or format)
// as database later in project
// Add class (calendar__specific-event) to cell (td)

// Add events to calendar
// Get all days in calendar
let dayItem = document.querySelectorAll(".event__calendar-number--cell")
let eventImage = document.querySelector(".event__image")
let eventContentTitle = document.querySelector(".event__content-title")
let eventContentTime = document.querySelector(".event__content-time--text")
let eventContentPlace = document.querySelector(".event__content-place--text")
let eventContentDescription = document.querySelector(".event__content-description")

// Display 1rst event data
const firstData = database[0]

// Add event's image
const firstEventImage = `<img src="${firstData.image}" alt="${firstData.title}">`
eventImage.innerHTML = firstEventImage

// Add event's content
eventContentTitle.textContent = firstData.title
eventContentTime.textContent = firstData.time
eventContentPlace.textContent = firstData.place
eventContentDescription.textContent = firstData.description

for (let i=0; i < dayItem.length; i++) {
	let dayValue = dayItem[i]
	let eventDate = dayValue.textContent

	// Loop on events from database
	for (let event of database) {
		if(event.date === parseInt(dayValue.textContent)) {
			// Add event class to tell user that an event
			// will occur at this date
			dayValue.classList.add("event__calendar-specific")
			let newContent = `
			<span class="tooltip">
				${eventDate}
				<span class="tooltip__text">
					<h3>${event.title}</h3>
					<p>
						<b><u>Time</u>:</b> ${event.time}
						<br>
						<b><u>Place</u>:</b> ${event.place}
						<br>
						<b><u>Description</u>:</b> ${event.description}
					</p>
				</span>
			</span>
			`
			dayValue.innerHTML = newContent
		}
	}

	// Display event's image on click
	dayValue.addEventListener("click", () => {
		// Filter database to try get data
		// which clicked date equal to event date
		let images = database.filter((item) => {
			return item.date === parseInt(eventDate)
		})
		let rightImage = ""

		// If filtered data length > 0, that means we get event date
		if (images.length > 0) {
			let data = images[0]

			// Update event image div content
			rightImage = `<img src="${data.image}" alt="${data.title}">`
			eventImage.innerHTML = rightImage

			// Update event details div content
			eventContentTitle.textContent = data.title
			eventContentTime.textContent = data.time
			eventContentPlace.textContent = data.place
			eventContentDescription.textContent = data.description
		}
	})
}