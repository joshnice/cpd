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

	$( "#submit-item" ).click(function() {
		console.log("submit item has been pressed");

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

	    console.log('file system open: ' + fs.name);
	    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

	        console.log("fileEntry is file?" + fileEntry.isFile.toString());
	        fileEntry.name == 'items.txt'
	         fileEntry.fullPath == '/items.txt'
	        writeFile(fileEntry, null);

	    }, onErrorCreateFile);

			}, onErrorLoadFs);
	});



}
