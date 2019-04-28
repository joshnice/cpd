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

	$("#submit-item").click(function() {
		console.log("add item button clicked");

		let item = {
			item_type : $("#item-type").val(),
			item_name : $("#input-name-val").val(),
			item_amount : $("#input-amount-val").val(),
			item_cat : $("#item-cat").val()
		}

		let unstring_items = JSON.parse(localStorage.getItem("items"));

		if (unstring_items === null)
		{
			let arr_item = [];
			arr_item.push(item);
			localStorage.setItem("items",JSON.stringify(arr_item));
		}
		else 
		{
			unstring_items.push(item);
			localStorage.setItem("items",JSON.stringify(unstring_items));
		}

	});

	$("#trans").click(function() {
		console.log("transaction button clicked");

		let unstring_items = JSON.parse(localStorage.getItem("items"));
		console.log(unstring_items);

		for (var index = 0; index < unstring_items.length; index++)
		{
			//console.log(unstring_items[index].item_name);
			document.getElementById("item-name-dis").innerHTML = unstring_items[index].item_name;
		}

		//document.getElementById("item-name-dis").innerHTML = item_name;

	});

}
