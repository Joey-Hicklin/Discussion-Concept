<?php
require "inc/head.inc.php";
head("NullSpeak - View");
require "inc/requires.inc.php";
?>

<!--**************************   SIDEBAR   ****************************************-->

<div class="sidebarBox">
	<div class="sidebarTab">
		<div class="sidebarTabArrow">&#x25B2;</div>
	</div>
	<div class="sidebarTopicBox">
		<div class="sidebarTopicMain"><?php echo($db->query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'")->fetch_assoc()['TOPIC']); ?></div>
		<div class="sidebarTopicView">View Topic</div>
	</div>
	<div class="sidebarReturnBox">
		<div class="sidebarReturnButton">RETURN TO RESULTS</div>
	</div>
	<div class="sidebarViewBox">
		<div class="sidebarViewType">
			<span>View</span>
			<select id="sidebarView">
				<option value="P"<?php stickySelect("sidebarView","P") ?>>Posts</option>
				<option value="S"<?php stickySelect("sidebarView","S") ?>>Statements</option>
			</select>
		</div>
		<div class="sidebarViewIn">
			<span>In</span>
			<select id="sidebarIn">
				<option value="0"<?php stickySelect("sidebarIn","0") ?>>Agreement</option>
				<option value="1"<?php stickySelect("sidebarIn","1") ?>>Neutrality</option>
				<option value="2"<?php stickySelect("sidebarIn","2") ?>>Disagreement</option>
			</select>
		</div>
	</div>
	<div class="sidebarSortBox">
		<span>Sorted by</span>
		<select id="sortAmount">
			<option value="H"<?php stickySelect("sortAmount","H") ?>>Highest Rating</option>
			<option value="Lo"<?php stickySelect("sortAmount","Lo") ?>>Lowest Rating</option>
			<option value="M"<?php stickySelect("sortAmount","M") ?>>Most Recent</option>
			<option value="Le"<?php stickySelect("sortAmount","Le") ?>>Least Recent</option>
		</select>
		<!-- <select id="sortType">
			<option value="Ra">Rating</option>
			<option value="Re">Recent</option>
		</select> -->
	</div>
	<div class="sidebarDisplayBox">
		<span>Display</span>
		<select id="displayNum">
			<option value="5"<?php stickySelect("displayNum","5") ?>>5 Results</option>
			<option value="10"<?php stickySelect("displayNum","10") ?>>10 Results</option>
			<option value="20"<?php stickySelect("displayNum","20") ?>>20 Results</option>
			<option value="50"<?php stickySelect("displayNum","50") ?>>50 Results</option>
		</select>
	</div>
	<div class="sidebarShowing">
		<span class="sidebarShowingTitle">Showing Results</span>
		<div class="sidebarShowingPrev sidebarShowingButton">
			<div class="sidebarShowingArrow">&#x25B2;</div>
		</div>
		<span class="sidebarShowingNum">1 - 5</span>
		<div class="sidebarShowingNext sidebarShowingButton">
			<div class="sidebarShowingArrow">&#x25B2;</div>
		</div>
	</div>
	<div class="sidebarConfirmBox">
		<div class="sidebarConfirmCLButton sidebarConfirmButton">Search <br>Current Layer</div>
		<div class="sidebarConfirmMTButton sidebarConfirmButton">Search <br>Main Topic</div>
		<div class="sidebarConfirmRButton sidebarConfirmButton">Reset Search Changes</div>
	</div>
</div>

<!--***************************   POST   ******************************************-->

<?php 
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
	$L = $_POST['L']; // layer topic (main topic or no)
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

for ($i=0; $i < $response->num_rows ; $i++) { 
	post($response->fetch_row()[0], $db);
}
?>