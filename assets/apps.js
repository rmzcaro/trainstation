
$(document).ready(function(){
    // console.log("ya se armo")
    //Create an initial count varible
    var addTrain = 0;

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function(event){

        //add 1 to clickCounter
        addTrain++;
        // refers to root object Firebase 
        //firebase.database
        database.ref().set({
            // click count is created as a key on database
            //key can be called anything
            // when setting I am telling db 
            clickCount: addTrain
        });

        //we are listening to changes in value anywhere in database run this function
        database.ref().on("value",function
        (snapshot){

            //callback function
            //if you try to access snap we'll get a promise
            //to get the object we use snapshot.val
            console.log(snapshot.val());

            $("click-value").text(snapshot.val()
            .clickCount);

            addTrain = snapshot.val().clickCount;
        })

        event.preventDefault();

        //Get the to-do (write-train) value from the text box and store it in a var
        var writeTrainTask = $("#write-train").val().trim();

        //variable that will hold a <p> tag
        var trainItem = $("<p>");
        //give var id in folloing form where number is equal to addTrain count
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
