// We use dummy.json as fake database for games reviews
// To adapt database to our project:
// 1: we suppose that posts are our games
// 2: we use posts which id is 3 (free are you to change it)
// 2: we use comments as reviews
// 3: we limit reviews as 4 (free are you to change it)
// 4: to simulate last reviews, we skip seven first comments
// 5: we generate random image as avatar (using https://picsum.photos/ platform)
// 6: for review writting time, we use comment id
// (it's not best but for this moment, it do the job)
// So, let's go!!!

const response = await fetch("https://dummyjson.com/comments?limit=4&skip=7&select=body,3")
const data = await response.json()

// Variables
let reviewsSection = document.querySelector(".specific-review__list")

for (let review of data.comments) {
	let randomNumber = Math.floor(Math.random() * 26)
	let content = `
		<div class="review">
			<div class="review__main-container">
				<img src="https://picsum.photos/200/300?random=${randomNumber}" alt="avatar ${review.user.username}" class="review__avatar">
				<div class="review__content">
					<p class="review__name">
						${review.user.username}
					</p>
					<p class="review__comment">
						${review.body}
					</p>
				</div>
			</div>
			<p class="review__time">${review.id}min ago</p>
		</div>
	`

	reviewsSection.innerHTML += content
}