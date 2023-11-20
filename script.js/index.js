// Error handling

function showError(message) {
	const errorContainer = document.getElementById("homepage-blogs");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

// Loading indicator

function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("homepage-blogs");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
}

// API call blog posts
const url = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/";

async function getPosts() {
	try {
		showLoadingIndicator();
		const response = await fetch(url);
	  	const result = await response.json();
		return(result);

	} catch (error) {
		throw new Error("Sorry, we could not fetch the blog posts");
	  }
}

async function displayPosts() {	
	try {
		const blogPosts = await getPosts();
		const blogPostsContainer = document.getElementById("homepage-blogs");
		blogPostsContainer.innerHTML = "";

		for (let i = 0; i < 3; i++) {
			const post = blogPosts[i];

			blogPostsContainer.innerHTML += `<div class="homepage-blogs-container">
			<a href="specificblog.html?id=${post.id}&title=${post.title.rendered}"><h2 class="blog-box">${post.title.rendered}</h2></a>
			</div>`;
		}
	} catch (error) {
		showError(error.message);
	  }
}
	
displayPosts();