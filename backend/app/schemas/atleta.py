from pydantic import BaseModel, EmailStr
from typing import Optional

# Lo que pedimos para crear un atleta (Registro)
class AtletaCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str
    edad: Optional[int] = None
    peso_actual: Optional[float] = None
    grado_cinturon: Optional[str] = "Blanco"

# Lo que devolvemos cuando alguien consulta un perfil (Seguridad)
# ¡Nota que no incluimos el password aquí!
class AtletaOut(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    grado_cinturon: str
    puntos_ranking: int

    class Config:
        from_attributes = True # Esto permite a Pydantic leer modelos de SQLAlchemy