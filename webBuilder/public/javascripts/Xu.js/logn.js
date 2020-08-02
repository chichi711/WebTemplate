
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
        // let num = 0;
        // let value = ['yoru', 'yoru123@gmail.com', 'qqq', 'qqq'];
        // $('form input:not(:last-child)').each( function () {
        //     $(this).addClass("focus");
        //     $(this).val(value[num]);
        //     num++;
        // });
    }
}