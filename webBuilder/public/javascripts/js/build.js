$(document).ready(function () {

    $("#sidebar,#sidebarRight").mCustomScrollbar({
        theme: "minimal"
   });

//    $('#sidebarCollapse').on('click', function () {
//        // open or close navbar
//        $('#sidebar,#content').toggleClass('active');
//        // close dropdowns
//        $('.collapse.in').toggleClass('in');
//        // adjust aria-expanded attributes use for the open/closed arrows in  CSS
//        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
//    });
//    $('#sidebarCollapseRight').on('click', function () {
//        $('#sidebarRight').toggleClass('active');
//        $('.collapse.in').toggleClass('in');
//        $('#content').toggleClass('activeRight');
//        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
//    });

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