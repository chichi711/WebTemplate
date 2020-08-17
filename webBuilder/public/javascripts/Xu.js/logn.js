
//  輸入框文字效果

$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
});
$(".txtb input").on("blur", function () {
    if ($(this).val() == "")
        $(this).removeClass("focus");
});

function autoinput(type) {
    $(".tip").hide();
    $(".nulltip").hide();
    if (type == 'sign up') {
        let num = 0;
        let value = ['chichi', 'chi123@gmail.com', 'qqq', 'qqq'];
        $('form input:not(:last-child)').each(function () {
            $(this).addClass("focus");
            $(this).val(value[num]);
            num++;
        });
    }
    if (type == 'sign in') {
        let num = 0;
        let value = ['chi123@gmail.com', 'qqq'];
        $('form input:not(:last-child)').each(function () {
            $(this).addClass("focus");
            $(this).val(value[num]);
            num++;
        });
    }
}
$(".tip").hide();
$(".nulltip").hide();
function checkpas() {
    var pas1 = document.getElementById("uPwdTextBox").value;
    var pas2 = document.getElementById("repassword").value;
    if (pas1 != pas2 && pas2 != "") {
        $(".tip").show();//當兩個密碼不相等時則顯示錯誤資訊
    } else {
        $(".tip").hide();
    }
}

$("#okButton").click(function () {
    var pas3 = document.getElementById("uPwdTextBox").value;
    var pas4 = document.getElementById("repassword").value;
    if ($('#uNameTextBox').val() == '' || $('#EmailTextBox').val() == '') {
        $(".nulltip").show();
    } else if (pas3 != pas4) {
        $(".nulltip").hide();
        $(".tip").show();
    } else {
        var newItem = {
            uName: $("#uNameTextBox").val(),
            Email: $("#EmailTextBox").val(),
            uPwd: $("#uPwdTextBox").val()
        };

        $.ajax({
            type: "post",
            url: "/user/signup",
            data: newItem
        })
        window.location.href = window.location.origin + '/user/login';
    }
})