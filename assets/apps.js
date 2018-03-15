$(document).ready(function(){
    //Create an initial count variable
    // var addTrain = 0;

    var database = firebase.database();

    //Initial Values 
    var train = "";

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function() {
        //don't refresh page
        event.preventDefault();
        
        //add 1 to clickCounter
        // addTrain++;

        //logic for storing and retrieving the most recent user
        train = $("#train-input").val().trim();

        // refers to root object Firebase 
        //firebase.database
        database.ref().push({
            // click count is created as a key on database
            //key can be called anything
            // when setting I am telling db 
            // clickCount: addTrain
            train:train,
        });

    });
        //we are listening to changes in value anywhere in database run this function
        database.ref().on("value", function(snapshot) {

            //callback function
            //if you try to access snap we'll get a promise
            //to get the object we use snapshot.val
            // console.log(snapshot.val());
            console.log(snapshot.val().train);

            //store info and others can access info
            //change HTML to reflect
            $("#recent-train").text(snapshot.val().train);

            //catches an error or exception
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

}); 