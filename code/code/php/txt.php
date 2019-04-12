<?php
//此php是将数据库内容添加到txt文件
header('Content-Type:text/html;charset=utf-8');
$con=mysqli_connect('localhost','zhang','zhangyuxian');
//设置字符集，避免乱码
mysqli_query($con,"set names utf8");
$db=mysqli_select_db($con,'jq');
$sql="select * from information";
$res=mysqli_query($con,$sql);
//循环添加数据库的内容到txt文件
while ($row=mysqli_fetch_array($res)){
    $date=[
        'id'   =>$row['username'],
        't'    =>";"  //在txt文件中用“;”分开
    ];
    file_put_contents('userName.txt',$date,FILE_APPEND);//FILE_APPEND表示在原来的文本上追加文本
}
header("Location:../index.html");
?>