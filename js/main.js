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

		swal("Good job!", "Item Submitted", "success");


	});

	$("#trans").click(function() {
		console.log("transaction button clicked");

		$("#item-data").empty();

		let unstring_items = JSON.parse(localStorage.getItem("items"));
		console.log(unstring_items);

		for (var index = 0; index < unstring_items.length; index++)
		{
			let name = unstring_items[index].item_name;
			let amount = unstring_items[index].item_amount;
			let cat = unstring_items[index].item_cat;
			let type = unstring_items[index].item_type;
			$("#item-data").append(`<div class="row"><div class="col-3">${name}</div><div class="col-3">${amount}</div><div class="col-3">${cat}</div><div class="col-3">${type}</div></div>`);
		}
	});

	$("#clear-stor").click(function() {
		swal({
			title: "Are you sure you want to clear the storage?",
			text: "",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
			  swal("Items deleted!", {
				icon: "success",
			  });
			  localStorage.clear();
			} else {
			  swal("Items are safe!");
			}
		  });
		
	});

}
