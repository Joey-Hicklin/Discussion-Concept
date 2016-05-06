$(document).ready(function(){

/////////////  AJAX   //////////////////

	function getData(){
		var jqxhr = $.ajax({
			url: "api.php",
			method: 'GET',
			dataType: 'JSON'
		}).done(function(data,success){
			var loggedIn = data.login;

         /////////////   STYLING   ///////////////////

			$('.optionsToolbar').click(function() {
				$('.blackout').hide();
				$('.optionBlackout').show();
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

		 /////////////////   BUTTON DIRECTIONS   //////////////
		 	$('.logOutButton').click(function(event) {
		 		window.location = "logout.php";
		 	});

		}); // end of .done function
	} // end of getData function
	getData();
}); // document ready end