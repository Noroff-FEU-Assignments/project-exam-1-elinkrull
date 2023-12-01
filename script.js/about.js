//function to navigate to index.html when the sitename in header on mobile view is getting clicked
const navigateHome = document.querySelector(".sitename")

navigateHome.addEventListener("click", () => {
	window.location.href = `index.html`;
});