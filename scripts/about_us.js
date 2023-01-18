/*THIS FUNCTION RUNS WHENVER THE DOCUMENT IS READY*/
$(document).ready(function () {


    //Whenever the user presses this button, the reviews are fetched from the YELP API
    $('#getReviewsBtn').click(function (e) { 
        if($('#reviews_container').hasClass('hidden')){
            $('#reviews_container').removeClass('hidden');
        };
        //Remove the current review if there is already any
        if($('#costumers_reviews .para_container').children().length > 1){
            $('#costumers_reviews .para_container div').remove();
        }
        //Display loading for while the request is loading
        createLoadingNode();
        //Make the request to the YELP API
        let reviews = makeRequest()
    });    


    //Hovering effect for the get reviews button
    $('#getReviewsBtn').hover(function () {
            // over
            $(this).css(
                {
                    "background-color": "#F1AD88",
                    "box-shadow": "none",
                    "border-radius": "15px",
                    "transition": "500ms",
                }
            );
        }, function () {
            // out
            $(this).css({
                    "background-color": "#FC766A",
                    "box-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    "border-radius": "10px",
                    "transition": "500ms",
            });
        }
    );


});




/*THIS FUNCTION MAKES A REQUEST TO THE YELP API TO GET THE DATA ABOUT USERS MAKING REVIEWS TO THE RESTAURANT*/
function makeRequest(){
    let businessID = 'capriccio-charlotte';
    let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessID}/reviews`;
    let token = 'Bearer sSAE8hxp8XKKvhlSttoj81seINGjYN9iuDIbZFL6K1A8Z3gkHGXjNTm6clkSZRN4fEmvQRvEroR1ZyjiMS7V8seucML3sRWyecm5jci8ua7IANh1MQGcJAzJeWeCY3Yx';
    console.log('Making a request to ' + url);
    
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain: true,
        headers: {
            "Authorization": token
        },
        //If the request works, update the webpage
        success: function (response) {
            //Remove the loading
            $('.loading').remove();
            //Call the function to render a random review out of the one fetched
            createReviewNode(response.reviews[Math.floor(Math.random() * 3)])
        },
        /*If the response returns an error is proably because of CORS reasons, I am using heroku to go around the
        CORS thing because otherwise it would require back-end programming which I am not capable of. Heroku gives a time limit
        for the requests that can be made. If it's not working is because that time limit has expired, however you can simply ask heroku
        to get more time to send requests so you can look at the functionality of the website */
        error: function (response){
            //Remove the loading
            $('.loading').remove();
            //Display the Error
            createErrorNode(response.status, response.statusText);
        }
    });
}


/*THIS FUNCTION CREATES A LOADING NODE WHICH IS USED TO SHOW A LOADING INDICATOR TO THE HTML*/
function createLoadingNode(){
    $('#costumers_reviews .para_container').append($(`<div class='loading'><h3>Loading...</h3></div>`));    
}


/*THIS FUNCTION CREATES A REVIEW NODE WHICH IS USED TO RENDER THE REVIEW INFORMATION TO THE HTML*/
function createReviewNode(review){
    //Variables containing the data for the review
    let username = review.user.name;
    let rating = review.rating;
    let text = review.text
    
    //Creating HTML elements for the data
    let $review_div = $(`<div class='costumer_review'></div>`);
    $review_div.append($(`<span class='review_profile'>${username}</span>`));
    $review_div.append($(`<p class='review_text'>${text}</p>`));
    $review_div.append($(`<span>${rating}/5</span>`));

    //Appending the data to the HTML
    $('#costumers_reviews .para_container').append($review_div);    
}


/*THIS FUNCTION EXECUTES IF THE REQUEST DOES NOT WORK AND RESERVATIONS CAN'T BE RETRIEVED */
function createErrorNode(errorCode, errorCodeText){
    //Create variables containing data for the error
    let message = '';
    let image =  '';

    //Change how you are warning the user based on the type of error that is causing the API not to work
    if(errorCode == 429){
        message = `You have made too many requests to the server that is why the exernal API is not working`
    }
    else{
        message = `If the request failed it might be because of CORS, I am using heroku to access the API for now.
                    You can make the request work by requesting temporary access to heroku server again.`;
    }
    
    //Create HTML elements for the data
    let $error_div = $(`<div class='error_container'><h3>Error ${errorCode}: ${errorCodeText}</h3></div>`)
    $error_div.append(`<p class='error_message'>${message}</p>`)
    $error_div.append(`<img class='error_image'src='${image}' alt='Image is not displayable right now>`)

    //Appending the div to the HTML
    $('#costumers_reviews .para_container').append($error_div);    
}