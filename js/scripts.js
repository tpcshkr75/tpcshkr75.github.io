$(document).ready(function() {
	
// Define elements as Select Menus using jQuery UI
	
	$(function() {
		$('select').selectmenu();
	});

// When the Select Platform option is changed, hide any shown divs for other platforms and show the div with the select menu for the appropriate div
	
// down = show, up = hide	
	
	$('#selectPlatform').on('selectmenuchange', function() {
		if ($(this).val() === 'Select') {
			$('.formatDiv').slideUp();
			$('#rightHeader').slideDown();
			$('.adSpecsDiv').slideUp();
		} else {
			$('.formatDiv').slideUp();
			$('#selectFormat' + $('#selectPlatform').val() + 'Div').slideDown();
		}
	});

//	$('.formatDiv').on('selectmenuchange', function() {
//		if ($(this).val() === 'Select') {
//			$('#rightHeader').slideDown();
//			$('#selectFormat' + $('#selectPlatform').val() + 'Div').slideDown();
//		}	
//	});
		
		// If someone selects a platform, then show the appropriate ad format select menu and hide all others that may have been showing
//		if ($('#selectPlatform').val() !== 'Select') {
//			$('.formatDiv').slideUp();
////			$('#rightHeader').slideUp();
//    		$('#selectFormat' + $('#selectPlatform').val() + 'Div').slideDown();
//		}
//		// If someone selects an ad format, hide the right header
//		if ($('.formatDiv').val() !== 'Select' && ) {
//			$('#rightHeader').slideUp();
//			$('.adSpecsDiv').slideUp();
////			$('.adFormatSelect').slideUp();	
//		// If 	
//		}
//		// If someone changes the platform back to select, then show the right header and hide the ad format select menu
//		if ($('#selectPlatform').val() === 'Select') {
//			$('#rightHeader').slideDown();
//			$('.adSpecsDiv').slideUp();
//			$('.formatDiv').slideUp();
//		}
//	});	
	
	
	
//	$('.adFormatSelect').on('selectmenuchange', function() {
//		$('.adSpecsDiv').slideUp();
//		$('#rightHeader').slideUp();
//    	$('#adSpecs' + $('#selectPlatform').val() + $(this).val() + 'Div').slideDown();
//	});
	
	
	
	
	var config = {
    apiKey: "AIzaSyDm29tjx9hu2YSfdB94C1Ni5jsVoSZjBLM",
    authDomain: "general-assembly-1542421388050.firebaseapp.com",
    databaseURL: "https://general-assembly-1542421388050.firebaseio.com",
    projectId: "general-assembly-1542421388050",
    storageBucket: "general-assembly-1542421388050.appspot.com",
    messagingSenderId: "357935310116"
  };
  firebase.initializeApp(config);

  /*firebase.database().ref('list').set({
    username: 'name',
    email: 'email',
    profile_picture : 'imageUrl',
  });*/
	
//	var ref = firebase.database().ref("platform");
//	ref.once("value")
//  		.then(function(snapshot) {
//			var copyLimit = snapshot.child("facebook/format/carousel/copyLimit").val();
//  		});
	
	$('.adFormatSelect').on('selectmenuchange', function() {
		var ref = firebase.database().ref("platform");
		ref.once("value")
  			.then(function(snapshot) {
				
		// Prep Work
			
			if ($('.adFormatSelect').val() === "Select" && $('#selectPlatform').val() === "Select") {
				$('#adSpecsArea').hide();
				$('#rightHeader').slideDown();
			}
			
			// Look at what Platform is selected and make it lowercase so that it can be used in path for Firebase call	
				var platform = $('#selectPlatform').val().toLowerCase();
				console.log(platform);
			// Look at what Ad Format is selected and make it lowercase so that it can be used in path for Firebase call
				var platformWithCapital = $('#selectPlatform').val();
				console.log(platformWithCapital);		
			
				var formatShortcut = $('#adFormat' + platformWithCapital).val().toLowerCase();
			    console.log(formatShortcut);
			
//				var formatShortcut = $('.adFormatSelect').val().toLowerCase();
//			    console.log(formatShortcut);
			
		
		// Filling in paragraph divs with relevant info
			
			
			// COPYLIMIT
			
			// Assmble path for Firebase call for copyLimit 
				var copyLimitArgument = platform + "/format/" + formatShortcut + "/copyLimit";
			    console.log(copyLimitArgument);
			// Make Firebase call by passing in path from previous step and converting it to a string. Firebase will then return the value for that Ad Format's copy limit
				var copyLimit = snapshot.child(copyLimitArgument.toString()).val();
			    console.log(copyLimit);
			// Display the information from the call into the paragraph div for copy limit
//				$('#rightHeader').hide();
    			$('#copyLimitPara').html("Ad Copy Limit: " + copyLimit).slideDown();
		
			
			
			
			// SIZE
			
			// Assmble path for Firebase call for size
				var sizeArgument = platform + "/format/" + formatShortcut + "/size";
			
			// Make Firebase call by passing in path from previous step and converting it to a string. Firebase will then return the value for that Ad Format's size
				var size = snapshot.child(sizeArgument.toString()).val();
			
			// Display the information from the call into the paragraph div for copy limit
//				$('#rightHeader').hide();
    			$('#sizePara').html("Dimensions: " + size).slideDown();
		
			
			
			// RESTRICTIONS
			
			// Assmble path for Firebase call for restrictions
				var restrictionsArgument = platform + "/format/" + formatShortcut + "/restrictions";
			
			// Make Firebase call by passing in path from previous step and converting it to a string. Firebase will then return the value for that Ad Format's restrictions
				var restrictions = snapshot.child(restrictionsArgument.toString()).val();
			
			// Display the information from the call into the paragraph div for copy limit
//				$('#rightHeader').hide();
    			$('#restrictionsPara').html("Restrictions: " + restrictions).slideDown();
			
			
			
			// NOTES
			
			// Assmble path for Firebase call for notes
				var notesArgument = platform + "/format/" + formatShortcut + "/notes";
			
			// Make Firebase call by passing in path from previous step and converting it to a string. Firebase will then return the value for that Ad Format's restrictions
				var notes = snapshot.child(notesArgument.toString()).val();
			
			// Display the information from the call into the paragraph div for copy limit
//				$('#rightHeader').hide();
    			$('#notesPara').html("Other Notes: " + notes).slideDown();
			
			
  			});
				
	});
	
});