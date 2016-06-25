###My Udacity Project: Website Performance Optimization
---
####Description:
The project is focused on performance, both website performance optimization and browser performance optimization. The goal is to reach a score above 90 in pageSpeed insights and 60 FPS on scrolling.

####Optimizations:

###### To Index.html, project-2048.html, project-mobile.html, project-webperf.html:        
1-  Optimized Google Fonts load time by making an asynchronous request through a Javascript code snippet from Google Fonts  
2- Inlined the styles contained in style.css to avoid fetching a CSS stylesheet and optimize load time  
3- Inlined the styles contained in style.css to "print" format and added a "print" media query  
4- Added ```async``` and ```defer``` tags to the three script contained in ```<head>``` to avoid blocking page load. Added both tags to provide a fallback option for older browsers that don't support ```async```   
5- Changed link to images to their minified versions   
6 - Changed link to html files to their minified versions

######To pizza.html:  
1- Inlined CSS classes contained in style.css  
2- Inlined Bootstrap's classes used in above-the-fold content  
3- Changed links to images to their minified versions  
4- At the bottom of ```<body>```, I inlined a minified version of a script that has to be executed to render the first image on the screen, because it creates the background pizzas that populate the window.  (Readable code can be found at inlinedJS.js file)  
5- At the bottom of ```<body>``` I placed a link to a minifed version of ```main.js```   
6- Below the ```</html>``` tag, I placed a link to ```bootstrap-grid.css```, to optimize css delivery and avoid blocking rending, as suggested in [Google developer's Optimizing CSS delivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example)

###### To main.js :  
 1- I separated the code in main.js into two parts: one that was critical to render the first image on the screen by populating it with background pizzas (inlinedJS.js) and another one necessary to create pizza containers and resize pizzas.   
2- At the very bottom of the file, I used a code snippet taken from Mozilla Developer Network (attributed in this README in the "License" section), because, quote "since scroll events can fire at a high rate, the event handler shouldn't execute computationally expensive operations such as DOM modifications. Instead, it is recommended to throttle the event using requestAnimationFrame" [Mozilla developer Network](https://developer.mozilla.org/es/docs/Web/Events/scroll#Scroll_optimization_with_window.requestAnimationFrame),
```
//CODE SNIPPET TAKEN FROM MOZILLA DEVELOPER NETWORK
// Runs updatePositions on scroll but after each frame has been completed
var last_known_scroll_position = 0;
var ticking = false;

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updatePositions();
            ticking = false;
        });
    }
    ticking = true;
});
```
3- On the for loop that actually creates and appends all pizzas when the page loads, I took ```var pizzasDiv = document.getElementById("randomPizzas");``` out of the loop, since it only has to be declared once.
 
4- On ```function changePizzaSizes(size)```:   
       -  I took ```offsetWidth```, ```dx``` and ```newwidth``` out of the for loop because  they must be the same for all pizzas  
5- On ```function determineDx(elem, size)```:
      - I invoke ```getWindowWidthAndHeight()``` to get the window's dimensions and define a ```mobileWidth``` variable   
6- On ```function determineDx(elem, size)```:   
      - I added conditionals to determine the percentage of the width according to the viewport's width
 
###### To inlinedJS.js (Part of the main.js code I separated into a file):  
1-  Added a function  ```getWindowWidthAndHeight()``` to get the window's dimensions and determine the number of pizzas to be created  
2- On ```document.addEventListener('DOMContentLoaded', function(){}``` , I added:    
   - A conditional to determine the number of pizzas to be render according to the window's dimensions  
   - Inside the for loop, I added a conditional to determine the size of the background pizzas according to the window's dimensions.  
   - Added a modulo property for each pizza to avoid creating a modulo each time the function ```updatePositions()``` gets called, since its a fixed value  
  - In ```updatePositions()``` :  
      * I took ```distanceFromTop``` outside the for loop because its a fixed value for during a specific scroll event  
      * To determine the ```phase``` I created an empty phase array to store the values, which is populated when the for loop below is executed. I noticed a pattern in these numbers, On the sixth iteration of this loop, the phase is going to be the same as the first phase because the modulo is a cycle defined when the DOM is first loaded and repeats itself on the sixth iteration and distanceFromTop will never change inside the loop, so we can iterate over it five times to get all possible results.  
     * Then, I changed 
```for (i = 0; i < items.length; i++) {
		items[i].style.left = items[i].basicLeft + 100 * phaseArray[i % 5] + 'px';
	}``` . Used ```phaseArray[i%5]``` and took the item's basicLeft property
 
######Responsive features in pizza.html
- Added some responsive features to make the site more user-friendly on mobile devices. Set the moving pizza's size according to the viewport and also set the pizza container's width according to the viewport when the user resizes pizzas.

######Tools used to minify files optimize images, and check code syntax:     
   - [https://cssminifier.com/](https://cssminifier.com/)
   - [http://jscompress.com/](http://jscompress.com/)
  - [http://minifycode.com/html-minifier/](http://minifycode.com/html-minifier/)
  - [http://jshint.com/](http://jshint.com/)  
  - [http://jsbeautifier.org/](http://jsbeautifier.org/)

###License
---
-Used [this](https://developer.mozilla.org/es/docs/Web/Events/scroll#Scroll_optimization_with_window.requestAnimationFrame) code snippet from Mozilla Developer Network:
```
var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  // do something with the scroll position
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});
```
- Udacity forums and courses
- [https://developers.google.com/](https://developers.google.com/)
