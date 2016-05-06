<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test Connections and Queries</title>
</head>
<body>
	<?php 
try {
	require_once 'inc/connection.inc.php';
	$keys = [];
	$values = [];
	foreach (($db->query("SELECT * FROM user")->fetch_object()) as $key => $value) {
		if ($key != "ID"){
			array_push($keys, $key);
			array_push($values, "'".$value."'");
		}
		echo "<br>Key: ".$key." /// Value: ".$value;
	}
	$keys = implode(", ", $keys);
	$values = implode(", ", $values);
	if ($db->query("INSERT INTO user ($keys) VALUES ($values)")){
		echo "<br>Yeppers!";
	} else{
		echo "<p class=\"adminError formError\">Error description: " . mysqli_error($db) . "</p>";
	}
} catch (exception $e){
	$error = $e->getMessage();
}

?>

</body>
</html>