<!--*******************   BLACKOUTS   ***************************  -->

	<div class="loginBlackout blackout">
		<div class="loginBox">
			<form action="login.php" method="post">
				<input type="text" maxlength="50" size="30" placeholder="EMAIL" name="email" required>
				<div class="passwordBox">
					<input type="password" maxlength="30" size="30" placeholder="PASSWORD" name="password" required>
					<div class="loginForget">Forgot your password?</div>
				</div><!--END OF passwordBox DIV-->
				<input class="loginButton" type="submit" value="Log In">
			</form>
		</div>
	</div>

	<div class="optionBlackout blackout">
		<div class="optionBox">
			<div class="optionButton signUpButton">Sign Up</div>
			<div class="optionButton logInButton">Log In</div>
			<div class="optionButton logOutButton">Log Out</div>
		</div><!--END OF optionBox DIV-->
	</div><!--END OF optionBlackout DIV-->

	<div class="respondBlackout blackout">
		<div class="respondTopicBox">
			<div class="respondTopic"></div>
		</div>
		<div class="respondBox">
			<span></span>
			<div class="agreeButton respondInButton"><div class="viewNum viewNumA">8</div><div class="threeButtonText">AGREEMENT</div></div>
			<div class="neutralButton respondInButton"><div class="viewNum viewNumN">8</div><div class="threeButtonText">NEUTRALITY</div></div>
			<div class="disagreeButton respondInButton"><div class="viewNum viewNumD">8</div><div class="threeButtonText">DISAGREEMENT</div></div>
		</div><!--END OF respondBox DIV-->
	</div><!--END OF respondBlackout DIV-->

	<div class="viewTopicBlackout blackout">
		<div class="viewTopicBox blankView">
			<div class="viewTopic"><?php

		 ///////////////////////////////////////////   RESPOND PAGE   /////////////////////////////////////


			if (strpos($_SERVER['REQUEST_URI'], 'respond')){

				if ($_GET['rT'] == "mT"){
					echo ($db->query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'")->fetch_row()[0]);
				} elseif ($_GET['rT'] == "P"){
					$respondViewPost = $db->query("SELECT CONTENT FROM statement WHERE statement.POST_ID='".$_GET['id']."'");
					for ($i=0; $i < $respondViewPost->num_rows ; $i++) { 
						echo "<p>".$respondViewPost->fetch_row()[0]."</p>";
					}
				} elseif ($_GET['rT'] == "S"){
					echo ($db->query("SELECT CONTENT FROM statement WHERE statement.ID='".$_GET['id']."'")->fetch_row()[0]);
				}
			}
			?></div>
			<div class="reviewContent"></div>
			
			<div class="submitPost">Submit Post</div>
		</div><!--END OF viewTopicBox DIV-->
	</div><!--END OF viewTopicBlackout DIV-->

	<!-- <div class="rateBlackout blackout">
		<div class="rateContent">There is no way I'd ever get to 350 characters with one simple statement. Even if I tried to make multiple points, referencing multiple places with all kinds of varying information. The possibility of 350 characters is actually quite vast when you consider the total ability that you have with the limit. For example, there are 350 characters here...</div>
		<div class="rateRatingBox">
			<div class="rateRatingGreen rateRatingButton">Well Spoken</div>
			<div class="rateRatingBlue rateRatingButton">Not Helpful</div>
			<div class="rateRatingRed rateRatingButton">Rude/Insulting</div>
		</div>
	</div> -->

	<div class="layerBlackout blackout">
		<div class="layerBox">
			<div class="layerContent"></div>
			<div class="layerNavBox">
				<div class="layerNavPrev layerNavButton"><span>&#x25B2;</span></div>
				<div class="layerNavGo layerNavButton">Go To Layer</div>
				<div class="layerNavNext layerNavButton"><span>&#x25B2;</span></div>
			</div>
		</div>
	</div>

<!-- ************************   end of BLACKOUTS   *************************** -->

<script src="js/script.js"></script>