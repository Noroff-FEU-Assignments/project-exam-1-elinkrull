// Error handling

function showError(message) {
	const errorContainer = document.getElementById("homepage-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }

// Loading indicator

function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("homepage-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
}

// API call blog posts
const url = "https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts";

async function getPosts() {
	try {
		showLoadingIndicator();
		const response = await fetch(url);
	  	const data = await response.json();
		return data;

	} catch (error) {
		throw new Error("Sorry, we could not fetch the blog posts");
	  }
}


// function sanitizeData(rawData) {
// 	const div = createElement("div");
// 	div.innerHTML = rawData;
// 	const text = div.innerText;
// 	return text;
// }

async function displayPosts(data) {	
		const homepageContainer = document.getElementById("homepage-container");
		homepageContainer.innerHTML = "";
		data.slice(0, 3).forEach(element => {
			const card = createCard(element);
			homepageContainer.append(card);
		});

	function createCard(element) {
		console.log(element);
		const { id, title, jetpack_featured_media_url } = element;
		if (!id || !title || !jetpack_featured_media_url) {
			showError(error.message);	
			return;									
		} 

		const divElement = document.createElement("div");
		const h2Element = document.createElement("h2");
		const pElement = document.createElement("p");
		const imageElement = document.createElement("img");
		imageElement.classList.add("card-image");
		imageElement.src = jetpack_featured_media_url;
		divElement.classList.add("card");
		divElement.id = element.id;
		divElement.addEventListener("click", ()=> {
			window.location.href = `specificblog.html?id=${element.id}`;
		})
		h2Element.textContent = element.title.rendered;
		pElement.textContent = element.content.rendered;
		divElement.append(h2Element, imageElement)
		return divElement;
	}
}

async function init() {
	const data = await getPosts(url);
	displayPosts(data);
}

init();
