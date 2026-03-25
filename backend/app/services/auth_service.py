from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.user_model import User
from app.models.auth_event_model import AuthEvent
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.security import get_password_hash, verify_password


def log_auth_event(
    session: Session,
    *,
    email: str,
    event_type: str,
    success: bool,
    user_id: int | None = None,
    failure_code: str | None = None,
) -> None:
    session.add(
        AuthEvent(
            user_id=user_id,
            email=email,
            event_type=event_type,
            success=success,
            failure_code=failure_code,
        )
    )
    session.commit()

def create_new_user(user_in: UserCreate, session: Session) -> User:
    # Check if user already exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        log_auth_event(
            session,
            email=user_in.email,
            event_type="signup",
            success=False,
            failure_code="EMAIL_EXISTS",
        )
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
    log_auth_event(
        session,
        email=db_user.email,
        event_type="signup",
        success=True,
        user_id=db_user.id,
    )
    return db_user

def authenticate_user(user_login: UserLogin, session: Session) -> User:
    statement = select(User).where(User.email == user_login.email)
    user = session.exec(statement).first()
    
    if not user:
        log_auth_event(
            session,
            email=user_login.email,
            event_type="signin",
            success=False,
            failure_code="USER_NOT_FOUND",
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "USER_NOT_FOUND", "message": "Incorrect email or password"}
        )
        
    if not verify_password(user_login.password, user.password_hash):
        log_auth_event(
            session,
            email=user_login.email,
            event_type="signin",
            success=False,
            user_id=user.id,
            failure_code="INCORRECT_PASSWORD",
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INCORRECT_PASSWORD", "message": "Incorrect email or password"}
        )

    log_auth_event(
        session,
        email=user.email,
        event_type="signin",
        success=True,
        user_id=user.id,
    )
        
    return user
