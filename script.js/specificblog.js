//Error handling
function showError(message) {
	const errorContainer = document.getElementById("specific-post-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }
  
  //Loading indicator
  function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("specific-post-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
  }
  
  // Function to extract the blog post ID from the query parameter
  function getPostIdFromQuery() {
	try {
	  const urlParams = new URLSearchParams(window.location.search);
	  const id = urlParams.get("id");
	  return id;
	} catch (error) {
	  throw new Error("Sorry, we could not fetch the Id");
	}
  }
  
  // Function to extract the blog post title from the query parameter
  function getPostTitleFromQuery() {
	try {
	  const urlParams = new URLSearchParams(window.location.search);
	  const title = urlParams.get("title");
	  return title;
	} catch (error) {
	  throw new Error("Sorry, we could not fetch the title");
	}
  }
  
  // Function to fetch blog post details using the blog post ID and populate the details section
  async function fetchPostDetail() {
	try {
	  showLoadingIndicator();
	  const postId = getPostIdFromQuery();
  
	  const title = getPostTitleFromQuery();
  
	  if (!postId) 
	  console.log(showError);
	//   showError(message);

  	  const response = await fetch(`https://projectexam1.elinjakobsen.no/wp-json/wp/v2/posts/${postId}`);
	  const postDetail = await response.json();
  
	  const postTitleContainer = document.getElementById("title");
	  const postDetailContainer = document.getElementById("specific-post-container");
	  postDetailContainer.innerHTML = "";
  
	  //Add blog post title to the title of the page
	//   postTitleContainer.textContent = title;
	  postDetailContainer.innerHTML += `           
		<div class="specific-blog-post">
			<h1>${postDetail.title.rendered}</h1> 
			<p>${postDetail.content.rendered}</p>
		</div>
		`;
	} catch (error) {
		console.log(error.message);
	//   showError(error.message);
	}
  }
  
  fetchPostDetail();
