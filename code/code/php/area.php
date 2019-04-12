<?php
	//添加评价
	if(!empty($_POST['username']) && !empty($_POST['title'])){
		$username = $_POST['username'];
		$title = $_POST['title'];
		$dataArray = array("title"=>$title,"username"=>$username);  //将获取到的内容添加到数组
		$jsonStr = json_encode($dataArray);
		echo $jsonStr;
	}
?>