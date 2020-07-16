


<!-- INSERT INTO content (kind ,name ,cot ,cotimg)VALUES('','','','') -->
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
$kind = $_GET["kind"];

$conn = @mysqli_select_db($db_link,"xiangse");  //為啥要加@
// if(!$conn) {
//     die("失敗");
// }else{
//     echo "";
// }
$kind = $_GET["kind"];
//接收資料
$sql = "SELECT * FROM content where kind ='".$kind."'";
$result = mysqli_query($db_link, $sql);
?>



    <div class="container content">
        <div class="row">
        <?php
    if(mysqli_num_rows($result)>0){
        while($row=mysqli_fetch_assoc($result)){
    // echo "kind".$row["kind"];}
?>
            <div class="col-12 col-md-7 cot1">
                <img src="<?php echo $row["cotimg"]?>" class="img-fluid cot2">
            </div><br>
            <div class="col-12 col-md-4 cot1">
                <h4><?php echo $row["kind"]?></h4>
                <h4><?php echo $row["name"]?></h4><br>
                <p><?php echo $row["cot"]?></p>
            </div>
<?php
  }
 }else{
    echo "0結果";
}
mysqli_close($db_link);
?>
             

        </div>
    </div>

     <!-- <footer> -->
    <footer>
    
    <?php include 'footer.php'; ?>

   </footer>

</body>


</html>
