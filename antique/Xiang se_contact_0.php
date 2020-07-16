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
    echo "資料庫選擇成功";
}
INSERT INTO content (kind,name,cot) VALUES('','','')
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
    echo"新增成功";
}else{
    echo"錯誤".$sql."<br>" . mysqli_error($db_link);
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

    <div class="title ">


        <div class="tit">
            <!-- 標題和LOGO -->
            <p>
                <a href="Xiang se.html" id="logo"><img src="image/Xiang se/xiang_logo.jpg" width="100px" alt=""></a>
            </p>
            <h1>XIANG SE</h1>
        </div>



        <!-- 選單 -->
        <nav class="navBar">
        <ul>
                <li>
                    <h5><a href="Xiang se_maincourse.html">SPECIALTY</a></h5>
                </li>
                <li>
                    <h5><a href="">MENU</a></h5>
                </li>

                <li>
                    <h5><a href="Xiang se_about.html">ABOUT</a></h5>
                </li>
                <li>
                    <h5><a href="Xiang se_contact.html">CONTACT</a></h5>
                </li>
            </ul>
        </nav>
    </div>



    <div class="container content">
        <div class="row">
            <div class="col-12 col-md-7 cot1"><img src="image/Xiang se/xiang_01.jpg" class="img-fluid cot2"></div><br>
            <div class="col-12 col-md-4 cot1">

                <h4>XIANG SE</h4>

                <h4>簡介</h4><br>
                <p>香色在古老的從前即是形容膚色膚色是本質的顏色它樸拙原始人味有溫度那是食物原來的模樣
                </p>

                <br>

            </div>

        </div>


    </div>

    <footer>
        <div class="footerBar">
            <div class="container d-flex">
                <table>


                    <ul>

                        <li>
                            <a href="Xiang se.html"></a><img src="image/Xiang se/xiang_logo.jpg" width="100px" alt=""></a>
                        </li>


                    </ul><br>
                    <ul>
                        <li>
                            <h5>MEALS</h5>
                        </li>
                        <li>前菜</li>
                        <li>湯品</li>
                        <li>主餐</li>
                        <li>甜點</li>

                    </ul><br>
                    <ul>
                        <li>
                            <h5>DRINKS</h5>
                        </li>
                        <li>酒</li>
                        <li>果汁</li>

                    </ul><br>
                    <ul>
                        <h5>Xiang se</h5>
                        <li>聯絡我們</li>
                        <li>關於我們</li>

                    </ul>


                </table>
            </div>
        </div>


    </footer>

</body>


</html>


