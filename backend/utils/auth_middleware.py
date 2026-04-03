from flask import request, jsonify
from config import config
import jwt
from functools import wraps 

def token_required(f):
    def wrapper(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Expecting "Bearer <token>"            
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])
            current_admin = data['username']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_admin, *args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper