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
if (strpos($_SESSION['workingPage'], 'respond')){
	// $data = eD($data, $_GET['rS']);

	$data = eD($data,'"rS":'.$_SESSION['rS'].',"rT":'.$_SESSION['rT']);
}

$data = ed($data,'"login":'.$_COOKIE['loggedIn']);
$data = "{".$data;
$data .= "}";
echo $data;
?>