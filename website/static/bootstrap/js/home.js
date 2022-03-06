// document.addEventListener("DOMContentLoaded", function() {
$(document).ready(function() {
    pop_up.style.display = 'none'

    var button = document.querySelector("#decline-cookies");
    // Display the cookie pop-up 4 seconds after the startup => NEEDS FIX! DOESN'T WORK!
    var delayInMilliseconds = 4000; // 4 seconds

    var pop_up = document.getElementById("pop_up");
    pop_up.style.display = 'block'

    setTimeout(function() {
        pop_up.style.display = 'block';
    }, delayInMilliseconds);

    button.addEventListener("click", function onclick(event) {
        pop_up.style.display = 'none'
        event.preventDefault();
    });
});