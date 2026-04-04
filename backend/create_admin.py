from app import app
from models import db, Admin

def create_admin(username, password):
    with app.app_context():
        # Check if the admin already exists
        existing_admin = Admin.query.filter_by(username=username).first()
        if existing_admin:
            print(f"Admin '{username}' already exists.")
            return
        
        # Create a new admin
        new_admin = Admin(username=username)
        new_admin.set_password(password)
        
        # Add and commit to the database
        db.session.add(new_admin)
        db.session.commit()
        print(f"Admin '{username}' created successfully!")

if __name__ == '__main__':
    # You can change these default credentials to whatever you want
    print("Creating admin user...")
    create_admin('admin', 'password123')
