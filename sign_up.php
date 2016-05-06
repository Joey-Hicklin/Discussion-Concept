<?php
require "inc/head.inc.php";
head("NullSpeak - Sign Up");
require "inc/requires.inc.php";
?>

<?php 
	if ($_SERVER['REQUEST_METHOD']=="POST"){
		if ($_POST['password']==$_POST['verifyPassword']){
			$email = $_POST['email'];
			$password = $_POST['password'];
			if (($db->query("SELECT EMAIL FROM user WHERE EMAIL=\"".$email."\"")->fetch_row()[0]) == $email){
				echo "<h2 class=\"signUpMessage\">That email already exists in our database, try logging in.</h2>";
			} elseif ($db->query("INSERT INTO user (EMAIL, PASSWORD) VALUES (\"".$email."\", \"".$password."\")")){
				echo "<h2 class=\"signUpMessage\">You've signed up!</h2>";
			} else {
				var_dump($db->error_list);
			}
			
		} else{
			echo "<h2 class=\"signUpMessage\">Your passwords don't match, try again.</h2>";
		}
	}
?>

<form class="signUpForm" action="sign_up.php" name="signUp" method="post">

	<input required type="email" maxlength="50" name="email" placeholder="EMAIL" value="<?php stickyText('email') ?>" />
	<?php /*<input required type="tel" maxlength="12" name="phone" placeholder="PHONE NUMBER" /> */ ?>
	<input required type="password" maxlength="30" name="password" placeholder="PASSWORD" />
	<input required type="password" maxlength="30" name="verifyPassword" placeholder="VERIFY PASSWORD" />
	<?php /*
	<h2>Demographic Info</h2>
	<span>Zipcode</span>
	<input required type="text" maxlength="11" name="zipcode" placeholder="ZIPCODE" />
	<span>Birthdate</span>
	<input required type="date" name="birthdate" />
	<span>Education Level</span>
	<select required name="education">
		<option value="">-SELECT-</option>
		<?php 
			$result = $db->query("SELECT LEVEL FROM education_level");
			for ($i=0; $i < $result->num_rows; $i++) { 
				echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
			}
		?>
	</select>
	<span>Ethnicity</span>
	<select required name="ethnicity">
		<option value="">-SELECT-</option>
		<?php 
			$result = $db->query("SELECT ETHNICITY_TYPE FROM ethnicity");
			for ($i=0; $i < $result->num_rows; $i++) { 
				echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
			}
		?>
	</select>
	<span>Gender</span>
	<select required name="gender">
		<option value="">-SELECT-</option>
		<?php 
			$result = $db->query("SELECT GENDER_TYPE FROM gender");
			for ($i=0; $i < $result->num_rows; $i++) { 
				echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
			}
		?>
	</select>
	<span>Annual Income Level</span>
	<select required name="income">
		<option value="">-SELECT-</option>
		<?php 
			$result = $db->query("SELECT LEVEL FROM income_level");
			for ($i=0; $i < $result->num_rows; $i++) { 
				echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
			}
		?>
	</select>
	<span>Religion</span>
	<select required name="religion">
		<option value="">-SELECT-</option>
		<?php 
			$result = $db->query("SELECT DENOMINATION FROM religion");
			for ($i=0; $i < $result->num_rows; $i++) { 
				echo "<option value=\"".($i+1)."\">".$result->fetch_row()[0]."</option>";
			}
		?>
	</select>
	*/ ?>
	<button class="logInButton signUpSubmit">Log In</button>
	<input class="signUpSubmit" type="submit" value="Sign Up">
</form>