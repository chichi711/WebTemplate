<?php
	
	$dbhost = 'localhost';
	$db_username = 'root';
	$db_password = 'root';
    $db_name = 'xiangse';
    $db_link = mysqli_connect($dbhost, $db_username, $db_password, $db_name )
//錯誤處理


// $selab = @mysqli_select_db($db_link,"xiangse");
// if(!$selab) {
//     die("失敗");
// }else{
//     echo "成功";
// }


//接收資料
$x_name = $_POST["x_name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$pip = $_POST["pip"];
$nuvisvit = $_POST["nuvisvit"];
$peoplenum = $_POST["peoplenum"];
$scoree = $_POST["score"];
$help = $_POST["help"];

$sql = "INSERT INTO xiangse_test (x_name,phone,email,pip,nuvisvit,peopleum,score,help) VALUES ('$x_name','$phone','$email','$route','$nuvisvit','$peoplenum','$scoree','$help')";
?>


<!-- <!DOCTYPE html>
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
            <-- 標題和LOGO -->
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
                    <h5><a href="">CONTACT</a></h5>
                </li>
            </ul>
    </div>



    <div class="container content">
        <div class="row">
            <div class="col-12 col-md-3 "><img src="image/Xiang se/xiang_wine_04.jpg" class="img-fluid cot2"></div>
            <div class="col-12 col-md-9 cot1 cot3">

                <form class="form-horizontal">
                    <fieldset>

                        <!-- Form Name -->
                        <legend>意見回饋</legend>

                        <!-- 姓名-->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="fname">姓名:</label>
                            <div class="col-md-4">
                                <input id="x_name" name="x_name" type="text" placeholder="" class="form-control input-md">

                            </div>
                        </div>

                        <!-- 聯絡電話-->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="phone">聯絡電話:</label>
                            <div class="col-md-4">
                                <input id="phone" name="phone" type="text" placeholder="" class="form-control input-md">

                            </div>
                        </div>

                        <!-- E-mail-->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="email">E-mail:</label>
                            <div class="col-md-4">
                                <input id="email" name="email" type="text" placeholder="" class="form-control input-md">

                            </div>
                        </div>

                        <!-- 來店管道 -->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="route">來店管道</label>
                            <div class="col-md-4">
                                <label class="radio-inline" for="route-0">
                          <input type="radio" name="route" id="route-0" value="1" checked="checked">
                          親友介紹
                        </label>
                                <label class="radio-inline" for="route-1">
                          <input type="radio" name="route" id="route-1" value="2">
                          網路資訊
                        </label>
                                <label class="radio-inline" for="route-2">
                          <input type="radio" name="route" id="route-2" value="3">
                          經過看到
                        </label>
                                <label class="radio-inline" for="route-3">
                          <input type="radio" name="route" id="route-3" value="4">
                          其他管道
                        </label>
                            </div>
                        </div>

                        <!--來店次數-->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="nuvisvit">來店次數:</label>
                            <div class="col-md-4">
                                <label class="radio-inline" for="nuvisvit-0">
                          <input type="radio" name="nuvisvit" id="nuvisvit-0" value="1" checked="checked">
                          第1次
                        </label>
                                <label class="radio-inline" for="nuvisvit-1">
                          <input type="radio" name="nuvisvit" id="nuvisvit-1" value="2">
                          2~3次
                        </label>
                                <label class="radio-inline" for="nuvisvit-2">
                          <input type="radio" name="nuvisvit" id="nuvisvit-2" value="3">
                          4~6次
                        </label>
                                <label class="radio-inline" for="nuvisvit-3">
                          <input type="radio" name="nuvisvit" id="nuvisvit-3" value="4">
                          6次以上
                        </label>
                            </div>
                        </div>

                        <!-- 用餐人數 -->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="peoplenum">用餐人數</label>
                            <div class="col-md-4">
                                <label class="radio-inline" for="peoplenum-0">
                          <input type="radio" name="peoplenum" id="peoplenum-0" value="1" checked="checked">
                          1人
                        </label>
                                <label class="radio-inline" for="peoplenum-1">
                          <input type="radio" name="peoplenum" id="peoplenum-1" value="2">
                          2~3人
                        </label>
                                <label class="radio-inline" for="peoplenum-2">
                          <input type="radio" name="peoplenum" id="peoplenum-2" value="3">
                          4人
                        </label>
                                <label class="radio-inline" for="peoplenum-3">
                          <input type="radio" name="peoplenum" id="peoplenum-3" value="4">
                          5人以上
                        </label>
                            </div>
                        </div>

                        <!--整體滿意度-->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="score">整體滿意度</label>
                            <div class="col-md-4">
                                <label class="radio-inline" for="score-0">
                          <input type="radio" name="score" id="score-0" value="1" checked="checked">
                          非常不滿意
                        </label>
                                <label class="radio-inline" for="score-1">
                          <input type="radio" name="score" id="score-1" value="2">
                          不滿意
                        </label>
                                <label class="radio-inline" for="score-2">
                          <input type="radio" name="score" id="score-2" value="3">
                          一般
                        </label>
                                <label class="radio-inline" for="score-3">
                          <input type="radio" name="score" id="score-3" value="4">
                          滿意
                        </label>
                                <label class="radio-inline" for="score-4">
                          <input type="radio" name="score" id="score-4" value="5">
                          非常滿意
                        </label>
                            </div>
                        </div>

                        <!-- 問題建議 -->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="help">問題建議:</label>
                            <div class="col-md-4">
                                <textarea class="form-control" id="help" name="help"></textarea>
                            </div>
                        </div>

                        <!-- Button -->
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="singlebutton"></label>
                            <div class="col-md-4">
                                <button id="singlebutton" name="singlebutton" class="btn btn-primary">送出</button>
                            </div>
                        </div>

                    </fieldset>
                </form>


                <br>

            </div>

        </div>


    </div>

    <!-- <footer> -->
    <footer>
    
     <?php include 'footer.php'; ?>

    </footer>

</body>


</html> -->