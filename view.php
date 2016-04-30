<?php require "inc/head.inc.php"; head("NullSpeak - View"); require "inc/toolbar.inc.php"; require "inc/blackouts.inc.php"; ?>
<?php 
function statement($content){ ?>
<div class="statement">
		<div class="statementRatingBox">
			<div class="statementRating"></div>
			<div class="statementRating"></div>
			<div class="statementRating"></div>
		</div><!--END OF statementRatingBox DIV-->
		<div class="statementContentBox">
			<div class="statementContent"><?php echo $content; ?></div><!--END OF statementContent DIV-->
			<div class="statementBlackout">
				<div class="statementRateButton"></div>
				<div class="statementViewButton">
					<div class="statementResponseNum"></div>
				</div><!--END OF statementView DIV-->
				<div class="statementRespondButton"></div>
			</div><!--END OF statementBlackout DIV-->
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
	<div class="postRateButton"></div>
		<div class="postViewButton">
			<div class="postResponseNum"></div>
		</div><!--END OF postView DIV-->
		<div class="postRespondButton"></div>
	<div class="postReadMore">Read More...</div>
</div><!--END OF post DIV-->
<?php } ?>
<?php for ($i=0; $i < 5; $i++) { 
	echo post();
} ?>