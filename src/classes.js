class Button {  
	static enabled(id, visible) {
		let status = document.getElementById(id); //Reinitialization required for some reason.
		status.disabled = !visible;
		
		if (status.disabled) {
			status.setAttribute("disabled", visible);
		}
		
		else {
			status.removeAttribute("disabled");
		}
	}
}

class Uncertainty {
	listeners = [];
	constructor(from, to, id, id_number) {
		this.from = from;
		this.to = to;
		this.id = id;
		this.id_number = id_number;
	}

	update() {
		for (const listener of this.listeners) {
			listener();
		}
	}

	subscribe(set_listener) {
		this.listeners.push(set_listener);
		this.update();
	}
	
	measure() {
		this.update();
		this.from = Math.round(Math.random(this.to - this.from)) + this.from;
		this.to = Math.round(Math.random(this.to)) + this.to;
	}

	randomMeasure() {
		this.update();
		this.from -= Math.random() * 10;
		this.to += Math.random() * 10;
	}
	
	increase(speed) {
		this.from += speed.from;
		this.to += speed.to;
	}
}

const currencySymbol = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'EUR'
}).formatToParts(0)
  .find(part => part.type === 'currency').value;
  
let num_lap = 1;
  
function Horse(id, x, y) {
	this.status = document.getElementById(id);
	this.speed = Math.random() * 10 + 10;

	this.originX = x;
	this.originY = y;
	this.x = x;
	this.y = y;
	this.number = parseInt(id.replace("horse", "")) /*Horse number*/
	this.lap = 0;
	
	this.stopID = null;
	let speed_label = document.getElementById(id + "Speed");
	let speed = new Uncertainty(10, 20);
	
	speed.subscribe(() => {
		speed_label.innerText = "Speed for " + id + " is: " + speed.from + " to " + speed.to;
	});

	this.moveRight = function() {
		let horse = this;

		this.stopID = setTimeout(function() {
			horse.x++;
			horse.status.style.left = horse.x + 'vw';

			if (horse.lap == num_lap && horse.x > horse.originX + 6) {
				horse.arrive(id);
			}
			
			else {
				if (horse.x < 82.5 - horse.number * 2.5) {
					horse.moveRight();
				}
				
				else {
					horse.status.className = 'horse runDown';
					horse.speed = Math.random() * 10 + 10;
					horse.moveDown();
				}
			}
		}, 1000 / this.speed);
	}

	this.moveDown = function() {
		let horse = this;

		this.stopID = setTimeout(function() {
			horse.y++;
			horse.status.style.top = horse.y + 'vh';

			if (horse.y < horse.originY + 65) {
				horse.moveDown();
			}
			
			else {
				horse.status.className = 'horse runLeft';
				horse.speed = Math.random() * 10 + 10;
				horse.moveLeft();
			}
		}, 1000 / this.speed)
	}
	
	this.moveLeft = function() {
		let horse = this;

		this.stopID = setTimeout(function() {
			horse.x--;
			horse.status.style.left = horse.x + 'vw';

			if (horse.x > 12.5 - horse.number * 2.5) {
				horse.moveLeft();
			}
			
			else {
				horse.status.className = 'horse runUp';
				horse.speed = Math.random() * 10 + 10;
				horse.moveUp();
			}
		}, 1000 / this.speed)
	}

	this.moveUp = function() {
		let horse = this;

		this.stopID = setTimeout(function() {
			horse.y--;
			horse.status.style.top = horse.y + 'vh';

			if (horse.y > horse.originY) {
				horse.speed = Math.random() * 10 + 10;
				horse.moveUp();
			}
			
			else {
				horse.status.className = 'horse runRight';
				horse.lap++;
				horse.moveRight();
			}
		}, 1000 / this.speed)
	}

	this.run = function() {
		this.status.className = 'horse runRight';
		this.moveRight();
	}

	this.stop = function() {
		clearTimeout(this.stopID);
	}

	this.arrive = function(numbering) {
		this.status.className = 'horse standRight';
		this.lap = 0;
		console.log(numbering);
		let res = 'result ' + numbering;

		numbering = parseInt(numbering.replace("horse", ""));//Get the horse number
		/*Show the result*/
		console.log(document.querySelectorAll('#results .result')[results.length]);//results.length is the current arrive position
		console.log([results.length]);
		document.querySelectorAll('#results .result')[results.length].className.replace('result ', res); //The class of result look like: result horse1...
		//Push the horse number to results array, according the the results array, we know the order of race results
		results.push(numbering);

		if (results.length == 1) {
			if (this.number == bethorse) {
				funds += amount;
			}
			
			else {
				funds -= amount;
			}

			document.getElementById('funds').innerText = currencySymbol + funds;
		}
		
		else if (results.length == 4) {
			Button.enabled('start', true);
			Button.enabled('pos', false);
			Button.enabled('measure', false);
		}
	}
}

const horse1 = new Horse('horse1', 20, 4);
const horse2 = new Horse('horse2', 20, 8);
const horse3 = new Horse('horse3', 20, 12);
const horse4 = new Horse('horse4', 20, 16);

const horses = [horse1, horse2, horse3, horse4];
let results = [], funds = 500, bethorse, amount, random;

function setInvisibility(visibility) {
	let status = document.getElementById("measure"); //Variable have to be called status or else it throws error.

	for (const horse of Array.from(horses)) {
		if (visibility) {
			horse.status.style.display = "none"; //none
		}

		else {
			horse.status.style.display = "inline";
		}
	}
}
