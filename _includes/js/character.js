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
			"weapon": {
				"name": "Sharpened Sword",
				"description": "This weapon was crafted by a skilled blacksmith.",
				"image": "placeholder",
				"damageDice": "1d8",
				"damageBonus": 2,
				"physicalArmor": 0,
				"magicArmor": 0,
				"price": 50
			},
			"armor": {
				"name": "Light Armor",
				"description": "This armor provides slight protection against physical attacks.",
				"image": "placeholder",
				"damageDice": "",
				"damageBonus": 2,
				"physicalArmor": 0,
				"magicArmor": 0,
				"price": 20
			},
			"accessory": {
				"name": "Infinity Ring of Power",
				"description": "Allows you to add +50 to your strength, dexterity, and constitution. Can only be used once per day.",
				"image": "placeholder",
				"damageDice": "",
				"damageBonus": 0,
				"physicalArmor": 0,
				"magicArmor": 0,
				"price": 5000
			}
		};

		console.log(response);

		document.querySelectorAll("[data-load]").forEach(function(el) {
			let dataLoad = el.getAttribute("data-load");
			el.innerText = response[dataLoad];
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







		// Equipment
		let equipment = document.querySelectorAll("[data-equipment]");

		// Backendless
		// let queryBuilder = Backendless.DataQueryBuilder.create();
		// queryBuilder.addProperties('name');
		// queryBuilder.addProperties('type.name as type');
		// queryBuilder.addProperties('damageDice.name as damageDice');
		/*Backendless.Data.of("d20_equipment").find(queryBuilder)
			.then( function(response) {
				console.log(response);
			})
			.catch( function(error) {
				console.log(error);
			});*/

		equipment.forEach(function(item) {
			let type = item.getAttribute("data-equipment");

			item.innerHTML = `
				<img src="/images/equipment/equipment-${type}-${response[type]["image"]}.png"
				 	 alt="${response[type]["name"]}"
				 	 title="${response[type]["name"]}"
				 	 class="">
			`;

			item.addEventListener("click", function() {
				let equipmentDetails = document.getElementById("equipment-details");
				equipmentDetails.style.display = "block";

				let equipmentDetailsList = equipmentDetails.querySelectorAll("[data-equipment-details]");

				equipmentDetailsList.forEach(function(line) {
					let lineType = line.getAttribute("data-equipment-details");
					line.style.display = "block";

					if(typeof response[type][lineType] === "string") {
						if(response[type][lineType].length > 0) {
							line.querySelector("span").innerText = response[type][lineType];
						} else {
							line.style.display = "none";
						}
					}

					if(typeof response[type][lineType] === "number") {
						line.querySelector("span").innerText = response[type][lineType];
					}

				});
			});
		});

	}
}

loadCharacterInfo();
