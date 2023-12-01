//Error handling
function showError(message) {
	const errorContainer = document.getElementById("blog-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

// Loading indicator
function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("blog-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
}

//stop the loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("blog-container");
    loadingIndicator.innerHTML = "";
}

// API call blog posts
const url = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts?per_page=30"

async function getPosts() {
	try {
		showLoadingIndicator();
		const response = await fetch(url);
	  	const result = await response.json();
		return(result);

	} catch (error) {
		throw new Error("Sorry, we could not fetch the blog posts");
	  } finally {
		hideLoadingIndicator();
	  }
}

async function displayPosts() {
	try {
	  const blogPosts = await getPosts();
	  const blogPostsContainer = document.getElementById("blog-container");
	 blogPostsContainer.innerHTML = "";
  
	  for (let i = 0; i < blogPosts.length ; i++) {
		const post = blogPosts[i];
  
		blogPostsContainer.innerHTML += `<div class="card">
											 <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}"><img src=${post.jetpack_featured_media_url} alt="${post.title.rendered}" class="blog-image"></a>
											 <h2 class="post-title">${post.title.rendered}</h2>
											 <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}"><button class="read-more-button">Read more</button></a>
											</div>`;

 //display first 10 posts on the page
  const cards = document.querySelectorAll('.card');

  const cardsArray = Array.from(cards);

  const first10Cards = cardsArray.slice(0, 10);
  
  first10Cards.forEach(card => {
	card.style.display = 'block';
  });				

	  }	
	} catch (error) {
	  showError(error.message);
	}
  }
  
  displayPosts();

//   <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}"</a>
// function to load more blog posts when button is being clicked

const viewMore = document.querySelector(".view-more-button");
let currentPosts = 10;

viewMore.addEventListener("click",(event) => {
	const blogPosts = [...document.querySelectorAll(".card")];

	for (let i = currentPosts; i < currentPosts + 10; i ++) {
			if (blogPosts[i]) {
				blogPosts[i].style.display = "block";
	}
}

currentPosts += 20;

if(currentPosts >= blogPosts.length) {
	event.target.style.display = "none";
}
});

//function to navigate to index.html when the sitename in header on mobile view is getting clicked
const navigateHome = document.querySelector(".sitename")

navigateHome.addEventListener("click", () => {
	window.location.href = `index.html`;
});