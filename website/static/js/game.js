// TO DO: IMPLEMENT THE [WHETHER MATCH OR NOT DETERMINER] THINGY ON THE SERVER SIDE INSTEAD OF THE CLIENT SIDE FOR ANTI-CHEAT PURPOSES!
let increase_count_avail = true;
let skip_random_gen = false;
let check_onclick_init = false;
let resolve_internet_connection = false;

var counter = 0; // Button counter

var dict = {
    'name': 0,
    'range': 1,
    'draws': 2,
};

var answers = new Array(); // Array for storing all the answers

var random_set_json = new Array(); // Array for storing the computer-generated random set of numbers

// Execute a function when the user releases a key on the keyboard => NEEDS FIX! DOESN'T WORK!
$(document).ready(function() {
    $("#name").keypress(function(event) {
        console.log("Entered the even listener - input field - to detect enter key")
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector("#button").click();
            console.log('ENTER');
        }
        // return false;
    });
});


// This function runs when the form is submitted... ('next' button is clicked)
function onClickEvent() {
    $(document).ready(function() {
        // Define all the elements by their ID...
        const input = document.getElementById("name");
        const warning = document.getElementById("warning");
        const guide_text = document.getElementById("guide-text");
        const guide_text_2 = document.getElementById("guide-text-2");
        const array_renderer = document.getElementById("array-renderer");
        const numbers_list = document.getElementById("numbers-list");
        const button = document.getElementById("submit");

        check_onclick_init = true;

        // When no value is entered in the input, throw an error message...
        if (document.forms['frm'].name.value === "") {
            warning.style.display = 'block';
            // Give an exception to the case when counter = 3: skip the random number generation process (In case the user guesses the number wrong and tries again, do NOT reset the random number set)
            if (counter == 3) {
                warning.innerHTML = 'PLEASE ENTER THE VALUES, WILL YOU?'
                skip_random_gen = true
            }
        } else {
            var input_value = input.value.toString().trim(); // trim() removes whitespaces from both ends of a string
            warning.style.display = 'none';
            console.log("counter = " + counter);
            console.log("input_value = " + input_value);
            // Below is a user input reading logic that determine if the input value exceeds the limitations depending on the type of the question which is determined by the total number of button presses...
            if (counter == 0) {
                // Check if input_value is a number or a string; if it's a number deny the request...
                if (isNaN(input_value.replace(' ', '')) == true) {
                    answers.push(input_value);
                    increase_count_avail = true;
                } else {
                    warning.style.display = 'block';
                    warning.innerHTML = "YOUR NAME, NOT YOUR SOCIAL INSURANCE NUMBER."
                    increase_count_avail = false;
                }

            } else if (counter == 1) {
                const max_and_min = input_value.split(" ")
                const max = max_and_min[0]
                const min = max_and_min[1]
                    // Minimum value has to be bigger than or equal to 0, but smaller than 80. Maximum value has to be bigger than zero but smaller or equal to 80. If more than two values are entered by the user, returns error.
                if ((min >= -1 && min <= 99) && (max >= 0 && max <= 100) && max_and_min.length <= 2) {
                    answers.push(input_value);
                    increase_count_avail = true;
                } else {
                    warning.style.display = 'block';
                    warning.innerHTML = "TOLD YOU NOT TO GO CRAZY!"
                    increase_count_avail = false;
                }
            } else if (counter == 2) {
                if (input_value >= 1 && input_value <= 10) {
                    answers.push(input_value);
                    increase_count_avail = true;
                } else {
                    warning.style.display = 'block';
                    warning.innerHTML = "TOLD YOU NOT TO GO CRAZY!"
                    increase_count_avail = false;
                }
                // If the cases above are not being met just append the value into the array without making exceptions or setting limitations...
            } else {
                answers.push(input_value);
                increase_count_avail = true;
            }
            console.log("SAVED ANSWER[i] = " + answers[counter]);
            // Increase the count only if the data entered by the user is within the predetermined limitations by the program...
            if (increase_count_avail == true) {
                counter++;
            }
            document.forms['frm'].name.value = "";
        }
        console.log("SAVED NAME: " + answers[0]);

        // Scene transition when the submit button is pressed once... twice... three times... etc.
        if (counter == 1) {
            console.log("SAVED NAME: " + answers[0]);
            guide_text.innerHTML = "SET THE<br>RANGE OF<br>POSSIBLE<br>NUMBERS";
            guide_text_2.innerHTML = "ENTER THE MINIMUM AND MAXIMUM VALUES... (BELOW 100)";
            input.placeholder = "Enter the values seperated by a space...";
        } else if (counter == 2) {
            guide_text.innerHTML = "HOW MANY<br>DRAWS?";
            guide_text_2.innerHTML = "THE COMPUTER CAN DRAW UP TO 10 NUMBERS!";
            input.placeholder = "Enter the number of draws...";
            skip_random_gen = false;
        } else if (counter == 3) {
            if (skip_random_gen != true) {
                // Sets up the communication channel between Javascript and Python file via AJAX (uses JSON and HTTP) => a better alternative would be SOCKET
                array_renderer.style.display = 'none';
                array_renderer.style.display = 'block';
                numbers_list.innerHTML = 'CALCULATING ALL POSSIBLE PERMUTATIONS...';
                $.ajax({
                    url: '/game',
                    type: 'POST',
                    data: JSON.stringify({ // Make sure you surround the data variable(s) with JSON.stringify's MULTIPLE TIMES to avoid any potential error! Data HAS to be in JSON format.
                        nickname: JSON.stringify(answers[dict['name']]),
                        range: JSON.stringify(answers[dict['range']]),
                        draws: JSON.stringify(answers[dict['draws']])
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(data) {
                        array_renderer.style.display = 'none';
                        console.log("Successful attempt at retrieving the data!");
                        console.log("content of array: " + answers);
                        warning.style.display = 'none';
                        guide_text.innerHTML = "GUESS THE<br>NUMBERS IN A<br>" + answers[dict['draws']] + " * 1 ARRAY!";
                        array_renderer.style.display = 'block';
                        // Parse the JSON file handed over by views.py (set that contains random numbers)
                        console.log("random_set_json: " + data.random_set_json);
                        guide_text_2.innerHTML = 'YOUR (REALISTIC) CHANCES OF WINNING: ' + data.chances;
                        // numbers_list.innerHTML = JSON.parse(data.random_set_json);
                        numbers_list.innerHTML = 'ANSWERS (DEBUG): ' + data.random_set_json;
                        random_set_json = data.random_set_json;
                        input.placeholder = "Enter the values seperated by a space...";
                    },
                    error: function(data) {
                        warning.style.display = 'block';
                        warning.innerHTML = "ERROR WHILE RETRIEVING THE LIST!"
                    }
                });
            }
            console.log("JSONIFIED NAME: " + JSON.stringify(answers[dict['name']]));
            console.log("JSONIFIED RANGE: " + JSON.stringify(answers[dict['range']]));
            console.log("JSONIFIED DRAWS: " + JSON.stringify(answers[dict['draws']]));
        } else if (counter >= 4) {
            // Check if the user guessed all the number right or not...
            const guesses = answers[counter - 1].split(" ").map(Number);
            var random_set = [];

            // Convert JSON array into Javascript array
            for (var i in random_set_json)
                random_set.push(random_set_json[i]);

            console.log(guesses);
            // console.log(random_set);

            // Send an AJAX method to the server in order to determine whether the user got the numbers right or not, NOT on the uesr's side, but on the server's side for security reasons!
            $.ajax({
                url: '/game/guess',
                type: 'POST',
                data: JSON.stringify({ // Make sure you surround the data variable(s) with JSON.stringify's MULTIPLE TIMES to avoid any potential error! Data HAS to be in JSON format.
                    guesses: JSON.stringify(guesses),
                    random_set: JSON.stringify(random_set), // Skipping jsonifying process as it is already in a JSON format...
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data) {
                    if (resolve_internet_connection == true) {
                        warning.style.display = 'block';
                        warning.style.color = 'lightgreen';
                        warning.innerHTML = "INTERNET CONNECTION DETECTED!"
                        resolve_internet_connection = false;
                        var delayInMilliseconds = 2500; // 2.5 seconds

                        setTimeout(function() {
                            //your code to be executed after 2.5 seconds
                            warning.style.display = 'none';
                        }, delayInMilliseconds);
                    }
                    console.log(JSON.parse(data.final_result));
                    if (JSON.parse(data.final_result) == true) {
                        guide_text_2.innerHTML = 'YOU CORRECTLY GUESSED ALL THE NUMBERS!';
                        guide_text_2.style.color = 'lightgreen';
                    } else {
                        guide_text_2.innerHTML = "OOPS! YOU GOT THEM WRONG!";
                        guide_text_2.style.color = 'lightcoral';
                    }
                },
                error: function(data) {
                    warning.style.display = 'block';
                    warning.style.color = 'lightcoral';
                    warning.innerHTML = "CHECK YOUR INTERNET CONNECTION, DARLING?";
                    resolve_internet_connection = true;
                }
            });
        }
        // // Check if the array that stores user input data matches the computer-generated counterpart...
        // if ((guesses.length == random_set.length) && (guesses.join('|') == random_set.join('|'))) {
        //     guide_text_2.innerHTML = 'YOU CORRECTLY GUESSED ALL THE NUMBERS!';
        //     guide_text_2.style.color = 'lightgreen';
        // } else {
        //     guide_text_2.innerHTML = "OOPS! YOU GOT THEM WRONG!";
        //     guide_text_2.style.color = 'lightcoral';
        // TO DO: Add functionality to quit the game (transform the button) AND ALSO update the oops got them wrong/success message at every attempt
        // }
        /*
        } else if (counter >= 5) {
            console.log("Reached count >= 5!")
            button.innerText = "QUIT";
            button.setAttribute("onclick", "window.location.href='/';")
        }
        */

        // WHERE I GOT INSTRUCTIONS FOR AJAX METHOD: https://stackoverflow.com/questions/66939921/problem-sending-data-with-ajax-to-django-server
    });
}
