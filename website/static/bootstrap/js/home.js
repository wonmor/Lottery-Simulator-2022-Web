document.addEventListener("DOMContentLoaded", function() {
    // Display the cookie pop-up 4 seconds after the startup => NEEDS FIX! DOESN'T WORK!
    var delayInMilliseconds = 4000; // 4 seconds

    var pop_up = document.getElementById("pop_up");
    disablePopUp()

    setTimeout(function() {
        pop_up.style.display = 'block';
    }, delayInMilliseconds);

    function disablePopUp() {
        pop_up.style.display = 'none'
    }
});