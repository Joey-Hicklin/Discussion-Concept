function viewDisplay(a){
	$('#view_content').html(a);
	$('.post').find(".statementContent:first").css("border-top","0.2vw solid black");
	$('.post').find(".statementContent:last").css("border-bottom","0.2vw solid black");
	$('.post').find('.statement:last').css({
		"margin-bottom":"0.8vw",
		"border-bottom":"none"
	});

	 ////////////////////////   POST SLIDE DISPLAY   ////////////////////////


	$('.post').each(function(index, content) {
		$(this).contents('.statement').not(':first').hide();

		if ($(this).contents('.statement').length > 1){

			$(this).contents('.postReadMore').click(function(event) {
				parental = $(this).offsetParent('.post');
				parental.contents('.statement').slideDown(1000);
				parental.contents('.postRatingBox').animate({"margin-top": "1vw",}, 500, function() {
					parental.contents('.postButton').css({
						display: 'inline-block',
						opacity: '0'
					});
					parental.contents('.postReadMore').fadeOut(500);
					parental.contents('.postButton').animate({opacity:"1"}, 500);
				});
			});
		} else{
			$(this).contents('.postReadMore').hide();
			$(this).contents('.postRatingBox').hide();
		}
	});
} // viewDisplay function

function grabSidebarValues(){
	view = ($('#sidebarView').val());  ///// set variables for sidebar selections
 	viewIn = ($('#sidebarIn').val()); /////
 	sortA = ($('#sortAmount').val()); /////
 	displayN = ($('#displayNum').val()); //
 	return {
 		"view":view,
 		"viewIn":viewIn,
 		"sortA":sortA,
 		"displayN":displayN
 	}
} // grabSidebarValues function

function A(loggedIn){
	animateStarted = false;
	a = Date.now()+11000;
	postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, a, '.postTimer', "POST!")},1000);
	$('.postTimer').css("color","rgba(255,0,0,1)").removeClass('postTimerReady');
	return "Starting Timer Manually";
} // A() manual timer function

function B(loggedIn){
	animateStarted = false;
	a = Date.now()+11000;
	postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, a, '.mainTopicTimer', "MAIN!")},1000);
	$('.mainTopicTimer').css("color","rgba(255,0,0,1)").removeClass('postTimerReady');
	return "Starting Timer Manually";
} // B() manual timer function

Number.prototype.pad = function(n) {
    return new Array(n).join('0').slice((n || 2) * -1) + this;
} // timer padding function

function htmlspecialchars(str) {
  return str.replace('&', '&amp;').replace('"', '&quot;').replace("'", '&#039;').replace('<', '&lt;').replace('>', '&gt;');
} // HTML special chars function

function getData(callback){
	var jqxhr = $.ajax({
		url: "api.php",
		method: 'GET',
		dataType: 'JSON'
	}).done(function(a,success){
		callback(a);
	}) // end of .done function
	.fail(function(a){ // getData error reporting
		console.log("error");
		console.log(a);
	});
} // getData function

function animateTimer(newHTML, element){
	console.log("animated started");
	$(element).animate({

		"color":"rgba(255,0,0,0.2)"
	},4000,function() {
		setTimeout(function(){
			$(element).addClass('postTimerReady');
			$(element).html(newHTML);
			console.log("animated!");
		},1000)
	});
} // animate timer function

function setPostTimer(animateStarted, loggedIn, time, element, Html){
	var lastAct = time - Date.now();

	if (loggedIn == 1 && lastAct > 1){
		
		if (((lastAct/1000) % 60) < 5.0000001 && ((lastAct/1000/60) << 0) < 1){
			if (animateStarted == false){
				window.animateStarted = true;
				animateTimer(Html, element);
			}
		}

		if (element == '.mainTopicTimer'){
			if (((lastAct/1000/60/60) << 0) < 10){
				hr = String((Math.round((lastAct/1000/60/60) << 0)).pad(2));
				
			} else{
				hr = String((Math.round((lastAct/1000/60/60) << 0)));
				
			}
			if (((lastAct/1000/60 << 0) % 60) < 10){
				min = String(((lastAct/1000/60 << 0) % 60).pad(2));
				
			} else{
				min = String(((lastAct/1000/60 << 0) % 60));
				
			}
		} else{
			if ((lastAct/1000/60 << 0) < 10){
				min = String((lastAct/1000/60 << 0).pad(2));
				
			} else{
				min = String((lastAct/1000/60 << 0));
				
			}
		}

		if (((lastAct/1000) % 60) < 10){
			sec = String((Math.round((lastAct/1000) % 60)).pad(2));
			
		} else{
			sec = String((Math.round((lastAct/1000) % 60)));
			
		}

		if (element == '.mainTopicTimer'){
			$(element).html(hr+":"+min+":"+sec);
		} else{
			$(element).html(min+":"+sec);
		}

	} else if (loggedIn == 1) {
		
		if (typeof postInterval !== 'undefined'){
			window.clearInterval(postInterval);
			animateStarted = false;
			
			// set html to "Respond Ready!"
			// add class that gives new style
		}
		console.log("Post timer is up!");
	} else{
		
	}
} // setPostTimer function

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
	} // jQuery function Menu Toggle

function sendViewData(view, viewIn, sortA, displayN, layerType, layerID, f){
	layerType = layerType || "N"; // "POST" for post, "STATEMENT" for statement, "N" for neither
	layerID = layerID || "N"; // "N" if ID is not set
	var jqxhr = $.ajax({
		url: "view_content.php",
		method: 'POST',
		data: {'V':view,'VI':viewIn,'S':sortA,'D':displayN,'LT':layerType,'LID':layerID}
	}).done(function(a,success){
		f(a);
	});
} // sendViewData function

function sendPostData(postContent){
	var jqxhr = $.ajax({
		url: "newPost.php",
		method: 'POST',
		data: {"postContent":postContent}
	}).done(function(data,success){
		console.log(data);
		window.onbeforeunload = null;
		switch (rT){
			case 'mT':
				window.location = "main_topic.php";
				break;
			case 'P':
				window.location = "main_topic.php";

				// revert page back to previous view state (http://bit.ly/1TciLg3)
				// use pushState() ---- (http://bit.ly/27n1U0p)
				// possibly send ?hash? data through GET statement

				// When a human writes code, they are inscribing their intelligence into a machine.

				// rewrite all view processes through GET statements, resending the page info

				break;
			case 'S':
				window.location = "main_topic.php";
				break;
		}
	});
} // sendPostData() function

function viewLayer(type, clickID, viewIn){
	$('.blackout').hide();

	sV = grabSidebarValues();
	nL = $('.originalLayer').clone(true, true);
	nL.html($('.layerButton').length);
	nL.removeClass('originalLayer');
	$('.layerButton:last').after(nL);

	layerObjects.push( {"layerID":clickID, "layerContent":$('.respondTopic').html(), "layerType":type} );

	sendViewData(sV.view, viewIn, sV.sortA, sV.displayN, type, clickID, function(a){
		viewDisplay(a);
		threeButtons('.postRespondButton');
	    threeButtons('.postRateButton');
	    threeButtons('.postViewButton');
	    threeButtons('.statementRespondButton');
	    threeButtons('.statementRateButton');
	    threeButtons('.statementViewButton');
	});
} // viewLayer function

function viewNum(sqlLayerType, clickID, affiliation){
	$.ajax({
		url: 'viewNum.php',
		type: 'POST',
		dataType: 'JSON',
		data: {
			"type": sqlLayerType,
			"id": clickID,
			"aff": affiliation
		}
	})
	.done(function(data, success) {
		switch(affiliation){
			case 0:
			$('.viewNumA').html(data);
			break;

			case 1:
			$('.viewNumN').html(data);
			break;

			case 2:
			$('.viewNumD').html(data);
			break;
		}
	});
} // viewNum function

function threeButtons(clickedButton){
    	$(clickedButton).click(function(event) {

    		if (clickedButton.search("post") > -1){ //-----------------// get type
    			type = clickedButton.substring(1,5); //               /
    		} else if (clickedButton.search("statement") > -1){ //   /
    			type = clickedButton.substring(1,10); //            /
    		}

	    	clickID = $(this).closest("."+type).find("."+type+"ID").html(); // get the ID of the clicked element

	    	if (clickedButton.search("Respond") > -1){ //--------------------// set words for title and buttons
	    		$('.viewNum').hide();
    			$('.respondBox span').html("Respond In:"); //               /
    			$('.agreeButton .threeButtonText').html("AGREEMENT"); //                    /
    			$('.neutralButton .threeButtonText').html("NEUTRALITY"); //                /
    			$('.disagreeButton .threeButtonText').html("DISAGREEMENT"); //            /

    		} else if (clickedButton.search("View") > -1){ //             /
    			$('.respondBox span').html("View Responses In:"); //     /
    			$('.agreeButton .threeButtonText').html("AGREEMENT"); //                /
    			$('.neutralButton .threeButtonText').html("NEUTRALITY"); //            /
    			$('.disagreeButton .threeButtonText').html("DISAGREEMENT"); //        /

    			if (type == "post"){
		 			sqlLayerType = "POST";
		 		} else if (type == "statement"){
		 			sqlLayerType = "STATEMENT";
		 		}
		 		
	    		viewNum(sqlLayerType, clickID, 0);
	    		viewNum(sqlLayerType, clickID, 1);
	    		viewNum(sqlLayerType, clickID, 2);

	    		$('.viewNum').css("display","inline-block");
    			
    		} else if (clickedButton.search("Rate") > -1){
    			$('.viewNum').hide();
    			$('.respondBox span').html("This "+type.charAt(0).toUpperCase()+type.slice(1)+" is:");
    			$('.agreeButton .threeButtonText').html("WELL SPOKEN");
    			$('.neutralButton .threeButtonText').html("NOT HELPFUL");
    			$('.disagreeButton .threeButtonText').html("RUDE/INSULTING");
    		}

	    	$('.respondBlackout').show();

	    	$('.respondBlackout').find('.respondTopic').html(""); // clear the topic content

	    	if (type == "post"){
	    		$(this).closest('.post').find('.statement').each(function(index, el) {
		    		$('<p>').html($(this).find('.statementContent span').html()).appendTo($('.respondBlackout').find('.respondTopic'));
		    	});
		    	typeShort = "P";
	    	} else{
	    		$('.respondBlackout').find('.respondTopic').html($(this).closest('.statementContentBox').find('.statementContent span').html());
	    		typeShort = "S";
	    	}

	    	$('.respondTopic').css({
	    		"font-size": '2.5vw'
	    	});

	    	///////////////////////////////////////////////   CLICK STATES   ////////////////////////////////////


	    	$('.agreeButton').off("click");
	    	$('.agreeButton').click(function(event) { //--------------------------------// GREEN BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			window.location = 'respond.php?rS=0&rT='+typeShort+'&id='+clickID;

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 0;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(1)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){

	    		}
	    	});

	    	$('.neutralButton').off("click");
	    	$('.neutralButton').click(function(event) { //--------------------------------// BLUE BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			window.location = 'respond.php?rS=1&rT='+typeShort+'&id='+clickID;

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 1;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(2)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){

	    		}
	    	});

	    	$('.disagreeButton').off("click");
	    	$('.disagreeButton').click(function(event) { //--------------------------------// RED BUTTON CLICK

	    		if (clickedButton.search("Respond") > -1){
	    			window.location = 'respond.php?rS=2&rT='+typeShort+'&id='+clickID;

	    		} else if (clickedButton.search("View") > -1){
	    			viewIn = 2;
	    			viewLayer(type, clickID, viewIn);
	    			$('#sidebarIn option').removeAttr('selected');
	    			$('#sidebarIn option:nth-child(3)').attr('selected', 'selected');

	    		} else if (clickedButton.search("Rate") > -1){

	    		}
	    	});
	    });
    } // threeButtons function

function checkLayerButtons(element){
	if (element == 1){
		$('.layerNavPrev').hide();
	} else{
		$('.layerNavPrev').show();
	}
	if (element == ($('.layerButton').length - 1)) {
		$('.layerNavNext').hide();
	} else{
		$('.layerNavNext').show();
	}
} // checkLayerButtons function

 $(document).ready(function(){

 	getData(function(a){

		loggedIn = a.login;
		lastMainTime = Date.parse(a.lastMain);
		lastPostTime = Date.parse(a.lastPost);
		lastPostCheck = lastPostTime-Date.now()+(15*60*1000); // switch "15" for algorithm to check acceptance rate
		lastMainCheck = lastMainTime-Date.now()+(48*60*60*1000);

		if (loggedIn == 1 && lastPostCheck > 0.998){

			lastPost = lastPostTime+(15*60*1000); // switch "15" for algorithm to check acceptance rate
			animateStarted = false;
			postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastPost, '.postTimer', "POST!")},1000);

		} else if (loggedIn ==1){
			$('.postTimer').addClass('postTimerReady').html("POST!")
		}

		if (loggedIn == 1 && lastMainCheck > 0.998){

			lastMain = lastMainTime+(48*60*60*1000);
			animateStarted = false;
			postInterval = setInterval(function(){setPostTimer(animateStarted, loggedIn, lastMain, '.mainTopicTimer', "MAIN!")},1000);

		} else if (loggedIn ==1){
			$('.mainTopicTimer').addClass('postTimerReady').html("MAIN!")
		}

		if (window.location.pathname.indexOf("respond")>-1){ // if on respond page, retrieve data from GET  ----// node

			rT = a.rT; // rT = Response Type (Main Topic, Post or Statement)
			rS = a.rS; // rS = Response Style (Agree, Neutral, Disagree)
			ID = a.id; // ID of content being responded to

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
					$('.viewTopic').css({
						"text-align":"center"
					});
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
				$('.respondBlackout').find('.respondTopic').html($('.mainTopicFront').html());
				$('.agreeButton').click(function(event) {
		    		window.location = 'respond.php?rS=0&rT=mT';
		    	});
		    	$('.neutralButton').click(function(event) {
		    		window.location = 'respond.php?rS=1&rT=mT';
		    	});
		    	$('.disagreeButton').click(function(event) {
		    		window.location = 'respond.php?rS=2&rT=mT';
		    	});
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

		return loggedIn, lastMain, lastPostTime;
	}); // getData()

	menuToggle($('.sidebarTab'),$('.sidebarBox'));

	layerObjects = [0];

	$('.logOutButton').click(function(event) {
 		window.location = "logout.php";
 	});

 	$('.toolbarSignUp').click(function(event) {
 		window.location = "sign_up.php";
 	});

	if (window.location.pathname.indexOf("view")>-1){
		$('#mainLayer').css('display', 'inline-block');
		$('#mainLayer').click(function(event) {
			window.location = "main_topic.php";
		});
	} // various
	
	sendViewData("P", "0", "H", "5", "N", "N", function(a){
		viewDisplay(a);
		threeButtons('.postRespondButton');
	    threeButtons('.postRateButton');
	    threeButtons('.postViewButton');
	    threeButtons('.statementRespondButton');
	    threeButtons('.statementRateButton');
	    threeButtons('.statementViewButton');
	}); // sendViewData() DEFAULT

 	$('.layerButton').click(function(event) {
 		thisLayerText = parseInt($(this).text());
 		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);

 		checkLayerButtons(thisLayerText);

 		$('.layerBlackout').show();
 	});

 	$('.layerNavGo').click(function(event) {
 		sV = grabSidebarValues();
		sendViewData(view, viewIn, sortA, displayN, layerObjects[thisLayerText].layerType, layerObjects[thisLayerText].layerID, function(a){
			viewDisplay(a);
			threeButtons('.postRespondButton');
		    threeButtons('.postRateButton');
		    threeButtons('.postViewButton');
		    threeButtons('.statementRespondButton');
		    threeButtons('.statementRateButton');
		    threeButtons('.statementViewButton');
		});
		removeCount = $('.layerButton').length;
		for (var i = thisLayerText+1; i < removeCount; i++) {
			console.log(i);
			$('.layerButton:last').remove();
		}
		spliceNum1 = thisLayerText+1;
		spliceNum2 = layerObjects.length-thisLayerText+1;
		layerObjects.splice(spliceNum1,spliceNum2);
		$('.layerBlackout').hide();
	});

	$('.layerNavPrev').click(function(event) {
		thisLayerText-=1;
		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);
		checkLayerButtons(thisLayerText);
	});
	$('.layerNavNext').click(function(event) {
		thisLayerText+=1;
		$('.layerBlackout .layerContent').html(layerObjects[thisLayerText].layerContent);
		checkLayerButtons(thisLayerText);
	});

 ////////////////////////////////   VIEW SIDEBAR   /////////////////////////////////////////

 	originalValues = grabSidebarValues();

 	$('select').change(function(event) {

 		if (reset == 0){ // if this is the first change

 			reset = 1; // note that it is the first change
 			Rview = ($('#sidebarView').val()); ////// set reset return values
		 	RviewIn = ($('#sidebarIn').val()); /////
		 	RsortA = ($('#sortAmount').val()); /////
		 	RdisplayN = ($('#displayNum').val()); //
 		}

 		$('.sidebarShowing').hide(); // hide the display page results

 		$('.sidebarConfirmBox').show(); // show the 2 search buttons and 1 reset button
 	});


 	$('.sidebarConfirmCLButton').click(function(event) {
	 	sV = grabSidebarValues();
	 	layerType = layerObjects[layerObjects.length-1].layerType; //
	 	layerID = layerObjects[layerObjects.length-1].layerID; //-//
	 	$('.sidebarConfirmBox').hide(); // hide 3 buttons
 		$('.sidebarShowing').show(); // show display page results
 		sendViewData(sV.view, sV.viewIn, sV.sortA, sV.displayN, layerType, layerID, function(a){
 			viewDisplay(a);
 		}); // send query to PHP
 	});

 ////////////////////////////////////   STATEMENT CLONER   ////////////////////////////////

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
 		respondStatements = this.form.elements['statements[]'];
 		$('.blackout').hide();
 		$('.reviewContent').html('').css({
 			"font-size":"2vw",
 			"text-align":"left"
 		});

 		if (respondStatements.length == null){  // If there is only 1 statement, it is not an array
 			$('<p>').addClass('statementReview').append(htmlspecialchars(respondStatements.value)).appendTo('.reviewContent');
 		} else {
 			for (var i = 0; i < respondStatements.length; i++) {
	 			$('<p>').addClass('statementReview').append(htmlspecialchars(respondStatements[i].value)).appendTo('.reviewContent');
	 		}
 		}

 		$('.submitPost').css("display","inline-block");
 		$('.reviewContent').show();
 		$('.viewTopic').hide();
 		$('.viewTopicBlackout').show();
 	});
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
 		sendPostData(postContent);
 	});

 /////////////////////////////////////////   STYLING   ////////////////////////////////////////////

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
	$('.layerBox').click(function(event) {
		event.stopPropagation();
	});	
}); // document ready end
}); // end of functions