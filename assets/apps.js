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

        //logic for storing and retrieving the most recent user input
        //grab values from text boxes
        var train = $("#train-input").val().trim();
        var trainDest= $("#destination-input").val().trim();

            //creat local temporary object for holding train data
            // click count is created as a key on database, key can be called anything
            // var newTrain = {
            //     train:train
            // };

        // refers to root object Firebase 
        database.ref().push({
            train: train,
            trainDest:trainDest
            //add date: 
            // dateAdded:firebase.database.ServerValue.TIMESTAMP
        });

        //clears text-boxes
        $("#train-input").val("");
        $("#destination-input").val("");
    });

        //we are listening to changes in value anywhere in database run this function
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
            
            //storing in var for covenience
            var sv = snapshot.val();

            //callback function
            //if you try to access snap we'll get a promise
            //to get the object we use snapshot.val
            // console.log(snapshot.val());
            console.log(sv.train);

            //store info and others can access it
            //change HTML to reflect
            $("#train-display").text(sv.train);

            //catches an error or exception
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });
