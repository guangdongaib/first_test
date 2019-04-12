<?php
if(isset($_POST['user']['name']) && isset($_POST['user']['password'])){
	//获取值
	$name=$_POST['user']['name'];
	$password=$_POST['user']['password'];
	//连接数据库
	$link=mysqli_connect('localhost','zhang','zhangyuxian','jq','3306');
	echo $link?"<script>alert('数据库连接成功')</script>":"<script>alert('数据库连接失败')</script>";
	//设置字符集
	mysqli_set_charset($link,'utf8');
	//判断是否存在数据库表
	$result=mysqli_query($link,"SELECT * from information");
	if($result){
		//存在此表，获取所有值
		$a=false;
		while($row=mysqli_fetch_assoc($result)){
			//若用户名和密码正确，则登录成功
			if($row['username']==$name && $row['password']==$password){
				echo '<br>登录成功';
				$a=true;
				echo "<br><br><span style='color:red'>个人信息</span>";
				echo "<br>用户名是：".$row['username'];
				echo "<br>密码是：".$row['password'];
				echo "<br>邮箱是：".$row['email'];
				echo "<br><a href='../index.html'>退出登录，返回首页</a>";
			}
		}
		//若用户名和密码不正确，则登录失败，并退出
		if(!$a){
			echo "<script>alert('账号或者密码错误，登录失败，请重新登录');location.href='../login.html'</script>";
			// header("Location:login.html");
			exit();
		}
	}else{
		exit("不存在此表或查询有误");
	}
}
?>