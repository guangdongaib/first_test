<meta charset="utf8">
<?php
//1、用户注册
if(isset($_POST['user']['password']) && isset($_POST['user']['name']) && isset($_POST['user']['email'])){
  //获取值
  $name=$_POST['user']['name'];
  $password=$_POST['user']['password'];
  $email=$_POST['user']['email'];
  //连接数据库
  $link=mysqli_connect('localhost','zhang','zhangyuxian','jq','3306');
  echo $link?"<script>alert('数据库连接成功')</script>":"<script>alert('数据库连接失败')</script>";
  //设置字符集
  mysqli_set_charset($link,'utf8');
  //执行操作，注册账号
  if(mysqli_query($link,"INSERT INTO information(username,email,password) VALUES('$name','$email','$password')")){
    echo "<script>alert('注册成功');location.href='txt.php'</script>";  
    //注册成功，跳转到txt.php页面将数据库数据添加到txt文件中
    // header("Location:index.html");
    exit;
  }else{
    exit('注册失败，请重新注册');
    header("Location:../register.html");
    exit;
  }
}
?>