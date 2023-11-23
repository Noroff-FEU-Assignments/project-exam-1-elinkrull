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


async function displayPosts(data) {	
		const homepageContainer = document.getElementById("blog-container");
		homepageContainer.innerHTML = "";
		data.slice(0, 10).forEach(element => {
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
			divElement.addEventListener("click", () => {
				window.location.href = `specificblog.html?id=${element.id}`;
			  });

			h2Element.textContent = element.title.rendered;
			pElement.textContent = element.content.rendered;
			divElement.append(h2Element, imageElement);
			return divElement;
		}
	}

	async function init() {
		const data = await getPosts(url);	
		displayPosts(data);
	}
	
	init();

	//function to load more blog posts when button is being clicked
// const viewMoreButton = getElementById("view-more-button");

// viewMoreButton.addEventListener("click",() => {
// 	homepageContainer.innerHTML = "";
// 	data.slice(0, 20).forEach(element => {
// 		const card = createCard(element);
// 		homepageContainer.append(card);
// 		});
// 	})
