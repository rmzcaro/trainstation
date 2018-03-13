// Make input form including button 
// make divs when new input is created 

$(document).ready(function(){
    // console.log("ya se armo")
    //Create an initial count varible
    var addTrain = 0;

    //on click event associated with to-do function
    //this is the id in HTML
    $("#add-train").on("click", function(event){
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
