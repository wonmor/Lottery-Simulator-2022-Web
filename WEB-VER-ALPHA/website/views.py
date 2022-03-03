from flask import Blueprint, render_template, request, session

# from flask import current_app as app

import configparser

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
    count = config.getint("default", "NUM_OF_NUMS")
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
    if request.method == "POST":
        name = request.form.get("name")
        
        session.clear()

    return render_template("game.html")



# WHAT IS CURRENT_APP? LINK: https://flask.palletsprojects.com/en/2.0.x/appcontext/
# cd .. // go to the upper directory

# requirements.txt => # pip3 install -r requirements.txt to install the files