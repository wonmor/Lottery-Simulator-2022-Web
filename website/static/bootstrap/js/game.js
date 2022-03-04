// TO DO: MAKE THE BAREBONE APP FIRST AND THEN PRETTIFY IT!
var counter = 0; // Button counter

var dict = {
    'name': 0,
    'range': 1,
    'draws': 2
};

function onClickEvent() {
    // Define all the elements by their ID...
    const input = document.getElementById("name");
    const warning = document.getElementById("warning");
    const guide_text = document.getElementById("guide-text");
    const guide_text_2 = document.getElementById("guide-text-2");
    const array_renderer = document.getElementById("array-renderer");
    const numbers_list = document.getElementById("numbers-list");

    const name_of_input = document.getElementById("name").innerHTML;

    const answers = []; // List for storing all the answers

    // When no value is entered in the input, throw an error message...
    if (document.forms['frm'].name.value === "") {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
        answers.push(document.forms['frm'].name.value);
        counter++;
        document.forms['frm'].name.value = "";
    }

    // Scene transition when the submit button is pressed once... twice... three times... etc.
    if (counter == 1) {
        guide_text.innerHTML = "SET THE<br>RANGE OF<br>POSSIBLE<br>NUMBERS";
        guide_text_2.innerHTML = "DON'T GO TOO CRAZY!";
        input.placeholder = "Enter min. and max. values seperated by a space...";
    } else if (counter == 2) {
        guide_text.innerHTML = "HOW MANY<br>DRAWS?";
        guide_text_2.innerHTML = "IS MURPHY'S LAW REAL?";
        input.placeholder = "Enter the number of draws...";
    } else if (counter == 3) {
        $.ajax({
            url: '{{ url_for(views.submit) }}',
            type: 'POST',
            data: {
                nickname: answers[dict['name']],
                range: answers[dict['range']],
                draws: answers[dict['draws']]
            },
            success: function(response) {
                console.log("Successful attempt at retrieving the data!");
                warning.style.display = 'none';
            },
            error: function(response) {
                warning.style.display = 'block';
                warning.innerHTML = "ERROR WHILE RETRIEVING THE LIST!"
            }
        });
        guide_text.innerHTML = "GUESS THE<br>NUMBERS IN A<br>" + answers[dict['draws']] + " * 1 ARRAY!";
        array_renderer.style.display = 'block';
        // Parse the JSON file handed over by views.py (set that contains random numbers)
        numbers_list.innerHTML = JSON.parse(data.random_set_json);
        input.placeholder = "Enter the values seperated by a space...";
    }
}

// Execute a function when the user releases a key on the keyboard => NEEDS FIX! DOESN'T WORK!
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});