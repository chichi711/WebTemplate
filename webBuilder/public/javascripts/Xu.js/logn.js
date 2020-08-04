
//  輸入框文字效果

$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
});
$(".txtb input").on("blur", function () {
    if ($(this).val() == "")
        $(this).removeClass("focus");
});

function autoinput (type) {
    if(type == 'sign up') {
        let num = 0;
        let value = ['yoru', 'yoru123@gmail.com', 'qqq', 'qqq'];
        $('form input:not(:last-child)').each( function () {
            $(this).addClass("focus");
            $(this).val(value[num]);
            num++;
        });
    }
    if(type == 'sign in') {
        let num = 0;
        let value = ['yoru123@gmail.com', 'qqq'];
        $('form input:not(:last-child)').each( function () {
            $(this).addClass("focus");
            $(this).val(value[num]);
            num++;
        });
    }
}
$(".tip").hide();
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
    if (pas3 != pas4) {
        alert("兩次輸入的密碼不一致！");
    }else{
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
    }
})