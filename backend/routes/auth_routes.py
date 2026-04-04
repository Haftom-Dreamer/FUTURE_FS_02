from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from models import db, Admin
import jwt
from config import config

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate input
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Username and password required'}), 400

    # Find admin
    admin = Admin.query.filter_by(username=data['username']).first()

    # Check password
    if not admin or not admin.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    # Create JWT
    payload = {
        'admin_id': admin.id,
        'username': admin.username,
        'exp': datetime.utcnow() + timedelta(hours=4)
    }

    token = jwt.encode(payload, config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token}), 200
