<?php 
session_start();
require 'inc/connection.inc.php';
$email = $_POST['email'];
$password = $_POST['password'];
if ($db->query("SELECT PASSWORD FROM user WHERE EMAIL='".$email."'")->fetch_row()[0]===$password){
	setcookie('loggedIn',1,time()+86400*30);
	setcookie('email',$email,time()+86400*30);
	header("Location: ".$_SESSION['workingPage']);
	exit;
} else{
	echo "I really need to work on my errors...";
}

?>