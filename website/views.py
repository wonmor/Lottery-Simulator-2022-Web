from email.policy import default
from random import Random
from flask import Blueprint, render_template, request, session, jsonify

# from flask import current_app as app

import configparser

import json

from website.extensions import db

from .models import PlayerCurrency, RandomSet

# Import the config.cfg file and read the default value (starting point) of the game currency
config = configparser.ConfigParser()

# Get the absolute path of the CFG file by doing os.getcwd() and joining it to config.cfg
cfg_path = 'website/config.cfg'

bp = Blueprint('main', __name__)

# Whether user cookies will be collected or not
cookiesAvail = True

# Read the CFG file
config.read(cfg_path)

# Fix the 'failed to load' error!
try:
    default_count = config.getint("default", "NUM_OF_NUMS")
    default_coins = config.getint("default","MONEY")
except:
    print('CFG file failed to load twice!')


@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        allow_cookies = request.form.get("allow-cookies")
        decline_cookies = request.form.get("decline-cookies")

        session.clear()

        if allow_cookies == 'allow' and decline_cookies != 'decline':
            cookiesAvail = True
        
        if decline_cookies == 'decline' and allow_cookies != 'allow':
            cookiesAvail = False

    return render_template("home.html")

@bp.route('/about')
def about():
    session.clear()
    return render_template("about.html")

@bp.route('/game', methods=['GET', 'POST'])
def game():
    if request.method == 'POST':
        # Clear the session
        session.clear()
        # Get all the user input values from game.js
        player_name = json.loads(request.form['nickname'])
        player_range = json.loads(request.form['range']).split(' ') # player_range[0] => min value, player_range[1] => max value
        player_draws = json.loads(request.form['draws'])
        # Define a random list object (instantiating a class located in models.py)
        random_set = RandomSet(player_range[0], player_range[1], player_draws)
        # Create a random list by generating arbitrary values
        random_set.generate()
        # Convert the generated random list (Python) into JSON-compatible string, so we can hand it over to game.js
        random_set_json = json.dumps(random_set.current_set)

        # INTERACTION BETWEEN JAVASCRIPT AND PYTHON (FLASK) USING AJAX AND JSONIFY: https://ayumitanaka13.medium.com/how-to-use-ajax-with-python-flask-729c0a8e5346
        # HOW PYTHON-JSON CONVERSION WORKS USING THE JSON MODULE: https://www.w3schools.com/python/python_json.asp

        
    return render_template("game.html")

# AJAX METHOD: https://ayumitanaka13.medium.com/how-to-use-ajax-with-python-flask-729c0a8e5346

# WHAT IS CURRENT_APP? LINK: https://flask.palletsprojects.com/en/2.0.x/appcontext/
# cd .. // go to the upper directory

# requirements.txt => # pip3 install -r requirements.txt to install the files

# COOKIES => WILL BE USED TO SKIP ENTER THE NAME STAGE IN SETUP!
# ADD DIFFICULY INDICATOR DEPENDING ON THE SCALE OF THE RANGE, AND SEPERATE THE LEADERBOARD BY DIFFICULTY LEVEL (EASY, MODERATE, HARD)