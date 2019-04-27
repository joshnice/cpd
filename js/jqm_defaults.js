// JavaScript Document
jQuery(document).bind("mobileinit", function(){
 
console.log('mobiel init');
jQuery.mobile.changePage.defaults.changeHash = true;
        jQuery.mobile.hashListeningEnabled = true;
        jQuery.mobile.pushStateEnabled = false;
		jQuery.support.cors = true;
   		jQuery.mobile.allowCrossDomainPages = true;
		jQuery.mobile.changePage.defaults.allowSamePageTransition = true;
		jQuery.mobile.phonegapNavigationEnabled = true;
		jQuery.mobile.defaultPageTransition='none';
		FastClick.attach(document.body);
		
});