$(document).ready(function(){

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
				console.log(rT);
				console.log(rS);
			}
			
		 /////////////////   BUTTON DIRECTIONS   //////////////
		 	$('.logOutButton').click(function(event) {
		 		window.location = "logout.php";
		 	});

		 	$('.toolbarSignUp').click(function(event) {
		 		window.location = "sign_up.php";
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
		 		$('.viewTopicBlackout').show()
		 	});

		 ////////////////   REVIEW RESPONSE STATEMENTS   /////////////////
		 	$('.reviewPostButton').click(function(event) {
		 		var respondStatements = this.form.elements['statements[]'];
		 		$('.blackout').hide();
		 		$('.viewTopic').html('').css({
		 			"font-size":"2vw",
		 			"text-align":"left"
		 		});
		 		if (respondStatements.length == null){
		 			$('<p>').addClass('statementReview').append(respondStatements.value).appendTo('.viewTopic');
		 		} else {
		 			for (var i = 0; i < respondStatements.length; i++) {
			 			console.log(respondStatements[i].value);
			 			$('<p>').addClass('statementReview').append(respondStatements[i].value).appendTo('.viewTopic');
			 		}
		 		}
		 		$('.submitPost').css("display","inline-block");
		 		$('.viewTopicBlackout').show();
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