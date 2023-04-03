import {Runtime, Inspector, Library} from "./gradient/runtime.js";
import notebook from "./gradient/gradient.3.2.js";

const renders = {
	"gradient": "#gradient",
};

const runtime = new Runtime(Object.assign(new Library)).module(notebook, name => {
	const selector = renders[name];
	if (selector) { // key exists
		return new Inspector(document.querySelector(selector));
	} else {
		return true;
	}
});

var scrollTop = 0;
var gradientHeight;
var windowWidth;
var gradientOverlay = document.getElementById('gradient-overlay');
var initParallax = function () {
	if (!gradientOverlay) return;
	setInitialValues();
	updateStyle();
	window.addEventListener('scroll', throttleScroll, false);
	window.addEventListener('resize', throttleResize, false);
};
var setInitialValues = function () {
	gradientHeight = gradientOverlay.offsetHeight;
};
var updateScrollValues = function () {
	scrollTop = window.pageYOffset;
	updateStyle();
};
var updateStyle = function () {
	gradientOverlay.style.opacity = Math.min((scrollTop/gradientHeight*0.5), 0.5);
};
var eventTimeout;
var throttleResize = function () { // throttle to 15fps
	if (!eventTimeout) {
		eventTimeout = setTimeout(function () {
			eventTimeout = null;
			handleResize();
		}, 66);
	}
};
var throttleScroll = function () { // throttle to 15fps
	if (!eventTimeout) {
		eventTimeout = setTimeout(function () {
			eventTimeout = null;
			handleScroll();
		}, 16);
	}
};
var handleResize = function () {
	setInitialValues();
	updateScrollValues();
};
var handleScroll = function () {
	updateScrollValues();
};

// init
document.addEventListener('DOMContentLoaded', function () {
	initParallax();
});
