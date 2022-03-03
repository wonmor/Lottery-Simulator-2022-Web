// TO DO: MAKE THE BAREBONE APP FIRST AND THEN PRETTIFY IT!
var counter = 0;
// Button counter

function onClickEvent() {
    // Get the input field
    var input = document.getElementById("name");
    var warning = document.getElementById("warning")
    var guide_text = document.getElementById("guide-text")
    var guide_text_2 = document.getElementById("guide-text-2")

    const name_of_input = document.getElementById("name").innerHTML

    if (document.forms['frm'].name.value === "") {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
        counter++;
        document.forms['frm'].name.value = ""
    }

    // Scene transition when the submit button is pressed once... twice... three times... etc.
    if (counter == 1) {
        guide_text.innerHTML = "SET THE<br>RANGE OF<br>POSSIBLE<br>NUMBERS"
        guide_text_2.innerHTML = "DON'T GO CRAZY!"
        input.placeholder = "Enter min. and max. values seperated by a space..."
        $.ajax({
            url: '{{ url_for('
            view.path ') }}',
            type: 'POST',
            data: {
                name: name
            },
            success: function(response) {},
            error: function(response) {}
        });

    } else if (counter == 2) {
        guide_text.innerHTML = "HOW MANY<br>DRAWS?"
        guide_text_2.innerHTML = "IS MURPHY'S LAW REAL?"
        input.placeholder = "Enter the number of draws..."
    } else if (counter == 3) {
        guide_text.innerHTML = "GUESS THE<br>NUMBERS IN A<br>1 * ${draws} ARRAY!"
        input.placeholder = "Enter the values seperated by a space..."
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