if(document.getElementById("campaign-create") !== null) {
	let form = document.getElementById("campaign-create");

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		// Backendless Login
		let randomNum = Math.round(Math.random() * 100000);
		window.location = "/starting-zone/campaign/view/#" + randomNum;
	});
}


