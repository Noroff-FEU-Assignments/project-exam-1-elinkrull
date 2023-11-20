// Error handling

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

async function fetchPosts() {
	showLoadingIndicator();
	try {
		const response = await fetch("https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/");
		if (!response.ok) {
			throw new Error("error");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Sorry, we could not fetch the blog posts", error);
	}
}

async function displayPosts() {
	const data = await fetchPosts();
	const allPosts = document.getElementById("blog-posts");
	allPosts.innerHTML ="";

	data.forEach((post) => {
		const blogPosts = document.createElement("div")
		blogPosts.textContent = post.title.rendered;
		blogPosts.addEventListener("click", () => {
			window.location.href = `specificblog.html?id=${post.id}`;
		});
		allPosts.appendChild(blogPosts);
	});
}

displayPosts();
