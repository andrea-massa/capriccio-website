$(document).ready(function () {
    /*MANAGES THE TAB WIDGET USED TO ORGANIZE THE DIFFERNT RESERVATIONS BASED ON THE DATE */
    $( "#tabs" ).tabs({
        active: 0,
        heightStyle: 'content',        
    });


    /*GET DATA FROM THE JSON DOCUMENT IN THE DATA FOLDER
    THIS IS WHERE ALL THE INFORMATION ON RESERVATIONS IS LOCATED*/
    $.ajax({
        type: "GET",
        url: "./data/reservations.json",        
        dataType: "JSON",        
        success: function (response) {
            updateTabs(response.reservations);
        }
    });


    /*THIS FUNCTION FILLS UP THE TABS USED BY THE UI WIDGET WITH DATA REGARDING THE RESERVATIONS
    RETRIEVED FROM THE JSON FILE. BASED ON THE DATE OF EACH RESERVATION AND TODAY'S DATE*/
    function updateTabs(reservations){
        //update total number of reservations on top of the document
        $('#total_number_reservations').append(reservations.length);

        //creating the proper variables to store dates and reservations based on those dates
        var today_date = new Date();
        var tomorrow_date = new Date()
            tomorrow_date.setDate(today_date.getDate() + 1);
        var today_reservations = [];
        var tomorrow_reservations = [];
        var other_reservations = [];
        var all_reservations = []

        //This loop sorts the different reservations in each array
        for (let n in reservations){
            let r_date = new Date(reservations[n].date);
            //If reservation is for today, put it in today's array
            if(today_date.toDateString() == r_date.toDateString()){
                today_reservations.push(reservations[n]);
            } 
            //If reservation is for tomorrow, put it in tomorrow's array
            else if(tomorrow_date.toDateString() == r_date.toDateString()){
                tomorrow_reservations.push(reservations[n]);
            }
            //If reservation is for a date longer than today or tomorrow add it to the other reservations array
            else{
                other_reservations.push(reservations[n]);
            }
        }

        //sort today reservations by hour
        sortByHour(today_reservations)   
        //sort tomorrow reservations by hour 
        sortByHour(tomorrow_reservations)
        //sort other reservation by date
        sortByDate(other_reservations)

        //Merge the reservations to all be contained in the all reservations array
        all_reservations = [...today_reservations, ...tomorrow_reservations, ...other_reservations]
    
        //These loops make each array append the reservations to the proper tabs on the HTML
        for (let r in today_reservations){
            $('#today_reservation').append(createReservationNode(today_reservations[r], false));            
        }
        for (let r in tomorrow_reservations){
            $('#tomorrow_reservation').append(createReservationNode(tomorrow_reservations[r], false));
        }
        for (let r in all_reservations){
            $('#all_reservation').append(createReservationNode(all_reservations[r], true));
        }
    }


    /*THIS FUNCTION CREATES THE HTML ELEMENT DOM NODES FOR EACH RESERVATION AND RETURNS IT*/
    function createReservationNode(reservation, all_reservation_tab){
        let $div_reservation;
        //If we are creating the reservations for today or tomorrow we do not need to show the date 
        if(!all_reservation_tab){
            $div_reservation = $(`<div class='reservation'>
            <p class="name"><span>Party Name: </span>${reservation.name}<span></span></p>
            <p class="party_size"><span>Party Size: </span>${reservation.party_size}<span></span></p>
            <p class="time"><span>Time: </span><span>${reservation.time}</span></p>
            <p class="email"><span>Email: </span><span>${reservation.email}</span></p>
            <p class="phone_number"><span>Phone Number: </span><span>${reservation.phone_number}</span></p>
            </div>`);
        }
        //If we are creating the reservations for the all reservation tab, we need to show the date too
        else{
            $div_reservation = $(`<div class='reservation'>
            <p class="name"><span>Party Name: </span><span>${reservation.name}</span></p>
            <p class="name"><span>Date: </span><span>${reservation.date}</span></p>
            <p class="party_size"><span>Party Size: </span>${reservation.party_size}<span></span></p>
            <p class="time"><span>Time: </span><span>${reservation.time}</span></p>
            <p class="email"><span>Email: </span><span>${reservation.email}</span></p>
            <p class="phone_number"><span>Phone Number: </span><span>${reservation.phone_number}</span></p>
            </div>`);
        }
        return $div_reservation
    }


    /*THIS FUNCTION SORTS THE RESERVATIONS BY HOUR*/
    function sortByHour(reservations){
        //using selection sort to sort the array
        for (let i = 0; i < reservations.length; i++){
            if ((reservations[i].time == '12pm') && (i != 0)){
                reservations = swapElements(reservations, i, 0)
            }
            else{
                let min = i;
                for(let j = i+1; j < reservations.length; j++){
                    if(reservations[j].time < reservations[min].time){
                        min = j;
                    }
                }
                if(min != i){
                    swapElements(reservations, min, i);
                }
            }
        }
    }


    /*THIS FUNCTION SORTS THE GIVEN RESERVATION ARRAY BY DATE*/
    function sortByDate(reservations){
        for (let i = 0; i < reservations.length; i++){
            let min = i;
            for(let j = i+1; j < reservations.length; j++){
                if(reservations[j].date < reservations[min].date){
                    min = j;
                }
            }
            if(min != i){
                swapElements(reservations, min, i);
            }
        }
    }

    
    //helper function to swap the elements
    function swapElements(arr, a, b){
        let t = arr[a];
        arr[a] = arr[b];
        arr[b] = t;
        return arr
    }
});