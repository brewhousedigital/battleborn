// Show / Hide authenticated content
function visible_authenticated(user) {
	let authenticatedElements = [];
	let unauthenticatedElements = [];

	if(document.querySelector("[data-visible='auth']") !== null) {
		authenticatedElements = document.querySelectorAll("[data-visible='auth']");
	}

	if(document.querySelector("[data-visible='unauth']") !== null) {
		unauthenticatedElements = document.querySelectorAll("[data-visible='unauth']");
	}

	if(user !== null) {
		authenticatedElements.forEach(function(el) {el.style.display = "";});
		unauthenticatedElements.forEach(function(el) {el.style.display = "none";});
	} else {
		authenticatedElements.forEach(function(el) {el.style.display = "none";});
		unauthenticatedElements.forEach(function(el) {el.style.display = "";});
	}

	nav.classList.add("loaded");
}
