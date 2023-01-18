$(document).ready(function () {
    //reservation button being hovered
    $('input[type=submit]').hover(function () {
            // over
            $(this).css(
                {"background-color": "#B24845",
                "box-shadow":"none",
                "border-radius":"2px",
                "height": "14vh",
                "width": "50%",
                "transition":"500ms"});            
        }, function () {
            // out
            $(this).css(
                {"background-color": "#793937",
                "box-shadow":"0px 4px 4px rgba(0, 0, 0, 0.25)",
                "border-radius":"10px",
                "height": "10vh",
                "width": "40%"});
        }
    );


    //Manage the date picker widget
    $('#datepicker').datepicker({
        minDate: new Date(),
        maxDate: +14,
    });

    //When the user cicks on submit, validate data and append it to reservations.JSON
    $('#submit_btn').click(function (e) {  
        e.preventDefault();
        if (validateData()){            
            var reservation = parseData();     
            clearData();   
            sendData(reservation);               
        };        

        //validate data
        function validateData(){
            let formValid = true;
            let errors = 'ERROR RESERVATION NOT CREATED: ';
            //make sure name is not empty
            if(!$('#name').val()){                                
                errors += '\nName must not be empty'
                formValid = false;
            }
            //make sure phone number is not empty
            if(!$('#phone_number').val()){        
                errors += '\nPhone number must not be empty'                   
                formValid = false;
            }
            //make sure email is not empty
            if(!$('#email').val()){     
                errors += '\nEmail number must not be empty'                                   
                formValid = false;
            }
            //make sure arrival date is not empty
            if(!$('#datepicker').val()){                
                errors += '\nPlease Select a proper Date'                                   
                formValid = false;
            }
            //make sure arrival time is not empty
            if(!$('#time').val()){                
                errors += '\nPlease Select a proper Time'                                   
                formValid = false;
            }
            //make sure number of people is a number between 2 and 12
            if(($('#num_people').val() < 2) || ($('#num_people').val() > 12)){                                
                errors += '\nParty Size must be between 2 and 12 people'             
                formValid = false;
            }
            if(!formValid){
                alert(errors);
            }
            return formValid;
        }

        //parses the form data to create an object
        function parseData(){            
            return reservation = {
                name : $('#name').val(),
                phone_number : $('#phone_number').val(),
                party_size : $('#num_people').val(),
                email : $('#email').val(),
                date : $('#datepicker').val() + 'pm',
                time : $('#time').val(),                
            }            
        }

        //Clears the data on the form
        function clearData(){
            $.each($('input, select'), function () { 
                 $(this).val('');
            })
            $('#submit_btn').val('Make Reservation');
        }

        //Sends the data to the reservations.JSON file
        function sendData(reservation){
            $.ajax({
                type: "POST",
                url: './data/reservations.json',
                data: JSON.stringify(reservation),
                contentType: "application/json; charset=utf-8",                
                dataType: "json",
                success: function (response) {
                    console.response(response);
                }
            });
        }
    });

});
