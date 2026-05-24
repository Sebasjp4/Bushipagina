from pydantic import BaseModel, EmailStr, field_validator, ValidationInfo, ConfigDict
from typing import Optional
from datetime import date

# --- 1. REGISTRO ---
class AtletaCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str
    conf_password: str
    fecha_nacimiento: date 
    peso_actual: Optional[float] = None
    grado_cinturon: Optional[str] = "Blanco"

    @field_validator('conf_password')
    @classmethod
    def passwords_match(cls, v: str, info: ValidationInfo):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Las contraseñas no coinciden')
        return v

# --- 2. PERFIL (Lo que le devolvemos al frontend sin la contraseña) ---
class AtletaOut(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    peso_actual: Optional[float] = None  # <--- Faltaba esto
    grado_cinturon: Optional[str] = None
    puntos_ranking: int
    es_entrenador: bool

    model_config = ConfigDict(from_attributes=True)

class AtletaUpdate(BaseModel):
    # Usamos Optional porque el Sensei podría querer cambiar solo los puntos y no el cinturón
    grado_cinturon: Optional[str] = None
    puntos_ranking: Optional[int] = None
    peso_actual: Optional[float] = None
    es_entrenador: Optional[bool] = None

# --- 3. LOGIN Y TOKEN ---
class AtletaLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class AtletaResponse(BaseModel):
    id: int
    nombre: str
    email: str
    peso_actual: Optional[float] = None
    grado_cinturon: Optional[str] = None
    es_entrenador: bool
    puntos_ranking: int
    
    model_config = ConfigDict(from_attributes=True)