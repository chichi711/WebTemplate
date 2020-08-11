
//  輸入框文字效果

$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
});
$(".txtb input").on("blur", function () {
    if ($(this).val() == "")
        $(this).removeClass("focus");
});

// function autoinput (type) {
$(".tip").hide();
$(".tip2").hide();
$(".tip3").hide();
function checkpas3() {//失去焦點
    var pas4 = document.getElementById("uNameTextBox").value;
    if (pas4 == "")
        $(".tip3").show();
    else
        $(".tip3").hide();
}
function checkpas2() {
    var pas3 = document.getElementById("EmailTextBox").value;
    if (pas3 == "")
        $(".tip2").show();
    else
        $(".tip2").hide();
}
function checkpas1() {//失去焦點
    var pas1 = document.getElementById("uPwdTextBox").value;
    var pas2 = document.getElementById("repassword").value;
    if (pas1 != pas2 && pas2 != "")
        $(".tip").show();
    else
        $(".tip").hide();
}
function checkpas() {
    var pas1 = document.getElementById("uPwdTextBox").value;
    var pas2 = document.getElementById("repassword").value;

    if (pas1 != pas2) {
        $(".tip").show();
    } else {
        $(".tip").hide();
    }
}

$("#okButton").click(function () {
    var pas3 = document.getElementById("uPwdTextBox").value;
    var pas4 = document.getElementById("repassword").value;
    var pas1 = document.getElementById("uNameTextBox").value;
    var pas2 = document.getElementById("EmailTextBox").value;
    if (pas1 == "" || pas2 == "") {
        alert("請輸入資料");
        return false;
    } else if (pas3 != pas4) {//當兩個密碼不相等時則顯示錯誤資訊
        alert("兩次輸入的密碼不一致！");
        return false;
    }


    var newItem = {
        uName: $("#uNameTextBox").val(),
        Email: $("#EmailTextBox").val(),
        uPwd: $("#uPwdTextBox").val()
    };

    $.ajax({
        type: "post",
        url: "/user",
        data: newItem
    })
    window.location.href = window.location.origin + '/user/login';
})

// }