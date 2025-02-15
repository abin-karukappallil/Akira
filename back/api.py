import os
import shutil
from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import sqlite3

SECRET_KEY = "sample"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = FastAPI()
app.mount("/static", StaticFiles(directory=UPLOAD_FOLDER), name="static")
conn = sqlite3.connect('users.db', check_same_thread=False)
cursor = conn.cursor()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS uploads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    file_path TEXT NOT NULL
)
''')
conn.commit()

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    password: str

class LoginForm(BaseModel):
    email: str
    password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(email: str):
    cursor.execute("SELECT email, hashed_password FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    if user:
        return {"email": user[0], "hashed_password": user[1]}
    return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/signup")
def signup(user: UserCreate):
    try:
        hashed_password = pwd_context.hash(user.password)
        cursor.execute("INSERT INTO users (email, hashed_password) VALUES (?, ?)", (user.email, hashed_password))
        conn.commit()
        return {"msg": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")

@app.post("/login", response_model=Token)
def login_for_access_token(form_data: LoginForm):
    user = get_user(form_data.email)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": form_data.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme)
):
    try:
        # Verify token and get user email
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email: str = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")

        # Create unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{datetime.now().timestamp()}{file_extension}"
        file_location = os.path.join(UPLOAD_FOLDER, unique_filename)

        # Save file
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())

        # Save to database
        cursor.execute(
            "INSERT INTO uploads (user_email, file_path) VALUES (?, ?)",
            (user_email, file_location)
        )
        conn.commit()

        return {
            "message": "File uploaded successfully",
            "file_url": f"/static/{unique_filename}"
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))