if(document.getElementById("character-create") !== null) {
	let form = document.getElementById("character-create");

	form.addEventListener("submit", function(e) {
		e.preventDefault();

		// Backendless Login
		let randomNum = Math.round(Math.random() * 100000);
		window.location = "/starting-zone/character/view/#" + randomNum;
	});
}


function loadCharacterInfo() {
	if(location.pathname === "/starting-zone/character/view/") {
		// Backendless get character
		let response = {
			"name": "Axin🤙",
			"level": 1,
			"class": "barbarian",
			"speed": 5,
			"currentHP": 20,
			"maxHP": 50,
			"physicalArmor": 0,
			"magicArmor": 0,
			"str": 2,
			"dex": 3,
			"con": 1,
			"int": 5,
			"wis": 7,
			"cha": 3,
		};

		document.querySelectorAll("[data-load]").forEach(function(el) {
			let dataLoad = el.getAttribute("data-load");
			if(!el.hasAttribute("data-static")) {
				el.innerText = response[dataLoad];
			}
		});


		// Health slider
		let healthSlider = document.getElementById("healthSlider");
		let healthSliderOutput = document.getElementById("healthSliderOutput");
		healthSlider.max = response.maxHP;
		healthSlider.value = response.currentHP;
		healthSliderOutput.innerHTML = healthSlider.value;

		healthSlider.addEventListener("input", function() {
			healthSliderOutput.innerHTML = healthSlider.value;
		});


		document.querySelectorAll("#health-increase,#health-reduce").forEach(function(el) {
			el.addEventListener("click", function() {
				let type = el.id;
				let healthInput = document.getElementById("health-input");
				let healthChangeAmount = parseInt(healthInput.value);
				let currentHealth = parseInt(healthSlider.value);
				let newHealth;

				if(type === "health-increase") {
					newHealth = currentHealth + healthChangeAmount;
				} else {
					newHealth = currentHealth - healthChangeAmount;
				}

				healthSlider.value = newHealth;

				let event = document.createEvent('Event');
				event.initEvent('input', true, true);
				healthSlider.dispatchEvent(event);
			})
		});



		// Static spell list
		let spellsheetContainer = document.getElementById("spellsheet");
		let currentSpellList = spellsheet[response.class]["levels"];
		let spellsheetHTML = "";
		let temporaryCounter = 99999;

		currentSpellList.forEach(function(spellGroup, i) {

			let spellsheetEachHTML = "";
			spellGroup.forEach(function(spell) {
				spellsheetEachHTML += `
					<p class="mb-0">${spell.name}</p>
					<p class="mb-3 small">${spell.description}</p>
				`;
			});

			let spellOpacity = i >= response.level ? "opacity-50" : "";
			let spellAvailable = i >= response.level ? "data-spell='unavailable'" : "";
			let spellDisplay = i >= response.level ? "display:none;" : "";

			spellsheetHTML += `
				<div class="row mb-3 ${spellOpacity}" ${spellAvailable} style="${spellDisplay}">
					<div class="col-auto text-center">
						<div class="small">Level</div>
						<div class="h4">${i + 1}</div>
					</div>

					<div class="col">${spellsheetEachHTML}</div>
				</div>
			`;
		});

		spellsheetContainer.innerHTML = spellsheetHTML;

		document.getElementById("spellsheet-toggle").addEventListener("click", function() {
			let upcomingSpells = spellsheetContainer.querySelectorAll("[data-spell='unavailable']");
			upcomingSpells.forEach(function(el) {
				if(el.style.display === "none") {
					el.style.display = "";
				} else {
					el.style.display = "none";
				}
			});
		});
	}
}

loadCharacterInfo();
