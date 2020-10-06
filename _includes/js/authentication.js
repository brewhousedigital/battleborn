// Login page
if(document.getElementById("roll-a-d6-to-login") !== null) {
	let form = document.getElementById("roll-a-d6-to-login");
	authentication(form, "login");
}


// Registration
if(document.getElementById("roll-a-d20-to-register") !== null) {
	let form = document.getElementById("roll-a-d20-to-register");
	authentication(form, "register");
}


// Authentication piece
function authentication(form, type) {
	form.addEventListener("submit", function(e) {
		e.preventDefault();

		let formEl = form.elements;
		let submitText = formEl['submit'].innerText;
		formSubmitBtn(formEl, submitText, "start");

		// Backendless Login
		if(type === "login") {
			Backendless.UserService.login(formEl['email'].value, formEl['password'].value, true)
				.then(function(response) {
					localStorage.setItem(cache_user, JSON.stringify(response));
					cache['user'] = response;
					window.location = "/starting-zone/";
				})
				.catch(function(error) {
					createToast(error.message);
				})
				.finally(function() {
					formSubmitBtn(formEl, submitText, "end");
				});
		}

		if(type === "register") {
			let newUser = new Backendless.User();
			newUser.email = formEl['email'].value;
			newUser.password = formEl['password'].value;

			console.log(newUser);

			Backendless.UserService.register(newUser)
				.then(function(response) {
					console.log(response);
					localStorage.setItem(cache_user, JSON.stringify(response));
					cache['user'] = response;
					window.location = "/roll-a-d20-to-register/confirm/";
				})
				.catch(function(error) {
					createToast(error.message);
				})
				.finally(function() {
					formSubmitBtn(formEl, submitText, "end");
				});
		}

	});
}


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
}


// Get user data
if(localStorage.getItem(cache_user) !== null) {
	cache['user'] = JSON.parse(localStorage.getItem(cache_user));
	visible_authenticated(cache['user']);
} else {
	Backendless.UserService.getCurrentUser()
		.then(function(response) {
			cache['user'] = response;
			localStorage.setItem(cache_user, JSON.stringify(cache['user']));
			visible_authenticated(cache['user']);
		})
		.catch(function (error) {
			localStorage.removeItem(cache_user);
			console.log(error);
		});
}


// Check if user is still logged in
function validateUser() {
	Backendless.UserService.isValidLogin()
		.then(function(response) {
			if(!response) {
				localStorage.removeItem(cache_user);
				window.location = "/roll-a-d6-to-login/";
			}
		})
		.catch(function(error) {
			console.log(error);
		});
}


// Log user out
if(window.location.pathname === "/roll-a-d100-to-log-out/") {
	Backendless.UserService.logout()
		.then(function() {
			localStorage.removeItem(cache_user);
			window.location = "/";
		})
		.catch(function() {
			window.location = "/";
		});
}
