import bcrypt

def hash_password(password: str) -> str:
    """Hash the password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)
    return hashed_password.decode()

def check_password_hash(password: str, hashed_password: str) -> bool:
    """Check if the password matches the hashed password"""

    return bcrypt.checkpw(password.encode(), hashed_password.encode() if isinstance(hashed_password, str) else hashed_password)

