
$(document).ready(function(){
    //Create an initial count variable
    // var addTrain = 0;

    //Initial Values 
    var name = "";

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function() {
        //don't refresh page
        event.preventDefault();
        
        //add 1 to clickCounter
        // addTrain++;

        //logic for storing and retrieving the most recent user
        name = $("#train-input").val().trim();

        // refers to root object Firebase 
        //firebase.database
        database.ref().push({
            // click count is created as a key on database
            //key can be called anything
            // when setting I am telling db 
            // clickCount: addTrain
            name:name,
        });


        //we are listening to changes in value anywhere in database run this function
        database.ref().on("value",function(snapshot) {

            //callback function
            //if you try to access snap we'll get a promise
            //to get the object we use snapshot.val
            console.log(snapshot.val());
            console.log(snapshot.val().name);

            //click counter from database
            // dbClickCount = snapshot.val().clickCount;

            //store info and others can access info
            //change HTML to reflect
            $("#name-display").text(snapshot.val().name);

            // addTrain = dbClickCount;

            //catches an error or exception
        }, function(errorObject) {
            console.log("The read failed: " + 
            errorObject.code);
        });

        //Get the to-do (write-train) value from the text box and store it in a var
        var writeTrainTask = $("#write-train").val().trim();

        //variable that will hold a <p> tag
        var trainItem = $("<p>");
        //give var id in following form where number is equal to addTrain count
        trainItem.attr("id", "item-" + addTrain);
        //append the writeTrainTask value as text to the p element 
        trainItem.append("" + writeTrainTask);  

        //create button with checkbox
        var toDoDone = $("<button>");

        toDoDone.attr("data-to-do", addTrain);
        toDoDone.addClass("checkbox");
        toDoDone.append("✓");

        //append t train item
        trainItem = trainItem.prepend(toDoDone);    

        // add to do item to to-do div
        $("#place-train").append(trainItem);

        //clear textbox when finished
        $("write-train").val("");

        //add addTrain count
        addTrain++;
    });

    $(document.body).on("click", function(){
        var addTrainNumber =$(this).attr("data-to-do");
    })

}); 