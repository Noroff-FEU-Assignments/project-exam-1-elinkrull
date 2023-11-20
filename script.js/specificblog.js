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
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("id");
}

 // Function to extract the blog post title from the query parameter
// function getPostTitleFromQuery() {
// 	try {
// 		const urlParams = new URLSearchParams(window.location.search);
// 		const title = urlParams.get("title");
// 		return title;
// 	}	catch (error) {
// 		throw new Error("Sory, we could not fetch the Title");
// 	}
// }

async function fetchPostDetail() {
	try {
		showLoadingIndicator();
	
	const postId = getPostIdFromQuery();
	
	// const title = getPostTitleFromQuery();

	if(!postId) showError(message);

	const response = await fetch(`https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/${postId}`);
	const postDetail = await response.json();

	// const postTitleContainer = document.getElementById("title");
	const postDetailContainer = document.getElementById("specific-post-container");
	postDetailContainer.innerHTML= "";


	//Add post title to the title of the page
	// postTitleContainer.textContent = title;
	postDetailContainer.innerHTML = `
	<h2>${postDetail.id}: ${postDetail.title.rendered}</h2>
	<p>${postDetail.content.rendered}</p>
	`;
} catch (error) {
	showError(error.message);
  }
}

fetchPostDetail();