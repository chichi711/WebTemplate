<?php
	
	$dbhost = 'localhost';
	$db_username = 'root';
    $db_password = '';
    // $db_name = "xiangse_test"
    $db_name = 'xiangse';
    $db_link = @mysqli_connect($dbhost, $db_username, $db_password);
    
    if(!$db_link) die("失敗");
    mysqli_query($db_link, "SET NAMES utf8");

//錯誤處理


$conn = @mysqli_select_db($db_link,"xiangse");  //為啥要加@
if(!$conn) {
    die("失敗");
}else{
    echo "";
}

//接收資料
$x_name = $_POST["x_name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$pip = $_POST["pip"];
$nuvisvit = $_POST["nuvisvit"];
$peoplenum = $_POST["peoplenum"];
$score = $_POST["score"];
$help = $_POST["help"];

$sql = "INSERT INTO xiangse_test (x_name ,phone ,email ,pip ,nuvisvit ,peoplenum ,score ,help)
VALUES ('$x_name',$phone ,'$email', $pip ,$nuvisvit ,$peoplenum ,$score ,'$help')";

if (mysqli_query($db_link,$sql)){
    echo"";
}else{
    echo"".$sql."<br>" . mysqli_error($db_link);
}
mysqli_close($db_link);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../_css/bootstrap.min.css">
    <script src="../_js/jquery.min.js"></script>
    <script src="../_js/popper.min.js"></script>
    <script src="../_js/bootstrap.min.js"></script>
    <script src="flycan.js"></script>

    <title>Document</title>
</head>
<link rel="stylesheet" href="style.css">
<title>Xiang se</title>

<body>

    <!-- 導覽頁 -->
<?php include 'title.php'; ?>  



    <div class="container content">
        <div class="row">
            <div class="col-12 col-md-7 cot1"><img src="image/Xiang se/xiang_01.jpg" class="img-fluid cot2"></div><br>
            <div class="col-12 col-md-4 cot1">

                <h4>XIANG SE</h4>
                <h4><?php  echo $_POST["x_name"];  ?>您好</h4>
                <h4>感謝您填寫此問卷</h4><br>
                <p>您的支持是我們的動力<br>您的寶貴意見是我們改進的方向。

                </p>

                <br>

            </div>

        </div>


    </div>

     <!-- <footer> -->
     <footer>
    
    <?php include 'footer.php'; ?>

   </footer>

</body>


</html>


