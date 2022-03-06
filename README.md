# Lottery Simulator 2022

Developed by **John Seong** in Ontario.

[Launch Application](https://lottery-simulator-2022.herokuapp.com)

```
#-----------------------------------------------------------------------------
# Name:        Lottery Simulator 2022
# Purpose:     To encourage young people not to gamble on lotteries, as the probablity of correctly guessing the number is infinitemisial!
#
# Author:      John Seong
# Created:     25-Feb-2022
# Updated:     06-Mar-2022
#-----------------------------------------------------------------------------
# I think this project deserves a level 4+ because...
#
# Features Added:
#   Game being entirely web-based using the Flask micro web framework
#   Utilization of both functional programming and object-oriented programming
#   Calculate the chances of winning for the sake of learning why gambling is risky
#   After a set of number is entered by the user, the combinations will reset and the program will give completely an arbitrary number set differing from the previous one
#   The user can change the difficulty setting, which will determine the constraint of the possible number set 
#   Not only does it allow user to guess one number at a time, but multiple numbers stored in a dictionary
#   In-game currency system that syncronizes with the SQLAlchemy database, which also generates the player leaderboard
#
# TECHNICAL ASPECTS:
#   Game hosted on a cloud platform Heroku
#   Used jQuery's AJAX for communication between JAVASCRIPT and PYTHON files (via JSON)
#   SERVER SIDE HANDLES ALL THE CALCULATIONS AND RANDOM NUMBER GENERATION PROCESS FOR ANTI-CHEAT PURPOSES; CLIENT SIDES ONLY HANDLES THE ON CLICK RESPONSES
#-----------------------------------------------------------------------------
```

---

### Beta Release 0.6
Currently working on the implementation of **additional** features such as the **leaderboard** and the **in-game currency**. The development process for the **base game** is fully **completed**.

<img width="534" alt="Screen Shot 2022-03-06 at 3 20 44 AM" src="https://user-images.githubusercontent.com/35755386/156915228-2ed4ecf4-2ae6-4fe6-a6ef-f72f8f8f6462.png">

---

# Dependencies

- **Flask** Micro Web Framework
- **SQLAlchemy** Database
- **Bootstrap** Front-End Framework
- **jQuery** Javascript Library

---

A special shoutout to **Jason Li** who provided a degree of assistance while I was dealing with the circular import error!
