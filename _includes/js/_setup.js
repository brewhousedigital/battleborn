const APP_ID = 'BFD3873C-0565-EBFE-FFA8-8001D60AC000'
const API_KEY = '8561E43D-334E-44E4-B05E-40A81D6E081A'
Backendless.initApp(APP_ID, API_KEY);


// Global variables
let cache = {};
let spinner = "<span class='spinner-border d-inline-block align-middle' role='status'><span class='sr-only'>Loading...</span></span>";


// Cache objects
let cache_user = "cache_user";


// Global functions
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


function createToast(text) {
	let toast = document.getElementById("toast");

	toast.querySelector("#toast-message").innerText = text;
	toast.style.display = "block";

	setTimeout(function() {
		toast.querySelector("#toast-message").innerText = "";
		toast.style.display = "none";
	}, 10000);
}


function formSubmitBtn(el, text, status) {
	if(status === "start") {
		el['submit'].disabled = true;
		el['submit'].innerHTML = spinner;
	}

	if(status === "end") {
		el['submit'].innerText = text;
		el['submit'].disabled = false;
		el['submit'].focus();
	}
}













