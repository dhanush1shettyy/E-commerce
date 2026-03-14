from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.schemas.user_schema import UserCreate, UserLogin, UserResponse, Token, ErrorResponse
from app.services.auth_service import create_new_user, authenticate_user
from app.utils.security import create_access_token
from app.database.db import get_session

router = APIRouter()

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED, responses={400: {"model": ErrorResponse}})
def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    try:
        user = create_new_user(user_in, session)
        access_token = create_access_token(data={"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer", "user_name": user.name}
    except HTTPException as e:
        raise e
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )

@router.post("/signin", response_model=Token, responses={401: {"model": ErrorResponse}})
def signin(user_login: UserLogin, session: Session = Depends(get_session)):
    try:
        user = authenticate_user(user_login, session)
        access_token = create_access_token(data={"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer", "user_name": user.name}
    except HTTPException as e:
        raise e
