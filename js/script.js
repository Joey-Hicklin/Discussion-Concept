jQuery(function($) {
	function menuToggle(e, f) {	// declare your click variable and its class-swapping parent
		$(e).on('click', function(g) {	// when the click variable is clicked... 
			//g.preventDefault();	// if it's an anchor element, prevent default behavior (e.g., don't go to the href)
			var span = $(this);	// this is the click variable
				spanParent = span.closest(f);	// this is the closest (hierarchical) class-swapping parent
			if (spanParent.hasClass('inactive')) {	// if the parent HAS the 'active' class when the click variable is clicked...
				spanParent.removeClass('inactive');	// remove the 'active' class from the parent
				spanParent.animate({
					"left": "0vw"
				});
				$('.sidebarTab').css({
					"transform":"translateY(-50%) rotate(0deg)",
					"right":"-2.5vw"
				});
				$('.post').animate({"left":"58%"});
			} else {	// otherwise, if the parent does NOT have the 'active' class when the click variable is clicked...
				spanParent.animate({
					"left": "-15.1vw"
				});
				spanParent.addClass('inactive');	// add the 'active' class to the parent
				$('.sidebarTab').css({
					"transform":"translateY(-50%) rotate(180deg)",
					"right":"-3vw"
				});
				$('.post').animate({"left":"50%"});
			}
		});
	}
$(document).ready(function(){

	menuToggle($('.sidebarTab'),$('.sidebarBox'));

/////////////  AJAX   //////////////////

	function getData(){
		var jqxhr = $.ajax({
			url: "api.php",
			method: 'GET',
			dataType: 'JSON'
		}).done(function(data,success){
			console.log(data);
			var loggedIn = data.login;
			if (window.location.pathname.indexOf("respond")>-1){
				var rT = data.rT;
				var rS = data.rS;
			}
			function sendPostData(rS,rT,postContent){
				var jqxhr = $.ajax({
					url: "newPost.php",
					method: 'POST',
					data: {'rT':rT,'rS':rS,"postContent":postContent}
				}).done(function(data,success){
					console.log(data);
					window.onbeforeunload = null;
					switch (rT){
						case 'mT':
							window.location = "main_topic.php";
							break;
						case 'P':
							window.location = "main_topic.php";
							break;
						case 'S':
							window.location = "main_topic.php";
							break;
					}
				});
			}
			function sendViewData($view, $viewIn, $sortA, $displayN, $layerT){
				var jqxhr = $.ajax({
					url: "view_content.php",
					method: 'POST',
					data: {'V':$view,'VI':$viewIn,'S':$sortA,'D':$displayN,'L':$layerT}
				}).done(function(data,success){
					// console.log(data);
					$('#view_content').html(data);
				});
			}
			
		 //////////////////////////////////   BUTTON DIRECTIONS   ////////////////////////////
		 	$('.logOutButton').click(function(event) {
		 		window.location = "logout.php";
		 	});

		 	$('.toolbarSignUp').click(function(event) {
		 		window.location = "sign_up.php";
		 	});


		 ////////////////////////////////   VIEW SIDEBAR   ////////////////////////////////

		 	$view = ($('#sidebarView').val());  ///// set variables for sidebar selections
		 	$viewIn = ($('#sidebarIn').val()); /////
		 	$sortA = ($('#sortAmount').val()); /////
		 	$displayN = ($('#displayNum').val()); //

		 	$reset = 0; // start sensing for changes in selection

		 	$('select').change(function(event) {

		 		if ($reset == 0){ // if this is the first change

		 			$reset = 1; // note that it is the first change
		 			$Rview = ($('#sidebarView').val()); ////// set reset return values
				 	$RviewIn = ($('#sidebarIn').val()); /////
				 	$RsortA = ($('#sortAmount').val()); /////
				 	$RdisplayN = ($('#displayNum').val()); //
		 		}

		 		$('.sidebarShowing').hide(); // hide the display page results

		 		$('.sidebarConfirmBox').show(); // show the 2 search buttons and 1 reset button
		 	});


		 	$('.sidebarConfirmCLButton').click(function(event) {
		 		$layerT = 0; //---------------------------// save selection for database query
		 		$view = ($('#sidebarView').val()); //// collect current selections
			 	$viewIn = ($('#sidebarIn').val()); ///
			 	$sortA = ($('#sortAmount').val()); ////
			 	$displayN = ($('#displayNum').val()); //
			 	$('.sidebarConfirmBox').hide(); // hide 3 buttons
		 		$('.sidebarShowing').show(); // show display page results
		 		sendViewData($view, $viewIn, $sortA, $displayN, $layerT); // send query to PHP
		 	});

		 	$('.sidebarConfirmMTButton').click(function(event) {
		 		$layerT = 1; //-------------------// save selection for database query
		 		$view = ($('#sidebarView').val()); //// collect current selections
			 	$viewIn = ($('#sidebarIn').val()); ///
			 	$sortA = ($('#sortAmount').val()); ////
			 	$displayN = ($('#displayNum').val()); //
		 		$('.sidebarConfirmBox').hide(); // hide 3 buttons
		 		$('.sidebarShowing').show(); // show display page results
		 		sendViewData($view, $viewIn, $sortA, $displayN, $layerT); // send query to PHP
		 	});

		 ////////////////////////////////////   STATEMENT CLONER   ////////////////////////////

		 	$('.cloneButton').click(function(){

		 		if($('.statementInputBox').length < 5){
			 		$('.cloneBox').clone(true,true).insertAfter('.cloneBox');
			 		$('.cloneButton').eq(0).removeClass('cloneButton').hide();
			 		$('.cloneBox').eq(0).removeClass('cloneBox');
			 		$('.clone').eq(0).removeClass('clone');
			 		$('.clone').val('').focus();
			 		window.scrollTo(0,document.body.scrollHeight);
			 	}
			 	if($('.statementInputBox').length == 5){
			 		$('.cloneButton').eq(0).removeClass('cloneButton').hide();
			 	}
		 	});

		 	//////  RESPOND VIEW TOPIC   //////
		 	$('.respondSubjectButton').click(function(event) {
		 		$('.blackout').hide();
		 		$('.reviewContent').hide();
		 		$('.submitPost').hide();
		 		$('.viewTopic').show();
		 		$('.viewTopicBlackout').show();
		 	});

		 /////////////////////////   REVIEW RESPONSE STATEMENTS   ///////////////////////////////////

		 	$('.reviewPostButton').click(function(event) {
		 		var respondStatements = this.form.elements['statements[]'];
		 		$('.blackout').hide();
		 		$('.reviewContent').html('').css({
		 			"font-size":"2vw",
		 			"text-align":"left"
		 		});

		 		if (respondStatements.length == null){  // If there is only 1 statement, it is not an array
		 			$('<p>').addClass('statementReview').append(respondStatements.value).appendTo('.reviewContent');
		 		} else {
		 			for (var i = 0; i < respondStatements.length; i++) {
			 			$('<p>').addClass('statementReview').append(respondStatements[i].value).appendTo('.reviewContent');
			 		}
		 		}

		 		$('.submitPost').css("display","inline-block");
		 		$('.reviewContent').show();
		 		$('.viewTopic').hide();
		 		$('.viewTopicBlackout').show();

		 		$('.submitPost').click(function(event) {
			 		var postContent = "";
			 		if (respondStatements.length == null){  // If there is only 1 statement, it is not an array
			 			postContent = respondStatements.value;
			 		} else {
				 		for (var i = 0; i < respondStatements.length; i++) {
				 			if (respondStatements[i].value.length !== 0){
				 				postContent = postContent.concat(respondStatements[i].value);
				 				postContent = postContent.concat("~^");
			 				}
				 		}
				 		postContent = postContent.substring(0, postContent.length-2); // Chop off the last ~^ delimiter
				 	}
			 		sendPostData(rS,rT,postContent);
			 	});
		 	});

         /////////////////////////////////   STYLING   //////////////////////////////////////

			$('.optionsToolbar').click(function() {
				$('.blackout').hide();
				$('.optionBlackout').show();
			});
			$('.toolbarLogin').click(function(event) {
		 		$('.blackout').hide();
		 		$('.loginBlackout').show();
		 	});
			$('.signUpButton').click(function(event) {
				window.location = "sign_up.php";
			});
			$('.logInButton').click(function(event) {
				$('.blackout').hide();
				$('.loginBlackout').show();
			});
			$('.blackout').click(function(){
				$('.blackout').hide();
			});			

		 ////////////////////////////////// RESPONSE PAGE ///////////////////////////////////////////
			if (window.location.pathname.indexOf("respond")>-1){
				window.onbeforeunload = function(){ return 'YOU WILL LOSE ALL INFORMATION YOU HAVE ENTERED!' };
				switch(rT){
					case "mT":
						$('.viewTopic').css({
							"font-size":"7vw",
							"text-align":"center"
						});
						break;
					case "P":
						break;
					case "S":
						break;
				}
			}

         /////////////   IF LOGGED IN   ////////////////////

			if (loggedIn == 1){
				console.log("Logged in!")
				$('.tls').hide()
				$('.signUpButton').hide();
				$('.logInButton').hide();
				$('.mainRespondButton').click(function(event) {
					$('.respondBlackout').show();
				});
			}

		 ////////////   IF NOT LOGGED IN   /////////////////

			else{
				console.log("Not logged in!")
				$('.timer').hide();
				$('.logOutButton').hide();
				$('.mainRespondButton').click(function(event) {
					$('.loginBlackout').show();
				});
			}

		 //////////  Blackout Boxes stop propagations   ///////////////////

			$('.optionBox').click(function(event) {
				event.stopPropagation();
			});
			$('.loginBox').click(function(event) {
				event.stopPropagation();
			});
			$('.respondTopicBox').click(function(event) {
				event.stopPropagation();
			});
			$('.respondBox').click(function(event) {
				event.stopPropagation();
			});
			$('.viewTopicBox').click(function(event) {
				event.stopPropagation();
			});

			/////////////// DEFAULT LANDING ON VIEW PAGE ////////////////////////
			$layerT = 1;
			$('#view_content').html(sendViewData($view, $viewIn, $sortA, $displayN, $layerT));

		}); // end of .done function
	} // end of getData function
	getData();
}); // document ready end
}); // end of functions