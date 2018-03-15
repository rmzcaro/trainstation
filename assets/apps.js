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

            //creat local temporary object for holding train data
            // click count is created as a key on database, key can be called anything
            // var newTrain = {
            //     train:train
            // };

        // refers to root object Firebase 
        database.ref().push({
            train: train
            //add date: 
            // dateAdded:firebase.database.ServerValue.TIMESTAMP
        });

        //clears text-boxes
        //Not sure if needed 
        $("train-input").val("");
    });

        //we are listening to changes in value anywhere in database run this function
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {

            //callback function
            //if you try to access snap we'll get a promise
            //to get the object we use snapshot.val
            // console.log(snapshot.val());
            console.log(childsnapshot.val());

            //store everything into variable
            var trainName = childSnapshot.val().name;

            // train info 
            console.log(trainName);

            //store info and others can access info
            //change HTML to reflect
            $("#recent-train").text(snapshot.val().train);

            //catches an error or exception
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });
