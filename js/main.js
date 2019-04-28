"use strict";

var audioElement;

// add device and doc ready

function onDeviceReady() {
	console.log("device ready");
	console.log(cordova.file);
	innit();
}

$(document).ready(function () {
	console.log("web browser ready");
	innit();
});


function innit() {
}
