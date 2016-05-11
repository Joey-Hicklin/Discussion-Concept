jQuery(function($){
	function menuToggle(e, f) {	// declare your click variable and its class-swapping parent
		$(e).on('click', function(g) {	// when the click variable is clicked... 
			//g.preventDefault();	// if it's an anchor element, prevent default behavior (e.g., don't go to the href)
			var span = $(this),	// this is the click variable
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
					url: "view.php",
					method: 'POST',
					data: {'V':$view,'VI':$viewIn,'S':$sortA,'D':$displayN,'L':$layerT}
				}).done(function(data,success){
					console.log(data);
				});
			}
			
		 /////////////////   BUTTON DIRECTIONS   //////////////
		 	$('.logOutButton').click(function(event) {
		 		window.location = "logout.php";
		 	});

		 	$('.toolbarSignUp').click(function(event) {
		 		window.location = "sign_up.php";
		 	});

		 	$('select').change(function(event) {
		 		$('.sidebarShowing').hide();
		 		$('.sidebarConfirmBox').show();
		 	});

		 	$('.sidebarConfirmMTButton').click(function(event) {
		 		$layerT = 1; // main topic
		 		sendViewData($view, $viewIn, $sortA, $displayN, $layerT);
		 	});

		 	//////   STATEMENT CLONER   //////
		 	$('.cloneButton').click(function(event) {
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

		 ////////////////   REVIEW RESPONSE STATEMENTS   /////////////////
		 	$('.reviewPostButton').click(function(event) {
		 		var respondStatements = this.form.elements['statements[]'];
		 		$('.blackout').hide();
		 		$('.reviewContent').html('').css({
		 			"font-size":"2vw",
		 			"text-align":"left"
		 		});
		 		if (respondStatements.length == null){  // If there is only 1 statement, so it is not an array
		 			$('<p>').addClass('statementReview').append(respondStatements.value).appendTo('.reviewContent');
		 		} else {
		 			for (var i = 0; i < respondStatements.length; i++) {
			 			console.log(respondStatements[i].value.length);
			 			$('<p>').addClass('statementReview').append(respondStatements[i].value).appendTo('.reviewContent');
			 		}
		 		}
		 		$('.submitPost').css("display","inline-block");
		 		$('.reviewContent').show();
		 		$('.viewTopic').hide();
		 		$('.viewTopicBlackout').show();

		 		$('.submitPost').click(function(event) {
			 		var postContent = "";
			 		if (respondStatements.length == null){  // If there is only 1 statement, so it is not an array
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

		 /////////////   VIEW SIDEBAR   ///////////////

		 	$view = ($('#sidebarView').val());
		 	$viewIn = ($('#sidebarIn').val());
		 	$sortA = ($('#sortAmount').val());
		 	$displayN = ($('#displayNum').val());

		 	$('.sidebarConfirmMTButton').click(function(event) {
		 		$layerT = 1;
		 	});
		 	$('.sidebarConfirmCLButton').click(function(event) {
		 		$layerT = 0;
		 	});

         /////////////   STYLING   ///////////////////

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

			if (window.location.pathname.indexOf("respond")>-1){
				window.onbeforeunload = function(){ return 'YOU WILL LOSE ALL INFORMATION YOU HAVE ENTERED!' }
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

		}); // end of .done function
	} // end of getData function
	getData();
}); // document ready end
}); // end of functions