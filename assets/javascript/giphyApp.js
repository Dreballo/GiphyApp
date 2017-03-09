$(document).ready(function() {

    //Array for buttons

    var buttonArray = ['car', 'boat', 'bike', 'Jet', 'taxi'];

    //capturing user input for new button
    $("#add-button").on('click', function(event) {

        event.preventDefault();

        var val = $("#name-input").val().trim();
        val.string
        buttonArray.push(val);

        createButton();
        console.log(buttonArray);

        //clears form after submiting
        $('#name-input').val('');

    })

    //create button based on the array

    function createButton() {

        //replaces buttons everytime function is run. prevents duplicates
        $("#addButtons").empty();

        for (i = 0; i < buttonArray.length; i++) {

            var button = $(document.createElement('button'));

            button.attr('data-name', buttonArray[i]);
            button.addClass('button');
            button.text(buttonArray[i]);

            button.appendTo('#addButtons');

        }


    };

    function displayGifInfo() {

        // Grabbing and storing the data-name property value from the button
        var category = $(this).attr('data-name');

        // Constructing a queryURL using the data name
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            category + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .done(function(response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var gifDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var gifImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImage.attr("src", results[i].images.fixed_height_still.url);

                    //adding class to gifImage
                    gifImage.addClass('gif');

                    //adding attributes for animation and pausing
                    gifImage.attr('data-state','still');
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-animate', results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the gifDiv
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    }


    //makes GIF run for all new buttons
    $(document).on("click", ".button", displayGifInfo);


    //creating initial buttons

    createButton();

    //pausing and animating gif

    $(document).on("click", ".gif", function(event) {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


})
