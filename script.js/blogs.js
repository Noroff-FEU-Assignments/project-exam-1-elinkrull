//Error handling

function showError(message) {
	const errorContainer = document.getElementById("blog-posts");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

// Loading indicator

function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("blog-posts");
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
		const blogPostsContainer = document.getElementById("blog-posts");
		blogPostsContainer.innerHTML = "";

		for (let i = 0; i < 10; i++) {
			const post = blogPosts[i];

			blogPostsContainer.innerHTML += `<div class="all-posts-container">
			<a href="specificblog.html?id=${post.id}&title=${post.title}"><h2>${post.title.rendered}</h2></a>
			</div>`;
		}
	} catch (error) {
		showError(error.message);
	  }
}
	
displayPosts();

// API call to get media


const mediaURL = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/media";


async function getPictures() {
	try {
		showLoadingIndicator();
		const response = await fetch(url);
	  	const result = await response.json();
		return(result);

	} catch (error) {
		throw new Error("Sorry, we could not fetch the blog posts");
	  }
}

async function displayPictures() {
	try {
		const blogPictures = await getPictures();
		const blogPicturesContainer = document.getElementById("blog-pictures");
		blogPicturesContainer.innerHTML = "";
	
		for (let i = 0; i < blogPictures.length; i++) {
			const picture = blogPictures[i];

			blogPicturesContainer.innerHTML += `<div class="all-pictures-container">
			<a href="specificblog.html?id=${picture.id}&title=${picture.title}"><img src="${picture.media_details.file}" alt="${picture.title.rendered}" class="pictures"></a>
			<h2>${post.title.rendered}</h2>
			</div>`;
		}
	} catch (error) {
		showError(error.message);
	  }

}