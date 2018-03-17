$(document).ready(function () {

    var dataRef = firebase.database();

    //Initial Values 
    var train = "";
    var destin = "";
    var ftrain = 0;
    var freq = "";

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function (event) {
        //don't refresh page
        // event.preventDefault();

        //logic for storing and retrieving the most recent user input
        //grab values from text boxes
        var train = $("#train-input").val().trim();
        var destin = $("#destin-input").val().trim();
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
    dataRef.ref().on("child_added", function (childSnapshot) {

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

        //time of first train arrival
        var firstT = csv.ftrain;
        var Freq = csv.freq;

        //time now
        var currentTime = moment();

        //diff arrival of train and current time to find minutes away
        var difTime = moment().diff(moment(firstT), "minutes");

        //time apart
        var tApart = difTime % Freq;

        // time ( in minutes) until the next train arrives
        var tMinToArrive = Freq - tApart;

        //next arrival time 
        var nextTrain = moment().add(tMinToArrive, "minutes");
        var nextTrainActual = moment(nextTrain).format("HH:mm a");

        var newRowTrain = "<tr><td>" + csv.train + "</td><td>" + csv.destin + "</td><td>" + csv.freq + "</td><td>" + csv.nextTrainActual +
            "</td><td>" + csv.tMinToArrive + "</td></tr>"
        $("#full-train-listing tbody").append(newRowTrain);

        //catches an error or exception
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

})

// //we are listening to changes in value anywhere in database run this function
// firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
