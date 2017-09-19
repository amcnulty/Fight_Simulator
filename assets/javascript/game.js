// Star Wars Fight Simulator 2017
// By: Aaron Michael McNulty
// Monkey Stomp Games 2017
//
// All rights reserved
if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    var $title = $("#title");

    (function() {
        // alert("Window Height: " + $(window).height() + "\nDocument Height: " + $(document).height());
        // $title.css({bottom: -$title.height() + "px", transform: "rotateX(20deg) translateZ(0)"});
        // $title.animate({bottom: $(window).height(), transform: "rotateX(25deg) translateZ(-2500px)"}, 3000, "linear");
    })();

}