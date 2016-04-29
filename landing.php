<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/style.css">
	<?php
		require "inc/connection.inc.php";
	?>
	<title>Discussion Tests</title>
</head>
<body>
	<a class="link explain" href="#">What is this site?</a>
	<div id="topicSelection">
		<div id="currentTopic">
			<?php 
				$query = "SELECT TOPIC FROM main_topic WHERE QUEUE_NUM=0";
				$result = mysqli_query($dbc,$query);
				echo "<h1>".gettype($result)."</h1>";
				foreach ($result as $array) {
					// echo $topic[0];
					foreach ($array as $topic) {
						echo $topic;
					}
				}
			?>
		</div><!--END OF currentTopic DIV-->
		<a class="link previousTopics" href="#">Previous Discussions</a>
	</div><!--END OF topicSelection DIV-->
	
	<div id="posts">
		<div id="agreePosts" class="postColumn"><span class="postTitle">Agree</span>
			<div class="post">
				<?php 
					$query = "SELECT CONTENT FROM statement JOIN post ON post.ID = statement.POST_ID WHERE post.ID = 1"; //TEMP
					$result = mysqli_query($dbc,$query);
					foreach($result->fetch_all() as $data){
						echo "<div class=\"statement\">" . $data[0] . "</div>";
					}
				?>
			</div><!--END OF post DIV-->
		</div><!--END OF postColumn DIV-->
		<div id="neutralPosts" class="postColumn"><span class="postTitle">Neutral</span></div>
		<div id="disagreePosts" class="postColumn"><span class="postTitle">Disagree</span></div>
	</div>
</body>
</html>