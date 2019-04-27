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

		document.addEventListener("online", onOnline, false);
		document.addEventListener("offlinw", onOffline, false);

		if (window.navigator.onLine) {
			$('body').addClass('online');
			console.log("online");
		}
		else {
			$('body').addClass('offline');
			console.log("offline");
		}
	}

function onOffline() {
	$('body').removeClass('online');
	$('body').addClass('offline');
}

function onOnline() {
	$('body').addClass('online');
	$('body').removeClass('offline');
}

// handle online and offline intermittent connectivity






$(document).on("pagebeforeshow", function () {
	// When entering pagetwo
	//alert("page is about to be shown");

});

$(document).on("pagecontainershow", function () {
	// When entering pagetwo

});

$(document).on("pagecontainerload", function (event, data) {
	//alert("pageload event fired!");
});

$(document).on('pagecreate', '#menu', function () {
	console.log("pagecreate menu");

});






	function create_pie_chart() {
		console.log("donut");

		// adds the chart to a container div in our html with an ID donut
		// you can look up high charts docs but you do not need to understand below
		$('#donut').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'My Events'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			legend: {
				padding: 3,
				itemMarginTop: 5,
				itemMarginBottom: 5,
				itemStyle: {
					lineHeight: '14px',
					color: 'white',
					fontSize: '10px'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Events',
				colorByPoint: true,
				data: [{
					name: 'Football',
					y: 56.33
				}, {
					name: 'Judo',
					y: 24.03,
					sliced: true,
					selected: true
				}, {
					name: 'Dodge Ball',
					y: 10.38
				}, {
					name: 'Swimming',
					y: 4.77
				}, {
					name: 'Cricket',
					y: 0.91
				}],
				size: '90%',
				innerSize: '50%'
			}]
		});
	} //piechart

	function create_line_chart() {
		console.log("add line");
		// adds the chart to a container div in our html with an ID line
		// you can look up high charts docs but you do not need to understand below
		$('#line').highcharts({
			title: {
				text: 'Monthly Activity Visits',
				x: 0 //center
			},
			xAxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
				]
			},
			yAxis: {
				title: {
					text: 'Visits)'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			series: [{
				name: 'Football',
				data: [1, 2, 3, 4, 4, 4, 4, 4, 2, 2, 1, 1]
			}, {
				name: 'Judo',
				data: [2, 3, 4, 4, 4, 4, 4, 2, 2, 1, 1, 1]
			}, {
				name: 'Dodge Ball',
				data: [4, 4, 4, 4, 4, 2, 2, 1, 1, 2, 2, 2]
			}, {
				name: 'Swimming',
				data: [4, 4, 4, 2, 2, 1, 1, 3, 3, 3, 2, 1]
			}]
		});

	} //linechart
