<?php
require "inc/head.inc.php";
head("NullSpeak - Respond");
require "inc/requires.inc.php";
?>

<div class="respondSubjectBox">
	<div class="respondSubjectButton">View Topic</div>
	<span>I disagree because:</span>
</div>
<form class="postFormBox" action="" id="postNew">
	<div class="statementInputBox cloneBox">
		<textarea class="statementInput clone" form="postNew" rows="4" maxlength="350" name="statements[]" autofocus></textarea>
		<div class="simpleLink newStatement cloneButton">Add another statement</div>
		
	</div><!--END OF statementInputBox DIV-->

	<input class="reviewPostButton" type="submit" value="REVIEW POST">
</form>