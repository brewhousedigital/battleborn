if(document.getElementById("roll-a-d6-to-login") !== null) {
	let form = document.getElementById("roll-a-d6-to-login");

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		// Backendless Login
		window.location = "/starting-zone/";
	})
}






if(document.getElementById("roll-a-d20-to-register") !== null) {
	let form = document.getElementById("roll-a-d20-to-register");

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		// Backendless Login
		window.location = "/starting-zone/";
	})
}
