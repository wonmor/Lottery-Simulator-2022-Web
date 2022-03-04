#-----------------------------------------------------------------------------
# Name:        Lottery Simulator 2022
# Purpose:     To encourage young people not to gamble on lotteries, as the probablity of correctly guessing the number is infinitemisially low!
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
#-----------------------------------------------------------------------------

# Import the create_app function from __init__.py
from website import create_app

# Define the delegate 'app' as the create_app function on __init__.py located in the folder app
app = create_app()

# When initialized, start the app
if __name__ == '__main__':
    app.run()

#   Go to the app folder to check out the full code! This is only a fraction of what I've written.
# 
#   1. __init__.py // Sets up the Flask microframework (functional approach)
#   2. PlayerCurrency class in models.py // Deals with the in-game currency (object-oriented approach)
#   3. RandomSet class in models.py // Deals with the random set with random numbers, which the computer generated (object-oriented approach)
#   4. views.py // Defines button click events as well as routing different tags that come after the URL (functional approach)

# NOTE: Don't comment every line, just comment major ones!

# pip3 install -r requirements.txt to install the plugins when VENV is newly installed

# Some of the difficulties that I faced: Flask micro web framework is notorious for its difficulties in implementing a many-file structure without using a template generator

# TO DO: USE AMAZON WEB SERVICES TO UPLOAD IMAGES ON HEROKU (BG-IMAGE)