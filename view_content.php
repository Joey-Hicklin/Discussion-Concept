<?php 
require "inc/connection.inc.php";
function statement($content){ ?>
	<div class="statement"><!--
		--><div class="statementRatingBox"><!--
			--><div class="statementRating"></div><!--
			--><div class="statementRating"></div><!--
			--><div class="statementRating"></div><!--
		--></div><!--END OF statementRatingBox DIV
		--><div class="statementContentBox">
			<div class="statementContent"><span><?php echo $content; ?></span></div><!--END OF statementContent DIV-->
			<div class="statementBlackout">
				<div class="statementRateButton statementButton">RATE</div>
				<div class="statementViewButton statementButton">VIEW
					<div class="statementResponseNum">3</div>
				</div><!--END OF statementView DIV-->
				<div class="statementRespondButton statementButton">RESPOND</div>
			</div><!--END OF statementBlackout DIV-->
		</div><!--END OF statementContentBox DIV-->
	</div><!--END OF statement DIV-->
<?php
} // END OF statement FUNCTION

function post($postID, $db){ ?>
<div class="post">
	<?php 

	////  Use this area to differentiate viewing POST or STATEMENTS
	////  For POSTS do what's listed below
	////  For STATEMENTS change the $statementNum to 1, then have a mechanism that alters the sort order, so the stats on the statements are what is being sorted as the query is returned.
		$statements = $db->query("SELECT CONTENT FROM statement WHERE POST_ID='".$postID."'");

		for ($i=0; $i < $statements->num_rows; $i++) {
			statement($statements->fetch_row()[0]);
			}		
	 ?>
	<div class="postRatingBox"><!--
		--><div class="postRating"></div><!--
		--><div class="postRating"></div><!--
		--><div class="postRating"></div><!--
	--></div><!--END OF postRatingBox DIV-->
	<div class="postRateButton postButton">RATE</div>
		<div class="postViewButton postButton">VIEW
			<div class="postResponseNum">1</div>
		</div><!--END OF postView DIV-->
		<div class="postRespondButton postButton">RESPOND</div>
	<div class="postReadMore">Read More...</div>
</div><!--END OF post DIV-->
<?php } //END OF post FUNCTION ?>
<?php 

///////////   DISPLAY MACHINE   //////////////////


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	$V = $_POST['V'];  // view
	$VI = $_POST['VI']; // view In
	$S = $_POST['S']; // sort
	$D = $_POST['D']; // display num
	$L = $_POST['L']; // layer topic
} else {

	//DEFAULTS
	$V = "P"; // posts
	$VI = 0; // agreement
	$S = "H"; // highest rating
	$D = 5;
	$L = 1; // 1=mT, 0=sub topic
}

											// POSTS or STATEMENTS
// if ($_POST['V'] == 'P'){


// } elseif ($_POST['V'] == 'S') {
// 	# code...
// }

													// SORTER
// switch ($_POST['S']) {
// 	case 'H':
// 		//$query =. "ASC... rating amount"
// 		break;
	
// 	default:
// 		# code...
// 		break;
// }
?>
<?php
$query = "SELECT post.ID FROM post JOIN main_topic ON post.MAIN_ID = main_topic.ID WHERE main_topic.QUEUE_NUM = '0' AND post.AFFILIATION = '$VI'";
$response = $db->query($query);
?>

<?php
for ($i=0; $i < $response->num_rows ; $i++) { 
	post($response->fetch_row()[0], $db);
}
?>