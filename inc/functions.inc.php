<?php
function stickyText($name){
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		if (!empty($_POST[$name])){
			echo $_POST[$name];
		}
	}
}
?>