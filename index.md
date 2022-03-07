# Lottery Simulator 2022 for Web

### [Launch Application](https://lottery-simulator-2022.herokuapp.com)

- Developed by **John Seong** in Ontario.
- This game was designed to encourage young people not to gamble on lotteries, as the probablity of correctly guessing the number is infinitesimal!

```
# Features Added:
#   Game being entirely web-based using the Flask micro web framework
#   Utilization of both functional programming and object-oriented programming
#   Calculate the chances of winning for the sake of learning why gambling is risky
#   If the values entered by the user go beyond and above the constraints set by the computer in order to not overload the client-server communication, the website will throw an error
#   The user can change the difficulty setting, which will determine the constraint of the possible number set 
#   Not only does it allow user to guess one number at a time, but multiple numbers stored in a dictionary
#   In-game currency system that syncronizes with the SQLAlchemy database, which also generates the player leaderboard
#
# TECHNICAL ASPECTS:
#   Game hosted on a cloud platform Heroku
#   Used jQuery's AJAX for communication between JAVASCRIPT and PYTHON files (via JSON) => ALLOWS MINIMAL AMOUNT OF SCREEN REFRESH
#   SERVER SIDE HANDLES ALL THE CALCULATIONS AND RANDOM NUMBER GENERATION PROCESS FOR ANTI-CHEAT PURPOSES; CLIENT SIDE ONLY HANDLES THE ON CLICK RESPONSES
#   UTILIZATION OF STRING MANIPULATIONS
```

---

### Beta Release 0.6
- Currently working on the implementation of **additional** features such as the **leaderboard** and the **in-game currency**. The development process for the **base game** is fully **completed**.

<img width="559" alt="Screen Shot 2022-03-06 at 5 49 29 PM" src="https://user-images.githubusercontent.com/35755386/156945568-a212681c-f287-4d6d-b169-1c1f071d33f1.png">

---

# Dependencies

- **Flask** Micro Web Framework
- **SQLAlchemy** Database
- **Bootstrap** Front-End Framework
- **jQuery** Javascript Library

---

A special shoutout to [Jason Li](https://github.com/jasonli0616) who provided a degree of assistance while I was dealing with the circular import error!
