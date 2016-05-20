<?php
require "inc/connection.inc.php";
session_start();
$userID = $db->query("SELECT ID FROM user WHERE EMAIL='".$_COOKIE['email']."'")->fetch_row()[0];
$mainID = $db->query("SELECT ID FROM main_topic WHERE QUEUE_NUM='0'")->fetch_row()[0];
switch ($_SESSION['rT']) {
	case 'P':
		$replyOf = ", REPLY_POST";
		$replyID = ",'".$_SESSION['id']."'";
		break;
	
	case 'S':
		$replyOf = ", REPLY_STATEMENT";
		$replyID = ",'".$_SESSION['id']."'";
		break;

	default:
		$replyOf = "";
		$replyID = "";
}
////////   SEND DATA TO post TABLE   /////////////////
if($db->query("INSERT INTO post (USER_ID, MAIN_ID, AFFILIATION".$replyOf.") VALUES ('".$userID."','".$mainID."','".$_SESSION['rS']."'".$replyID.")")) {
	echo "POST LINK SUCCESS!!";
	$postID = $db->query("SELECT LAST_INSERT_ID()")->fetch_row()[0];
	
	////////   SEND DATA TO statement TABLE   ////////////////
	$statements = str_ireplace("'", "''",$_POST['postContent']); // escape single quotes for SQL statement
	$statements = explode("~^", $statements); // split into individual statements
	for ($i=0; $i < count($statements); $i++) {
		if ($db->query("INSERT INTO statement (POST_ID, CONTENT) VALUES ('".$postID."','".htmlspecialchars($statements[$i])."')")) {
			echo "\nSTATEMENT ".$i." LINK SUCCESS!!";
		} else{
			echo $db->error;
		}
	}
} else{
	echo $db->error;
}
