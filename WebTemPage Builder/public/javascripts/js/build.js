$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
   });

   $('#sidebarCollapse').on('click', function () {
       // open or close navbar
       $('#sidebar,#content').toggleClass('active');
       // close dropdowns
       $('.collapse.in').toggleClass('in');
       // and also adjust aria-expanded attributes we use for the open/closed arrows
       // in our CSS
       $('a[aria-expanded=true]').attr('aria-expanded', 'false');
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
    alert("複製成功");
    return false;
  });

});