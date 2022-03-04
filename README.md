# Lottery Simulator 2022

Developed by **John Seong** in Ontario.

```
#-----------------------------------------------------------------------------
# Name:        Lottery Simulator 2022
# Purpose:     To encourage young people not to gamble on lotteries, as the probablity of correctly guessing the number is infinitemisial!
#
# Author:      John Seong
# Created:     25-Feb-2022
# Updated:     01-Mar-2022
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
#   Game hosted on a cloud platform Heroku
#   Used AJAX for communication between JAVASCRIPT and PYTHON files (via JSON)
#-----------------------------------------------------------------------------
```

---

### Web Version
Still work in progress! Implementing different features...

[Launch Application](https://lottery-simulator-2022.herokuapp.com)

<img width="574" alt="Screen Shot 2022-03-03 at 12 39 07 AM" src="https://user-images.githubusercontent.com/35755386/156503277-3e560c27-067d-4744-aee5-8f34491125a5.png">

---

# Dependencies

- **Flask** Micro Web Framework
- **SQLAlchemy** Database
- **Bootstrap** Front-End Framework
- **jQuery** Javascript Library

---

A special shoutout to **Jason Li** who provided a degree of assistance while I was dealing with the circular import error!
