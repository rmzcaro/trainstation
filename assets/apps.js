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
    })

});
