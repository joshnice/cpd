// JavaScript Document

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    ////console.log("device ready");
	document.addEventListener('pause', on_Pause, false);
	document.addEventListener("menubutton", on_Pause, false);
	document.addEventListener("backbutton", on_Pause, false);
	document.addEventListener("searchbutton", on_Pause, false);
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	//alert('dready', device.platform)
	if (window.navigator.onLine) {
		$('body').addClass('online');
      
    } else {
        ////console.log('offline');
        $('body').addClass('offline');

    }
}


function onOffline() {
    // Handle the offline event
	$('body').removeClass('online');
	$('body').addClass('offline');
}
function onOnline() {
	$('body').addClass('online');
	$('body').removeClass('offline');
    // Handle the offline event
}

function on_Pause() {
	//navigator.notification.alert('pause');
  navigator.app.exitApp(); 

}

jQuery(document).on('pageshow','#dashboard', function() {
if(localStorage && localStorage.getItem('mypb_events')){
	jQuery('#scanned .scan_description').html('<h1>One Minute!</h1><p>We are just syncing your recently scanned events<br>(You may not have had an internet connection at the time)</p>');
	jQuery('#scanned').fadeIn('slow').delay(2000);
	jQuery.mobile.loading('show');
	
  			mypb_events_local=JSON.parse( localStorage.getItem( 'mypb_events' )  );
			console.log('is local data to upload ');
			update_user_scans_local(mypb_events_local);
			
	}
});

jQuery(document).on('touchstart', '#scan_btn', function(event) {
	
var audioElement  = document.createElement('audio');
var user_id = $(this).data("userid");
audioElement.setAttribute('src', 'assets/sound/beep.mp3');
// for testing scan visual 
/*
*************************************
var mes="\u003Ch1\u003ELegend!\u003C\/h1\u003E \u003Ch2\u003EYou have scanned in for Staniland Dodgeball (Boston)\u003Cbr\u003E on Tuesday 17th January 2017\u003C\/h2\u003E\u003Cp class=\u0022points\u0022\u003EYour Points \u003Cspan class=\u0022large_number\u0022 style=\u0022font-size: 3em;\r\n clear: both; display: block;\u0022\u003E150\u003C\/span\u003E\u003C\/p\u003E\u003Cp class=\u0022points\u0022\u003EYour Rank \u003Cspan class=\u0022large_number\u0022 style=\u0022font-size: 3em;\r\n clear: both;display: block;\u0022\u003E50\u003C\/span\u003E \u003C\/p\u003E\u003Cdiv class=\u0022award\u0022\u003E\u003Cimg src=\u0022http:\/\/mypb.uk\/wp-content\/uploads\/silverx2.png\u0022\/\u003E\u003Ch1\u003ESilver Level\u003C\/h1\u003E\u003Cp\u003E101-250 points\u003C\/p\u003E\u003C\/div\u003E";
jQuery('#scanned .scan_description').html(mes);
jQuery('#scanned').show();
jQuery('.overlay .close').click(function(){
jQuery('.overlay').hide();
});
return;
*************************************
			*/		
cordova.plugins.barcodeScanner.scan(
      function (result) {
          if(result.cancelled){
				//alert('cancelled');
			}else{
				
			
			audioElement.play();
			navigator.vibrate(1000);
			//alert('scanned'+result.text);
			var obj = JSON.parse(result.text);
			
			var event_id = obj.event_id;
			console.log('eventid',event_id, user_id);
			if(jQuery('body').hasClass('offline')){
				save_event_scan_local(event_id);
			}else{
			update_user_scans(user_id,event_id);
			}
				
			//
			
			}
      }, 
      function (error) {
          //alert("Scanning failed: " + error);
		  jQuery('#scanned .scan_description').html('<h1>Sorry</h1><p>Scanning failed: ' + error+'</p>');
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							jQuery.mobile.back();
							});
      }
   );
		});
		
//});
		
		function update_user_scans(user_id,event_id){
			console.log('update_user_scans',user_id);
			//return;
			alert(event_id);
			
			$.ajax({
						url: 'http://mypb.uk/ajax/scan_activity.php',
                        data: {user_id : user_id, event_id : event_id},
                        type: 'get',                  
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            jQuery.mobile.loading('show'); // This will show ajax spinner
                        },
                        complete: function(data) {
                            // This callback function will trigger on data sent/received complete
                            jQuery.mobile.loading('hide'); // This will hide ajax spinner
                        },
                        success: function (result) {
                            
							if(result.status) {
							console.log(result.awards);
							jQuery('#scanned .scan_description').html(result.awards);
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							});
							//alert('Congaratulations you have added 100 points to your global score');
						
								//jQuery(window).trigger('resize');               
                            } else {
                                //alert('unsuccessful! '+result.message);
								jQuery('#scanned .scan_description').html(result.message);
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							jQuery.mobile.back();
							});
								
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action               
                            //alert('Network error has occurred please try again!');
							jQuery('#scanned .scan_description').html('<h1>Sorry</h1><p>A Network error has occurred please try again!</p>'.$error);
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							jQuery.mobile.back();
							});
                        }
                    });
		}
		
		function update_user_scans_local(data){
			alert('update data'+data);
			
			//return;
			
			
			jQuery.ajax({
						url: 'http://mypb.uk/ajax/scan_activity_from_local.php',
                        data: data,
                        type: 'get',                  
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            jQuery.mobile.loading('show'); // This will show ajax spinner
                        },
                        complete: function(data) {
                            // This callback function will trigger on data sent/received complete
                            jQuery.mobile.loading('hide'); // This will hide ajax spinner
							jQuery('#scanned .scan_description').html('');
							jQuery('#scanned').hide();
                        },
                        success: function (result) {
                            
							if(result.status) {
							console.log(result.awards);
							jQuery('#scanned .scan_description').html(result.awards);
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								e.preventDefault();
							jQuery('.overlay').hide();
							});
							//alert('Congaratulations you have added 100 points to your global score');
						
								//jQuery(window).trigger('resize');               
                            } else {
                                //alert('unsuccessful! '+result.message);
								jQuery('#scanned .scan_description').html(result.message);
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							jQuery.mobile.back();
							});
								
                            }
							localStorage.removeItem("mypb_events");
						console.log('should be clear',localStorage.getItem("mypb_events"));
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action               
                            //alert('Network error has occurred please try again!');
							jQuery('#scanned .scan_description').html('<h1>Sorry</h1><p>A Network error has occurred please try again!</p>');
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							jQuery.mobile.back();
							});
                        }
                    });
		}
		
		function save_event_scan_local(event_id){
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var scan_info = { event_id: event_id, scan_date: date};
			var mypb_events_local=[];
			
			if(localStorage && localStorage.getItem('mypb_events')){
  			mypb_events_local=JSON.parse( localStorage.getItem( 'mypb_events' )  );
			console.log('is local ',mypb_events_local);
			}
			mypb_events_local.push({ user_id: user_id, event_id: event_id, scan_date: date});
			// Put the object into storage
			localStorage.setItem('mypb_events', JSON.stringify(mypb_events_local));
			alert(JSON.stringify(mypb_events_local));
			//alert('Network error has occurred please try again!');
							jQuery('#scanned .scan_description').html('<h1>Great</h1><p>A we have scanned your event and saved it to sync next time you are online!</p>');
							jQuery('#scanned').show();
							jQuery('.overlay .close').on('touchend',function(event) {
								event.preventDefault();
							jQuery('.overlay').hide();
							
							});
		
	}		
	
	