$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
   });


   $("#copyBtn").click(function() {
    var name = $(this).attr('name');
    var el = document.getElementById(name);
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    return false;
  });

});