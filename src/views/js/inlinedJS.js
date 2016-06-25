//Inlined code (pizzeria.html)
/*
 * Updates the moving pizza's position. It selects all the moving pizza items. For loops
 * extract the item's properties, and after calculating its phase, it updates the
 * item's "left" property
 */
function updatePositions() {
	frame++;
	window.performance.mark("mark_start_frame");

	var items = document.querySelectorAll('.mover');

	/*Took this variable out of the loop because it is a constant value
	for all pizzas in each scroll*/
	var distanceFromTop = document.body.scrollTop / 1250;

	//Empty arrays to store phase
	var phaseArray = [];

	/* Determine phase for each pizza item.
	On the sixth iteration of this loop, the phase is going to be the same as the first phase
	because the modulo is a cycle defined when the DOM is first loaded and repeats itself on the sixth
	iteration and distanceFromTop will never change inside the loop, so we can iterate over it
	five times to get all possible results.*/
	for (var i = 0; i < 5; i++) {
		var phase = Math.sin(distanceFromTop + items[i].modulo);
		phaseArray.push(phase);
	}

	/* Retrieves each pizza item's phase and basicLeft properties
	and assigns a new value to the current item's left property
	phaseArray uses i%6 because in the previous for loop, we only iterate 6 times
	to get all possible values */
	for (i = 0; i < items.length; i++) {
		items[i].style.left = items[i].basicLeft + 100 * phaseArray[i % 5] + 'px';
	}

	// User Timing API to the rescue again. Seriously, it's worth learning.
	// Super easy to create custom metrics.
	window.performance.mark("mark_end_frame");
	window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
	if (frame % 10 === 0) {
		var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
		logAverageFrame(timesToUpdatePosition);
	}
}

/*
 * Gets the window width and height and creates an object to store them.
 * @returns {object} - Window's width and height
 */
function getWindowWidthAndHeight() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	var windowDimensions = {
		"width": width,
		"height": height
	};
	return windowDimensions;
}

/*
 * Generates the sliding pizzas when the page loads. First it gets the window's dimensions,
 * and declares several variables. Then it determines the number of moving pizzas to be rendered
 * according to the window height to optimize performance. Finally, creates the pizzas, setting its dimensions
 * according to the window width, and runs a function to update positions and render the first image of the background
 * pizzas.
 */
document.addEventListener('DOMContentLoaded', function() {

	//Get window's dimensions (width and height)
	var windowDimensions = getWindowWidthAndHeight();
	var windowHeight = windowDimensions.height;
	var windowWidth = windowDimensions.width;

	var cols = 8;
	var s = 256;
	var numPizzas;

	//Conditional to determine the number of moving pizzas to be created
	if (windowHeight <= 650) {
		numPizzas = 30;
	} else if (windowHeight > 650 && windowHeight < 1000) {
		numPizzas = 50;
	} else if (windowHeight > 2000) {
		numPizzas = 80;
	} else {
		numPizzas = 70;
	}

	//Reduced the number of pizzas and optimized it according to the screen's size
	for (var i = 0; i < numPizzas; i++) {
		var elem = document.createElement('img');
		elem.className = 'mover';
		elem.src = "images/pizza-min.png";

		//Determine the size of the moving pizzas according to the width of the viewport
		if (windowWidth < 500) {
			elem.style.height = "80px";
			elem.style.width = "63.333px";
		} else {
			elem.style.height = "140px";
			elem.style.width = "113.333px";
		}

		elem.basicLeft = (i % cols) * s;

		//Define a modulo property for the item
		elem.modulo = i % 5;

		elem.style.top = (Math.floor(i / cols) * s) + 'px';

		document.querySelector("#movingPizzas1").appendChild(elem);
	}

	updatePositions();
});
