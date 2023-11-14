// Loading indicator

function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("blog-posts")
	showLoadingIndicator.innerHTML = "<li>Loading...</li>";
}

// API call 

const url = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/";

async function getPosts {
	try {
		showLoadingIndicator();
		const response = await fetch(url);
	  	const result = await response.json();
	  	return result;  
	} 
	
	// catch (error) {
	//   throw new Error("Sorry, we could not fetch the blog-posts");
	// }
}

async function displayPosts {
	try {
		const blogPosts = await getPosts();
		const blogPostsContainer = document.getElementById("blog-posts");
		blogPostsContainer.innerHTML = "";

		for (let i = 0; i < 10, i++) {
			const post = blogPosts[i];

			blogPostsContainer.innerHTML += `<div class= "all-posts-container">
			<a href="specificblog.html?id=${post.id}&title=${post.title.rendered}</a>
			<h2>${post.title.rendered}</h2>
			</div>`
		}
	}
	
	// catch (error) {
	// 	showError(error.message);
	//   }
}

displayPosts(); 