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
	$data = eD($data,'"rS":'.$_SESSION['rS'].',"rT":'.$_SESSION['rT']);
}

$data = eD($data,'"login":'.$_COOKIE['loggedIn']);
$data = "{".$data;
$data .= "}";
echo $data;
?>