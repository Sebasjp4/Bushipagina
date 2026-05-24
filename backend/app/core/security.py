from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
from typing import Optional

# Configuramos Bcrypt, que es el estándar de la industria para Hashear contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """Convierte la contraseña del atleta en un hash ilegible"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara lo que el usuario escribe con lo que está en la DB"""
    return pwd_context.verify(plain_password, hashed_password)

# configuración para JWT
SECRET_KEY = "your_secret_key_here"  # Cambia esto por una clave secreta fuerte
ALGORITHM = "HS256" # Algoritmo de encriptación
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Tiempo de expiración del token

# Config de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password:str) -> str:
    """Convierte la contraseña del atleta en un hash ilegible"""
    return pwd_context.hash(password)

def verify_password(plain_password:str, hashed_password:str) -> bool:
    """Compara lo que el usuario escribe con lo que está en la DB"""
    return pwd_context.verify(plain_password, hashed_password)

# generador de tokens
def crear_token_acceso(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    
    # Calculamos cuándo vence el token
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
    # 'exp' es una palabra reservada en JWT para la expiración
    to_encode.update({"exp": expire})
    
    # Firmamos el token con nuestra llave secreta
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt