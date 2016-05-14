<?php 
session_start();
function eD($data, $newRequest){
	if (!empty($data)){
		$data .= ','.$newRequest;
	} else{
		$data .= $newRequest;
	}
	return $data;
}

$data = "";

//// BEFORE USING SESSION DATA, SET SESSION WITH AJAX UPON BUTTON-CLICK

if (strpos($_SESSION['workingPage'], 'respond')){
	$data = eD($data,'"rS":"'.$_SESSION['rS'].'","rT":"'.$_SESSION['rT'].'","id":"'.$_SESSION['id'].'"');
	// $_SESSION['rS'] = $_GET['rS'];
	// $_SESSION['rT'] = $_GET['rT'];
	// $data = eD($data, '"rS":"0","rT":"S"');
}
$data = eD($data,'"login":'.$_COOKIE['loggedIn']);
$data = "{".$data;
$data .= "}";
echo $data;
?>