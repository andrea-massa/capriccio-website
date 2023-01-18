//Wait for document to load 
$(document).ready(function () {
    
    //managing the slider plugin to create a presentation of the images
    $('.slider').bxSlider({
        controls: false,
        pager: false,
        auto: true,
        pause: 3000,
        autoDirection: 'next'
    });


    //handle the hovering events for when one of the two buttons on the main page is hovered
    $('#button_container .button').hover(function () {
        //When button is hovered
        $(this).css(
            {"background-color":"#F1AD88",
            "box-shadow":"none",
            "border-radius":"10px",
            "height": "60%",
            "width": "30%",
            "transition":"500ms"});
        }, function () {
        //When button is no longer hovered
        $(this).css(
            {"background-color":"#FC766A",
            "box-shadow":"0px 4px 4px rgba(0, 0, 0, 0.25)",
            "border-radius":"20px",
            "height": "50%",
            "width": "25%"});
        }
    );
});