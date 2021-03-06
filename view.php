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
		<div class="sidebarConfirmRButton sidebarConfirmButton">Reset Search Changes</div>
	</div>
</div>
<div id="view_content"></div>