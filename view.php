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
			<select name="sidebarView">
				<option value="post">Posts</option>
			</select>
		</div>
		<div class="sidebarViewIn">
			<span>In</span>
			<select name="sidebarIn">
				<option value="agreement">Agreement</option>
			</select>
		</div>
	</div>
	<div class="sidebarSortBox">
		<span>Sorted by</span>
		<select name="sortAmount">
			<option value="highest">Highest</option>
		</select>
		<select name="sortType">
			<option value="rating">Rating</option>
		</select>
	</div>
	<div class="sidebarDisplayBox">
		<span>Display</span>
		<select name="displayNum">
			<option value="5">5 Results</option>
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
</div>

<!--***************************   POSTS   ******************************************-->

<?php 
function statement($content){ ?>
<div class="statement"><!--
		--><div class="statementRatingBox"><!--
			--><div class="statementRating"></div><!--
			--><div class="statementRating"></div><!--
			--><div class="statementRating"></div><!--
		--></div><!--END OF statementRatingBox DIV
		--><div class="statementContentBox">
			<div class="statementContent"><span><?php echo $content; ?></span>
				<div class="statementBlackout">
					<div class="statementRateButton statementButton">RATE</div>
					<div class="statementViewButton statementButton">VIEW
						<div class="statementResponseNum">3</div>
					</div><!--END OF statementView DIV-->
					<div class="statementRespondButton statementButton">RESPOND</div>
				</div><!--END OF statementBlackout DIV-->
			</div><!--END OF statementContent DIV-->
		</div><!--END OF statementContentBox DIV-->
	</div><!--END OF statement DIV-->
<?php
}

function post(){ ?>
<div class="post">
	<?php for ($i=0; $i < 2; $i++) { 
		echo statement("There is no way I'd ever get to 350 characters with one simple statement. Even if I tried to make multiple points, referencing multiple places with all kinds of varying information. The possibility of 350 characters is actually quite vast when you consider the total ability that you have with the limit. For example, there are 350 characters here...");
	} ?>
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
<?php } ?>
<?php for ($i=0; $i < 5; $i++) { 
	echo post();
} ?>