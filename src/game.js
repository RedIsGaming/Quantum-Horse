/*
Opdracht: JavaScript Game
Filename: game.html
@author: Pjotr Wisse (84669)
Date: 25/11/2020
*/

document.addEventListener("DOMContentLoaded", function() {
	Button.enabled("start", true);
	Button.enabled("pos", false);
	Button.enabled("measure", false);
	
    if (document.cookie !== "") {
		document.getElementById('email').value = document.cookie.split('=')[1];
		document.getElementById('password').value = document.cookie.split('=')[2];
	}

	document.getElementById('funds').innerText = currencySymbol + funds;

	document.getElementById('start').onclick = function() {
		Button.enabled("start", false);
		//Button.enabled("pos", true);
		Button.enabled("measure", true);

        //random = execute(document.getElementById("email").value, document.getElementById("password").value,'version 1.0\nqubits 2\nprep_z q[0]\nprep_z q[1]\nH q[0]\nCNOT q[0],q[1]\nmeasure q[0]\nmeasure q[1]', 10);
		amount = parseInt(document.getElementById('amount').value);
		num_lap = parseInt(document.getElementById('num_lap').value);
		bethorse = parseInt(document.getElementById('bethorse').value);

		if (funds < amount) {
			alert('Not enough funds.');
		}

		else if (num_lap <= 0) {
			alert('Number of lap must be greater than 1.');
		}
		
		else {
			this.disabled = true;

			document.getElementById("pos").onclick = function() {
				Button.enabled("pos", false);
				Button.enabled("measure", true);
				setInvisibility(false);

				for (const horse of horses) {
					horse.run();
				}
			}

			document.getElementById("measure").onclick = function() {
				Button.enabled("pos", true);
				Button.enabled("measure", false);
				setInvisibility(true);

				for (const horse of horses) {
					horse.stop();
				}
				
				this.disabled = true;
			}

			const tds = document.querySelectorAll('#results .result');

			for (let i = 0; i < tds.length; i++) {
				tds[i].className = 'result'; //Reset the result.
			}

			document.getElementById('funds').innerText = currencySymbol + funds;
			results = []; //Results array is to save the horse numbers when the race is finished.

			for (const horse of horses) {
				horse.run();
			}
		}
	};

	document.getElementById("pos").onclick = function() {
		setInvisibility(true);
	};

	document.getElementById("measure").onclick = function() {
		setInvisibility(false);
	};
});
