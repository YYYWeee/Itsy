import os
from .config import Config
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from flask_login import current_user, login_user, logout_user, login_required

from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.shop_routes import shop_routes
from .api.item_routes import item_routes
from .api.cart_routes import cart_routes
from .api.order_routes import order_routes
from .api.category_routes import category_routes
from .api.like_routes import like_routes


from google.auth.transport.requests import Request
import google.oauth2.credentials

from .seeds import seed_commands


import os
import pathlib
import requests
from flask import Flask, abort
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
# make sure this matches with what's in client_secret.json
app.secret_key = os.environ.get('client_secret')

# to allow Http traffic for local dev
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')

# client_secrets_file = os.path.join(
#     pathlib.Path(__file__).parent, "client_secret.json")

if os.environ.get('FLASK_ENV') == 'production':
    client_secrets_file = '/etc/secrets/client_secret.json'
else:
    client_secrets_file = '/etc/secrets/client_secret.json'
    client_secrets_file = os.path.join(
        pathlib.Path(__file__).parent, "client_secret.json")


if os.environ.get('FLASK_ENV') == 'production':
    redirectUri = "https://itsy.onrender.com/callback"
else:
    redirectUri = "http://localhost:5000/callback"


# Flow is OAuth 2.0 a class that stores all the information on how we want to authorize our users
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email", "openid"],
    # here we are specifing what do we get after the authorization
    # redirect_uri="http://localhost:5000/callback"
    redirect_uri=redirectUri

)
# if os.environ.get('FLASK_ENV') == 'production':
#         if request.headers.get('X-Forwarded-Proto') == 'http':
#             url = request.url.replace('http://', 'https://', 1)
#             code = 301
#             return redirect(url, code=code)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(shop_routes, url_prefix='/api/shop')
app.register_blueprint(item_routes, url_prefix='/api/items')
app.register_blueprint(cart_routes, url_prefix='/api/carts')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(category_routes, url_prefix='/api/categories')
app.register_blueprint(like_routes, url_prefix='/api/likes')


db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
# CORS(app, resources={r"/googlelogin": {"origins": "http://localhost:3000"}})

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        # samesite='Strict' if os.environ.get(
        #     'FLASK_ENV') == 'production' else None,
        samesite='Lax',
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                              app.view_functions[rule.endpoint].__doc__]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static'}
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# Create a backend proxy endpoint in your Flask application
# This endpoint will forward the request to the Google OAuth endpoint, and the response will be passed back to the frontend. This way,
# the OAuth request will be considered as a first-party request, and the cookies will not be blocked.


@app.route("/google-login-proxy")
@cross_origin()
def google_login_proxy():
    # Forward the request to the Google OAuth endpoint

    google_oauth_url = "https://accounts.google.com/o/oauth2/auth"
    params = {
        "response_type": "code",
        "client_id": '5074633217-88os46biabclvh0knvd2d6ir2jlpd1v3.apps.googleusercontent.com',
        "redirect_uri": redirectUri,
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
        "state": session.get("state"),
        "access_type": "offline"
    }
    #  Make the GET request to Google OAuth endpoint
    response = requests.get(google_oauth_url, params=params)

    authorization_url, state = flow.authorization_url()
    session["state"] = state
    print('authorization_url!!!!!!!!!', authorization_url)
    print('state!!!!!!!!!', state)

    # Return the response to the frontend
    # return jsonify({
    #     "url": response.url
    # })
    return jsonify({
        "url": authorization_url
    })


@app.route("/googlelogin")
@cross_origin()
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():

    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(
        session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"] = id_info.get("email")
    session["last_name"] = id_info.get("family_name")
    session["first_name"] = id_info.get("given_name")

    user = User.query.filter(User.email == session["email"]).first()
    if (user):
        login_user(user)
        print('user exist!!!!!!!!!!!!!!!!!')
    else:
        user = User(
            username=session["name"],
            email=session["email"],
            hashed_password='googlelogin',
            first_name=session["first_name"],
            last_name=session["last_name"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)

    if os.environ.get('FLASK_ENV') == 'production':
        return redirect('https://itsy.onrender.com/listings')
    else:
        return redirect('http://localhost:3000/listings')


# @app.route("/callback")
# def oauth_callback():


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/googlelogin'><button>Login</button></a>"


@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']} {session['google_id']}! <br/> <a href='/logout'><button>Logout</button></a>"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
