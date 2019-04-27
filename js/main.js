"use strict";

var audioElement;

// add device and doc ready

function onDeviceReady() {
	console.log("device ready");
	innit();
}

$(document).ready(function () {
	console.log("web browser ready");
	innit();
});


function innit() {

	$( "#add-item-button" ).click(function() {
		additem_css();
	});
}


	function additem_css() {
		console.log("inside add item css function");
	}
