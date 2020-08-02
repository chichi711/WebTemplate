$(function() {

    $("#SMALL img").click(function() {

        let N = $(this).attr("id").substr(2);

        $("#BIG").attr("src", "image/Xiang se/xiang_duck" + N + ".jpg");

    });

    // $(window).scroll(function() {
    //   var scrollVal = $(this).scrollTop(); //捲動


    //   if (scrollVal > 100) {
    /* 滾動的物件捲動 > 100 就觸發。*/
    // $("#logo").slideUp(100);  上滑
    //     $(".title").addClass("active");
    //   } else {
    // $("#logo").slideDown(100); 下滑
    //      $(".title").removeClass("active"); //刪掉
    //   }
    //  });
    //  var x = 0

    setInterval(function() {
        if (x == 3) {
            x = 0
            $(".cot4").find("img").eq(x).addClass("change");
            $(".cot4").find("img").eq(x + 3).removeClass("change");

        } else {

            $(".cot4").find("img").eq(x + 1).addClass("change");
            $(".cot4").find("img").eq(x).removeClass("change");
            x++
        }

        // $(".cot4").find("img").eq(x + 1).addClass("change");
        // $(".cot4").find("img").eq(x).removeClass("change");

    }, 3500);


    //換圖片

});


//首頁字滑入

$(document).ready(function() {

    /* Every time the window is scrolled ... */
    $(window).scroll(function() {

        /* Check the location of each desired element */
        $('.hideme').each(function(i) {

            let bottom_of_object = $(this).offset().top + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass("change1");
            }
        });
        $('.hideme2').each(function(i) {

            let bottom_of_object = $(this).offset().top + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).addClass("change3");
            }
        });
    });
});




//大圖頁變動
$(document).ready(function() {

    $('.hideme1').addClass("change2");
    $('.hideme3').addClass("change2-1");
});

