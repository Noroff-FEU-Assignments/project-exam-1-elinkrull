// Error handling

function showError(message) {
	const errorContainer = document.getElementById("carousel-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

// Loading indicator

function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("carousel-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
}

//stop the loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("carousel-container");
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

//function to display the blog posts
async function displayPosts() {
	try {
	  const blogPosts = await getPosts();
	  const carouselContainer = document.getElementById("carousel-container");
	  carouselContainer.innerHTML = "";
  
	  for (let i = 0; i < 8 ; i++) {
		const post = blogPosts[i];
  
		carouselContainer.innerHTML += `<li class="index-card">
											 <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}">
											 <img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}" class="card-image"></a>
											 <h2 class="post-title">${post.title.rendered}</h2>
											</li>`;			
							
//creating the carousel for the 8 blog posts
const slidesContainer = document.getElementById("carousel-container");
const slide = carouselContainer.querySelector(".index-card");
const prevButton = document.getElementById("carousel-arrow-prev");
const nextButton = document.getElementById("carousel-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
	  
	  }
 } catch (error) {
	  showError(error.message);
	}}
  
  displayPosts();


//function to navigate to blogs.html when view more button is being clicked
const viewMoreButton = document.getElementById("view-more-button")

viewMoreButton.addEventListener("click", () => {
		window.location.href = `blogs.html`;
});

//function to navigate to index.html when the sitename in header on mobile view is getting clicked
const navigateHome = document.querySelector(".sitename")

navigateHome.addEventListener("click", () => {
	window.location.href = `index.html`;
});
