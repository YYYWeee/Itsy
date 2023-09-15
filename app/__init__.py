import os
from .config import Config
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from flask_login import current_user, login_user, logout_user, login_required
from flask import jsonify
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.shop_routes import shop_routes
from .api.item_routes import item_routes
from .api.cart_routes import cart_routes
from .api.order_routes import order_routes
from .api.category_routes import category_routes


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



#new
import os
import secrets
from urllib.parse import urlencode

from dotenv import load_dotenv
from flask import Flask, redirect, url_for, render_template, flash, session, \
    current_app, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
    current_user
import requests


app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
app.secret_key = os.environ.get('client_secret') # make sure this matches with what's in client_secret.json

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

print("secret: ", client_secrets_file)

#Flow is OAuth 2.0 a class that stores all the information on how we want to authorize our users
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"],
     #here we are specifing what do we get after the authorization
    redirect_uri="http://localhost:5000/callback"
)


def google_login_is_required(function):
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
app.register_blueprint(category_routes,url_prefix='/api/categories')
# app.register_blueprint(googleauth_routes,url_prefix='/api/google')

app.config['OAUTH2_PROVIDERS'] = {
    # Google OAuth 2.0 documentation:
    # https://developers.google.com/identity/protocols/oauth2/web-server#httprest
    'google': {
        'client_id': os.environ.get('CLIENT_ID'),
        'client_secret': os.environ.get('CLIENT_SECRET'),
        'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
        'token_url': 'https://accounts.google.com/o/oauth2/token',
        'userinfo': {
            'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
            'email': lambda json: json['email'],
        },
        'scopes': ['https://www.googleapis.com/auth/userinfo.email'],
    }
}




db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"]="Content-Type"


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
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
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



# google auth

# 1) We hit this endpoint when sending the initial GET request from our frontend by clicking the Login Button.
# Note that while we clicked a 'Login' Button, this is deceptive!! An oauth flow is typically initiated using an <a href="your oauth initiating endpoint"><button/></a> tag.
# The Button is there just to make things look nice. If you look at the actual code from a frontend SDK, it is ALWAYS an <a> tag!!
# We can correlate this endpoint with the FIRST arrow in our flow chart!!
@app.route("/googlelogin")
def login():
    authorization_url, state = flow.authorization_url()
    print("AUTH URL: ", authorization_url) # I recommend that you print this value out to see what it's generating.
    # Ex: https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=NICE TRY&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&state=A0eZyFD4WH6AfqSj7XcdypQ0cMhwr9&access_type=offline
    # It SHOULD look a lot like the URL in the SECOND or THIRD line of our flow chart!
    # Note that in the auth url above the value 'access_type' is set to 'offline'. If you do not send this, the user will NOT see the Google Login screen!!
    # Additionally, note that this URL does NOT contain the 'code_challenge_method' value NOR the 'code_challenge' that can be seen in our flow chart.
    # This package may have been created BEFORE the official Oauth2 consortium began recommending PKCE even for back channel flows...
    # While implementation details are completely obscured by the method .authorization_url() let's note 2 things here.
    # 1) We ARE generating a random value for the 'state' variable. We save it to the session on the line below to compare later.
    # 2) The authorization URL
    #print("STATE: ", state)
    session["state"] = state
    return jsonify(authorization_url=authorization_url)
    # return redirect(authorization_url) # This line technically will enact the SECOND and THIRD lines of our flow chart.


# After a successful login by our user, Google will send a verification code to the endpoint below.
# Using the verification code, we can request an authorization token from Google as long as we do it before it expires. I think 5 minutes...
# This endpoint is being hit by the 5th line in our flow chart.
@app.route("/callback")
def callback():
    # id_token_from_frontend = request.json.get("token")

    flow.fetch_token(authorization_response=request.url) # This method is sending the request depicted on line 6 of our flow chart! The response is depicted on line 7 of our flow chart.
    # I find it odd that the author of this code is verifying the 'state' AFTER requesting a token, but to each their own!!

    # This is our CSRF protection for the Oauth Flow!
    credentials = flow.credentials


    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    # The method call below will go through the tedious work of verifying the JWT signature sent back with the object from OpenID Connect
    # Although I cannot verify, hopefully it is also testing the values for "sub", "aud", "iat", and "exp" sent back in the CLAIMS section of the JWT
    # Additionally note, that the oauth initializing URL generated in the previous endpoint DID NOT send a random nonce value. (As depicted in our flow chart)
    # If it had, the server would return the nonce in the JWT claims to be used for further verification tests!
    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    # Now we generate a new session for the newly authenticated user!!
    # Note that depending on the way your app behaves, you may be creating a new user at this point...
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"] = id_info.get("email")
    session["last_name"] = id_info.get("family_name")
    session["first_name"] = id_info.get("given_name")
    session["google_id_token"] = credentials._id_token  #new

    user = User.query.filter(User.email == session["email"]).first()
    if(user):
        login_user(user)
        print('user exist')
    else:
        user = User(
            username=session["name"],
            email=session["email"],
            password=session["google_id"],
            first_name=session["first_name"],
            last_name=session["last_name"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
    return {'message': 'Sucessfully use google account log in'}, 201
    # return redirect("/protected_area") # This will send the final redirect to our user's browser. As depicted in Line 8 of the flow chart!


@app.route("/googlelogout")
def logout():
    if 'google_id_token' in session:
        token_to_revoke = session["google_id_token"]
        revoke_url = "https://accounts.google.com/o/oauth2/revoke"
        params = {"token": token_to_revoke}

        try:
            response = requests.get(revoke_url, params=params)
            response.raise_for_status()  # Raise an exception for HTTP errors

            if response.status_code == 200:
                print('Token revoked successfully')
            else:
                print('Token revocation failed with status code:', response.status_code)
        except requests.exceptions.RequestException as e:
            # Handle any request-related errors
            print(f'Token revocation failed: {str(e)}')

        # Clear the session data
        session.pop('google_id', None)
        session.pop('google_id_token', None)
        session.pop('google_refresh_token', None)
        session.pop('name', None)
        session.pop('email', None)
        session.pop('first_name', None)
        session.pop('last_name', None)
    print('@@@@@@',id_token)

    print('Logged out')
    return 'Logged out'

# here
@app.route("/")
def index():
    return "Hello World <a href='/googlelogin'><button>Login</button></a>"

# This is the endpoint that our final redirect is sending the GET request to.
@app.route("/protected_area")
@google_login_is_required
def protected_area():
    return f"Hello {session['name']} , your googleID is->{session['google_id']} ,email is -> {session['email']}, last name is {session['last_name']} token--> { session['google_id_token']}! <br/> <a href='/googlelogout'><button>Logout</button></a>"
    # return



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
