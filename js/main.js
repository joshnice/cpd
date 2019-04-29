"use strict";

let lat = 0;
let longi = 0; 
let marker_lat = [];
let marker_longi = [];
let marker_name = [];

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

	get_current_loc();

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

		document.getElementById("input-name-val").value = "";
		document.getElementById("input-amount-val").value = "";

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
			$("#item-data").append(`<div class="row" style="margin-top:15px;"><div class="col-3">${name}</div><div class="col-3">${amount}</div><div class="col-3">${cat}</div><div class="col-3">${type}</div></div>`);
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


	$("#bud").click(function() {
		console.log("budget navi clicked");
		setup_bud();

	});

	$("#submit-budget").click(function() {
		console.log("submit budget clicked");

		localStorage.setItem("budget-target", $("#input-target-val").val());
		localStorage.setItem("budget-starting", $("#input-starting-val").val());

		swal("Good job!", "Item Submitted", "success");

		setup_bud();
	});

	function setup_bud() {
		console.log(localStorage.getItem("budget-target"));
		console.log(localStorage.getItem("budget-starting"));
		
		document.getElementById("target-value").innerHTML = localStorage.getItem("budget-target");
		document.getElementById("starting-value").innerHTML = localStorage.getItem("budget-starting");

		let unstring_items = JSON.parse(localStorage.getItem("items"));
		console.log(unstring_items);

		let total = 0;
		let net = 0;

		if (unstring_items === null)
		{
			console.log("no items in items")
		}
		else
		{
			for (var index = 0; index < unstring_items.length; index++)
			{
				let amount = unstring_items[index].item_amount;
				let type = unstring_items[index].item_type;

				amount = parseFloat(amount);
				console.log("amount", amount);

				if (type == "Income")
				{
					total = parseFloat(total + amount);
				}
				else 
				{
					total = parseFloat(total - amount);
				}

				console.log("total", total);
			}

			console.log("total", total);

			document.getElementById("current-value").innerHTML = total;

			let starting = localStorage.getItem("budget-starting");

			starting = parseFloat(starting);

			net = parseFloat(starting + total);
			console.log(net);

			document.getElementById("net-value").innerHTML = net;
		}
	}

	$("#show-graph").click(function(){

		var ctx = document.getElementById('exvsin').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Expenses', 'Income'],
				datasets: [{
					label: 'Expenses vs Income',
					data: [expenses(), income()],
					backgroundColor: [
						'rgba(255, 99, 132, 0.8)',
						'rgba(54, 162, 255, 0.8)'
					],
					borderWidth: 1
				}]
			},
			options: {
				cutoutPercentage: 40
			}
		});

		document.getElementById("exvsin").style.visibility = "visible";

	});

	function expenses() {
		let unstring_items = JSON.parse(localStorage.getItem("items"));

		let total_exp = 0;

		for (var index = 0; index < unstring_items.length; index++)
		{
			let amount = parseFloat(unstring_items[index].item_amount);
			let type = unstring_items[index].item_type;

			if (type == "Expense")
			{
				total_exp += amount;
			}
		}
		
		return total_exp;
	}

	function income() {
		let unstring_items = JSON.parse(localStorage.getItem("items"));

		let total_inc = 0;
		
		for (var index = 0; index < unstring_items.length; index++)
		{
			let amount = parseFloat(unstring_items[index].item_amount);
			let type = unstring_items[index].item_type;

			if (type == "Income")
			{
				total_inc += amount;
			}
		}	
		
		return total_inc;
	}

	$("#change-graph").click(function() {
		console.log("change graph button clicked");

		var ctx = document.getElementById('exvsin').getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ["Bills", "Food", "Pets", "Going Out", "Clothes", "Subscriptions"],
				datasets: [{
					label: 'Expense Categories',
					data: [cat_sel(0), cat_sel(1), cat_sel(2), cat_sel(3), cat_sel(4), cat_sel(5), cat_sel(6)],
					backgroundColor: [
						'rgba(255, 99, 132, 0.8)',
						'rgba(54, 162, 255, 0.8)',
						'rgba(54, 255, 132, 0.8)',
						'rgba(255, 162, 255, 0.8)',
						'rgba(255, 255, 132, 0.8)',
						'rgba(0, 255, 255, 0.8)'
					],
					borderWidth: 1
				}]
			},
			options: {
				cutoutPercentage: 40
			}
		});
	});

	function cat_sel(val) {
		let cat_arr = [
			"Bills",
			"Food",
			"Pets",
			"Going Out",
			"Clothes",
			"Subscriptions"
		]
		let unstring_items = JSON.parse(localStorage.getItem("items"));

		let total_amount = 0;
		
		for (var index = 0; index < unstring_items.length; index++)
		{
			let amount = parseFloat(unstring_items[index].item_amount);
			let cat = unstring_items[index].item_cat;

			if (cat == cat_arr[val])
			{
				total_amount += amount;
			}
		}	
		
		return total_amount;
	}

	$("#add-geolocation").click(function() {
		console.log("geo location clicked");

		get_current_loc();
		
		marker_lat.push(lat);
		marker_longi.push(longi);
		marker_name.push($("#input-name-val").val());

	});

	$("#map-button").click(function(){
		console.log("map button clicked");

		get_current_loc();

		var mymap = L.map('mapid').setView([lat,longi], 13);

		for (var index = 0; index < marker_lat.length; index++)
		{
			var marker = L.marker([marker_lat[index], marker_longi[index]]).addTo(mymap);
			marker.bindPopup(marker_name[index]);
		}
	
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18, id: 'mapbox.streets', accessToken: 'pk.eyJ1Ijoiam9zaG5pY2UiLCJhIjoiY2pwcjJvZGZ6MHk3bzQ4bzFrc2R3N283aSJ9.FPWF6miX465yiopxAPnhIw'}).addTo(mymap);
	});

	function get_current_loc() {
		var onSuccess = function(position) {

				  lat =  parseFloat(position.coords.latitude);
				  longi = parseFloat(position.coords.longitude);
		};
	
		function onError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
}