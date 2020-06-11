$(document).ready(function(){
    $('.top-slider').slick({
        prevArrow: $('#prev-top'),
        nextArrow: $('#next-top'),
/*          autoplay: true  */
    });
    $('.client-row').slick({
        prevArrow: $('#client-prev-button'),
        nextArrow: $('#client-next-button'),
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        variableWidth: true,
        autoplay: true
    });
    $('.facilities-container').slick({
        prevArrow: $('#facilities-prev-button'),
        nextArrow: $('#facilities-next-button'),
        speed: 300,
        slidesToShow: 1,
         autoplay: true 
    });
  });
function fileInputter(){
    var fullPath = document.getElementById('input-file').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        $(".consulting-element-with-file").html(filename);
    }
}