from datetime import datetime
from flask import Blueprint, request, jsonify
from models import db, Admin
import jwt
from config import config


auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    admin = Admin.query.filter_by(username=data['username']).first()
    if admin and admin.check_password(data['password']):
        token = jwt.encode({
            'admin_id': admin.id,
            'username': admin.username
        }, config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401