<?php 
	$dbc = mysqli_connect("localhost","root","","discussion") OR die('<p>Could not connect to the MySQL Server: ' . mysqli_connect_error() . '</p>');
	mysqli_set_charset($dbc,'utf8');
 ?>