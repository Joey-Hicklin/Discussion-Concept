<?php 
session_start();
setcookie('loggedIn',0,time()+86400*30);
setcookie('email','',time()-10);
header("Location: ".$_SESSION['workingPage']);
exit;
?>