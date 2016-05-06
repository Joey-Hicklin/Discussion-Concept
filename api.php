<?php 
session_start();
echo '{"login":'.$_COOKIE['loggedIn'].'}';
?>