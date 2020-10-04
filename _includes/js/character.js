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
			"level": 6,
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

		for (let i = 0; i < response.level; i++) {
			// Some levels have multiple spells so loop through each

			if(currentSpellList[i] !== undefined) {
				currentSpellList[i].forEach(function(spell) {
					let hidden = i === temporaryCounter ? "invisible" : "";

					spellsheetHTML += `
						<div class="d-flex mb-3">
							<div class="col-auto text-center ${hidden}">
								<div class="small">Level</div>
								<div class="h4">${i + 1}</div>
							</div>

							<div class="col">
								<p class="mb-0">${spell.name}</p>
								<p class="mb-0 small">${spell.description}</p>
							</div>
						</div>
					`;

					temporaryCounter = i;
				});
			}

		}

		spellsheetContainer.innerHTML = spellsheetHTML;
	}
}

loadCharacterInfo();
