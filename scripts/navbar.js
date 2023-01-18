//Wait for document to load 
$(document).ready(function () {

    //handle the hovering events for the nav buttons
    $navLinks = $('.nav_link a, .log_in a');
    $navLinks.hover(function () {
        //When button is hovered
        $(this).css(
            {"color":"yellow",
            "border-bottom":"solid yellow",        
            "font-size":"1.4vw",
            "transition":"500ms",});
        }, function () {
        //When button is no longer hovered
        $(this).css(
            {"color":"#793937",
            "border":'none',
            "font-size":"1.2vw",});
        }
    );
    
    //handle the log in click so that opens to log in in a new window    
    $('.log_in a').click(function (e) { 
        e.preventDefault();
        let options = 'statusbar=no,height=400,width=800';
        window.open('login.html', 'admin', options);
    });

});
