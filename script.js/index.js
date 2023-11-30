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

async function displayPosts() {
	try {
	  const blogPosts = await getPosts();
	  const carouselContainer = document.getElementById("carousel-container");
	 carouselContainer.innerHTML = "";
  
	  for (let i = 0; i < 8 ; i++) {
		const post = blogPosts[i];
  
		carouselContainer.innerHTML += `<li class="index-card">
											 <a href="specificblog.html?id=${post.id}&title=${post.title.rendered}">
											 <img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}" class="card-image">
											 <h2 class="post-title">${post.title.rendered}</h2></>
											</li>`;			
							
	
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




// -------------------------------------

// //create ul with the buttons
// const carouselContainer = document.getElementById("carousel-container");
// var carouselButtons = document.createElement('ul');

// carouselButtons.className = 'controls';
// carouselButtons.innerHTML += '<li class="index-card">
// 	<button type="button" class="carousel-arrow-left">
// 	  <i class="fa-solid fa-chevron-left"></i>
// 	</button>
//   </li>
//   <li>
// 	<button type="button" class="btn-next">
// 	<i class="fa-solid fa-chevron-right"></i>
// 	</button>
//   </li>';

// console.log(carouselButtons);
// carouselContainer.appendChild(carouselButtons);

// --------------------------------------------


// const carouselItems = document.querySelectorAll(".card")
// let currentIndex = 1;

// function slideShow(index) {
// 	carouselItems.forEach(card => {
// 	card.style.display = "none";
// 	});

// 	carouselItems[index].style.display = "block";
// }

// function nextSlide() {
// 	currentIndex = (currentIndex + 1) % carouselItems.length;
// 	slideShow(currentIndex);
// }

// function previousSlide() {
// 	currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
// 	slideShow(currentIndex);
// }

// slideShow(currentIndex);

// //eventlisteners for arrows
// document.getElementById("carousel-arrow-left").addEventListener("click", nextSlide);
// document.getElementById("carousel-arrow-right").addEventListener("click", previousSlide);


// -----------------------------------------

//Abi´s way of writing the code:



// // API call blog posts
// const url = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts?per_page=20";
// async function getPosts() {
// 	try {
// 		showLoadingIndicator();
// 		const response = await fetch(url);
// 	  	const data = await response.json();
// 		return data;

// 	} catch (error) {
// 		throw new Error("Sorry, we could not fetch the blog posts");
// 	  }
// }

// -------------------------

// // function sanitizeData(rawData) {
// // 	const div = createElement("div");
// // 	div.innerHTML = rawData;
// // 	const text = div.innerText;
// // 	return text;
// // }
 
// -------------------------------------


// async function displayPosts(data) {	
// 	const carouselContainer = document.getElementById("carousel-container");
// 	carouselContainer.innerHTML = "";
// 	data.slice(0, 3).forEach(element => {
// 		const card = createCard(element);
// 		carouselContainer.append(card);
// 	});

// function createCard(element) {
// 	console.log(element);
// 	const { id, title, jetpack_featured_media_url } = element;
// 	if (!id || !title || !jetpack_featured_media_url) {
// 		showError(error.message);	
// 		return;									
// 	} 

// 	const divElement = document.createElement("div");
// 	const h2Element = document.createElement("h2");
// 	const pElement = document.createElement("p");
// 	const imageElement = document.createElement("img");
// 	imageElement.classList.add("card-image");
// 	imageElement.src = jetpack_featured_media_url;
// 	divElement.classList.add("index-card");
// 	divElement.id = element.id;
// 	divElement.addEventListener("click", ()=> {
// 		window.location.href = `specificblog.html?id=${element.id}`;
// 	})
// 	h2Element.textContent = element.title.rendered;
// 	pElement.textContent = element.content.rendered;
// 	divElement.append(h2Element, imageElement)
// 	return divElement;

// }
// }


// async function init() {
// const data = await getPosts(url);
// displayPosts(data);
// }

// init();

