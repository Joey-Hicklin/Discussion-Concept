<?php

// set working page, unless last page was the signUp page
if (empty($_SESSION['workingPage'])){
	$_SESSION['workingPage'] = "/php2/Final%20Project%20-%20Discussion%20App/main_topic.php";
	
} elseif (strpos($_SERVER['REQUEST_URI'], 'sign_up') === false){
		$_SESSION['workingPage'] = $_SERVER['REQUEST_URI'];
}

// set logged out cookie by default
if (!isset($_COOKIE['loggedIn'])){
	setcookie('loggedIn',0,time()+86400*30);
}
?>
