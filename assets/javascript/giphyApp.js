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

    })

    //create button based on the array

    function createButton() {

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

        // Constructing a queryURL using the animal name
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
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the gifDiv
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    }
        $(document).on("click", ".button", displayGifInfo);

         createButton();


})
