$(document).ready(function(){

    var dataRef = firebase.database();

    //Initial Values 
    var train = "";
    var destin = "";
    var ftrain = 0;
    var freq = "";

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function(event) {
        //don't refresh page
        event.preventDefault();

        //logic for storing and retrieving the most recent user input
        //grab values from text boxes
        var train = $("#train-input").val().trim();
        var destin= $("#destin-input").val().trim();
        var ftrain = $("#ftrain-input").val().trim();
        var freq = $("#freq-input").val().trim();
        

            //creat local temporary object for holding train data
            // click count is created as a key on database, key can be called anything
            // var newTrain = {
            //     train:train
            // };

        // refers to root object Firebase 
        // add new train to db
        dataRef.ref().push({
            train: train,
            destin: destin,
            ftrain: ftrain,
            freq: freq,
            //add date:
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        
    });

        //clears text-boxes
        $("#train-input").val("");
        $("#destin-input").val("");
        $("#ftrain-input").val("");
        $("#freq-input").val("");


    //Firebase watcher + intial loader 
    dataRef.ref().on("child_added", function(childSnapshot){

        var csv = childSnapshot.val();

        //log everything that's coming out of snap
        //callback function
        //if you try to access snap we'll get a promise
        //to get the object we use snapshot.val
        // console.log(childSnapshot.val());
        console.log(csv.train);
        console.log(csv.destin);
        console.log(csv.ftrain);
        console.log(csv.freq);
        console.log(csv.dateAdded);

        //list of trains 
        $("full-train-list").append("<div class='well'><span class='train-name'>" + csv.train +
        "</span><span class='destination>" + csv.destin +
        "</span><span class='first-train-time'> "+ csv.ftrain +
        "</span><span class='frequency'> "+ csv.freq + "</span></div>");

           //catches an error or exception
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    })

        //we are listening to changes in value anywhere in database run this function
        firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

            var sv = snapshot.val();

            //store info and others can access it
            //change HTML to reflect
            // $("#train-display").text(sv.train);
            // $("#destin-display").text(sv.destin);
            // $("#traintime-display").text(sv.ftrain); 
            // $("#frequency-display").text(sv.freq); 
            
    });
