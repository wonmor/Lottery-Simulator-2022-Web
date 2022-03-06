// TO DO: MAKE THE BAREBONE APP FIRST AND THEN PRETTIFY IT!
var counter = 0; // Button counter

var dict = {
    'name': 0,
    'range': 1,
    'draws': 2
};

var answers = new Array(); // Array for storing all the answers

function onClickEvent() {
    $(document).ready(function() {
        // Define all the elements by their ID...
        const input = document.getElementById("name");
        const warning = document.getElementById("warning");
        const guide_text = document.getElementById("guide-text");
        const guide_text_2 = document.getElementById("guide-text-2");
        const array_renderer = document.getElementById("array-renderer");
        const numbers_list = document.getElementById("numbers-list");

        // When no value is entered in the input, throw an error message...
        if (document.forms['frm'].name.value === "") {
            warning.style.display = 'block';
        } else {
            var input_value = input.value.toString();
            warning.style.display = 'none';
            console.log("counter = " + counter);
            console.log("input_value = " + input_value);
            answers.push(input_value);
            console.log("SAVED ANSWER[i] = " + answers[counter]);
            counter++;
            document.forms['frm'].name.value = "";
        }
        console.log("SAVED NAME: " + answers[0]);

        // Scene transition when the submit button is pressed once... twice... three times... etc.
        if (counter == 1) {
            console.log("SAVED NAME: " + answers[0]);
            guide_text.innerHTML = "SET THE<br>RANGE OF<br>POSSIBLE<br>NUMBERS";
            guide_text_2.innerHTML = "DON'T GO TOO CRAZY!";
            input.placeholder = "Enter min. and max. values seperated by a space...";
        } else if (counter == 2) {
            guide_text.innerHTML = "HOW MANY<br>DRAWS?";
            guide_text_2.innerHTML = "IS MURPHY'S LAW REAL?";
            input.placeholder = "Enter the number of draws...";
        } else if (counter == 3) {
            $.ajax({
                url: '/game',
                type: 'POST',
                data: JSON.stringify({
                    nickname: JSON.stringify(answers[dict['name']]),
                    range: JSON.stringify(answers[dict['range']]),
                    draws: JSON.stringify(answers[dict['draws']])
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data) {
                    console.log("Successful attempt at retrieving the data!");
                    console.log("content of array: " + answers);
                    warning.style.display = 'none';
                    guide_text.innerHTML = "GUESS THE<br>NUMBERS IN A<br>" + answers[dict['draws']] + " * 1 ARRAY!";
                    array_renderer.style.display = 'block';
                    // Parse the JSON file handed over by views.py (set that contains random numbers)
                    console.log("random_set_json: " + data.random_set_json)
                    numbers_list.innerHTML = JSON.parse(data.random_set_json);
                    console.log("random_set_json = " + random_set_json)
                    input.placeholder = "Enter the values seperated by a space...";
                },
                error: function(data) {
                    warning.style.display = 'block';
                    warning.innerHTML = "ERROR WHILE RETRIEVING THE LIST!"
                }
            });
            console.log("JSONIFIED NAME: " + JSON.stringify(answers[dict['name']]));
            console.log("JSONIFIED RANGE: " + JSON.stringify(answers[dict['range']]));
            console.log("JSONIFIED DRAWS: " + JSON.stringify(answers[dict['draws']]));
        }

        // WHERE I GOT INSTRUCTIONS FOR AJAX METHOD: https://stackoverflow.com/questions/66939921/problem-sending-data-with-ajax-to-django-server

        // Execute a function when the user releases a key on the keyboard => NEEDS FIX! DOESN'T WORK!
        $("#name").keyup(function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.querySelector("#button").click();
            }
        });
    });
}