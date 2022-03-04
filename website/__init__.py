from .extensions import db
from flask import Flask

import os


def create_app():
    # Initialize the app
    app = Flask(__name__, instance_relative_config=True)

    # GENERATE REQUIREMENTS.TXT: pip3 freeze > requirements.txt

    from . import views
    app.register_blueprint(views.bp)
    # SETTING UP THE BLUEPRINT TO PREVENT CIRCULAR IMPORT; TUTORIAL: https://stackoverflow.com/questions/23432791/how-to-handle-dynamic-decorators-in-python-easily

    # HOW TO OUTSOURCE SECRET KEY SO THAT IT DOES NOT GET COMMITED TO GITHUB: https://stackoverflow.com/questions/51228227/standard-practice-for-wsgi-secret-key-for-flask-applications-on-github-reposito

    # Load the config
    app.config["SECRET_KEY"]='192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
    # app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY") => FOR DISTRIBUTION PURPOSES (TO HIDE THE API KEY)

    # Add SQLAlchemy database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///players.db'

    register_extensions(app)

    return app


def register_extensions(app):
    # Intialize the database
    db.init_app(app)


# Created a global variable that runs the create_app function, in order to import it from the terminal
app = create_app()

# HOW TO FIX THE CIRCULAR IMPORT ERROR: https://stackoverflow.com/questions/60142047/in-flask-is-it-possible-to-import-views-using-the-create-app-pattern-without-u
# DON'T PUSH PYCACHE, DB, AND VENV - ANY REGENERATIVE FILES SHOULDN'T BE PUSHED!

# STEPS TO GENERATE THE DB FILE
# 1. cd guessing-game-bla-bla
# 2. python3 (on mac, windows: open a python terminal)
# 3. >>> import website
# 4. >>> from website.extensions import db
# 5. >>> from website import app
# 6. >>> db.create_all(app=website.create_app())
# VERY IMPORTANT!!
