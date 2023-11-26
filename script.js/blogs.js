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
											 <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}"><img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}" class="card-image">
											 <h2>${post.title.rendered}</h2></a>
											<a href="specificblog.html?id=${post.id}&title=${post.title.rendered}" class="read-more-button"><span>Read more</span></a>
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





// async function displayPosts(data) {	
// 		const homepageContainer = document.getElementById("blog-container");
// 		homepageContainer.innerHTML = "";
// 		data.slice(0, 10).forEach(element => {
// 			const card = createCard(element);
// 			homepageContainer.append(card);
// 		});

// 		function createCard(element) {
// 			console.log(element);
// 			const { id, title, jetpack_featured_media_url } = element;
// 			if (!id || !title || !jetpack_featured_media_url) {
// 				showError(error.message);	
// 				return;									
// 			} 
	
// 			const divElement = document.createElement("div");
// 			const h2Element = document.createElement("h2");
// 			const pElement = document.createElement("p");
// 			const imageElement = document.createElement("img");
// 			imageElement.classList.add("card-image");
// 			imageElement.src = jetpack_featured_media_url;
// 			divElement.classList.add("card");
// 			divElement.id = element.id;
// 			divElement.addEventListener("click", () => {
// 				window.location.href = `specificblog.html?id=${element.id}`;
// 			  });

// 			h2Element.textContent = element.title.rendered;
// 			pElement.textContent = element.content.rendered;
// 			divElement.append(h2Element, imageElement);
// 			return divElement;
// 		}
// 	}

// 	async function init() {
// 		const data = await getPosts(url);	
// 		displayPosts(data);
// 	}
	
// 	init();
