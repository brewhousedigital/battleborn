const dbResponse = document.getElementById("db-response");
const APP_ID = 'BFD3873C-0565-EBFE-FFA8-8001D60AC000'
const API_KEY = '8561E43D-334E-44E4-B05E-40A81D6E081A'
Backendless.initApp(APP_ID, API_KEY);




if(document.querySelector("[data-toggle='buttons']") !== null) {
	document.querySelectorAll("[data-toggle='buttons']").forEach(function(btnGroup) {
		btnGroup.querySelectorAll("input").forEach(function(input) {
			input.addEventListener("change", function() {
				btnGroup.querySelectorAll("input").forEach(function(input) {
					// Reset all active radio states
					let parentLabel = input.parentNode;
					parentLabel.classList.remove("active");
				});

				// Mark the selected radio option as active
				let parentLabel = this.parentNode;
				parentLabel.classList.add("active");
			});
		});
	});
}

















