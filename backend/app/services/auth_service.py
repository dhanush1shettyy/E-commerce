from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.security import get_password_hash, verify_password

def create_new_user(user_in: UserCreate, session: Session) -> User:
    # Check if user already exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "EMAIL_EXISTS", "message": "Email already registered"}
        )
        
    hashed_password = get_password_hash(user_in.password)
    db_user = User(
        name=user_in.name,
        email=user_in.email,
        password_hash=hashed_password,
        date_of_birth=user_in.date_of_birth
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def authenticate_user(user_login: UserLogin, session: Session) -> User:
    statement = select(User).where(User.email == user_login.email)
    user = session.exec(statement).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "USER_NOT_FOUND", "message": "Incorrect email or password"}
        )
        
    if not verify_password(user_login.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INCORRECT_PASSWORD", "message": "Incorrect email or password"}
        )
        
    return user
