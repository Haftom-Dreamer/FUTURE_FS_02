from flask import Flask
from flask_cors import CORS
from config import config
from models import db
# from routes.auth_routes import auth
# from routes.lead_routes import lead


app= Flask(__name__)
app.config.from_object(config)
db.init_app(app)
CORS(app)

# app.register_blueprint(auth, url_prefix='/auth')
# app.register_blueprint(lead, url_prefix='/leads')

@app.route('/')
def home():
    return 'Welcome to the CRM API!'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)

