let settingsAnimations = "settings-animations";
let settingsAnimationsClass = "no-motion";

if(localStorage.getItem(settingsAnimations) === settingsAnimationsClass) {
	nav.classList.add(settingsAnimationsClass);
}

if(document.querySelector("[data-settings]") !== null) {
	let settings = document.querySelectorAll("[data-settings]");

	settings.forEach(function(setting) {
		if(localStorage.getItem(settingsAnimations) === "no-motion") {
			setting.innerText = "off";
		} else {
			setting.innerText = "on";
		}

		let thisOption = setting.getAttribute("data-settings").toLowerCase();
		let thisState = setting.innerText.toLowerCase();

		setting.addEventListener("click", function() {
			if(thisOption === "animations") {
				if(thisState === "on") {
					this.innerText = "off";
					localStorage.setItem(settingsAnimations, settingsAnimationsClass);
				} else {
					this.innerText = "on";
					localStorage.setItem(settingsAnimations, "");
				}
			}


		});
	});
}
