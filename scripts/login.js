$(document).ready(function () {

    //Once the log in button is clicked, open up the reservation page
    $('#login_btn').click(function (e) {         
        //Make sure that both the username and password entries are not empty
        if(($('#username').val() != '') && ($('#password').val() != '')){                    
            window.open('reservations_admin.html');               
            window.close(this);
        }
        else{
            alert('Username and/or password are not valid, please try again');
        }        
    });    
});