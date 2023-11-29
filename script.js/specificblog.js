//Error message
function showError(message) {
	const errorContainer = document.getElementById("specific-post-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

//Loading indicator
function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("specific-post-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
  }

// Function to extract the blog post ID from the query parameter
function getPostIdFromQuery() {
	try {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	console.log(id);
	return id;

	} catch (error) {
		throw new Error("Sorry, we could not fetch the Id");
	}
}


//  Function to extract the blog post title from the query parameter
// function getPostTitleFromQuery() {
// 	try {
// 		const urlParams = new URLSearchParams(window.location.search);
// 		const title = urlParams.get("title");
// 		console.log(title);
// 		return title;
// 	}	catch (error) {
// 		throw new Error("Sorry, we could not fetch the Title");
// 	}
// }

async function fetchPostDetail() {
	try {
		showLoadingIndicator();
	
	const postId = getPostIdFromQuery();
	
	// const title = getPostTitleFromQuery();

	if(!postId) {
		showError("The blog post ID is not avaliable");
		return;
	}

	const response = await fetch(`https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/${postId}`);
	if (!response.ok) {
		throw new Error("HTTP error");
	 }
	const postDetail = await response.json();

	// const postTitleContainer = document.getElementById("title");
	const postDetailContainer = document.getElementById("specific-post-container");
	postDetailContainer.innerHTML= "";

	// Add post title to the title of the page
	// postTitleContainer.textContent = title;
	postDetailContainer.innerHTML = `
	<h2>${postDetail.id}: ${postDetail.title.rendered}</h2>
	<p>${postDetail.content.rendered}</p>

		<button data-open-modal></button>

		<dialog data-modal class="modal">
			<div>This is a modal</div>
			<button data-close-modal>Close</button>
		</dialog>
	`;

const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")

openButton.addEventListener("click", () => {
	modal.showModal()
})

closeButton.addEventListener("click", () => {
	modal.close()
})

modal.addEventListener("click", e => {
const dialogDimensions = modal.getBoundingClientRect()
if (
	e.clientX < dialogDimensions.left ||
	e.clientX < dialogDimensions.right ||
	e.clientY < dialogDimensions.top||
	e.clientY < dialogDimensions.bottom
) {
	modal.close()
}
})


} catch (error) {
	showError(error.message);
  }
}

fetchPostDetail();

// 	if(!name) {
// 		showError("The blog posts title is not available");
// 		return;
// 	}

