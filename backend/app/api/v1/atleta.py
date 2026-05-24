# 1. Importaciones de FastAPI
from fastapi import APIRouter, Depends, HTTPException, status 
from fastapi.security import OAuth2PasswordBearer # <--- El extractor de tokens
from typing import List
# 2. Base de datos
from sqlalchemy.orm import Session
from app.core.database import get_db

# 3. Importaciones de nuestro proyecto
from app.schemas.atleta import AtletaCreate, AtletaOut, AtletaLogin, Token, AtletaUpdate
from app.crud import atleta as atleta_crud


# 4. Seguridad
from app.core.security import verify_password, crear_token_acceso, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM # Traemos las llaves
from datetime import timedelta
from jose import JWTError, jwt # Para decodificar la manilla

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/atletas/login") # Le decimos dónde está el endpoint de login para que sepa cómo extraer el token

def obtener_atleta_actual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credenciales_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # 1. Intentamos leer el token con nuestra llave secreta
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub") # 'sub' es donde guardamos el email
        if email is None:
            raise credenciales_exception
    except JWTError:
        # Si el token fue alterado por un hacker o expiró o no se pudo decodificar, ¡Error 401!
        raise credenciales_exception
        
    # 2. Si el token es válido, buscamos al atleta en SQLite
    atleta = atleta_crud.obtener_atleta_por_email(db, email=email)
    if atleta is None:
        raise credenciales_exception
        
    # 3. Le entregamos el atleta a la ruta
    return atleta

@router.post("/nuevo", response_model=AtletaOut)
def registrar_atleta(atleta: AtletaCreate, db: Session = Depends(get_db)):
    return atleta_crud.crear_atleta(db=db, atleta=atleta)

@router.post("/login", response_model=Token)
def login_atleta(atleta_login: AtletaLogin, db: Session = Depends(get_db)):

    
    # 1. Buscamos si el correo existe en la base de datos
    atleta = atleta_crud.obtener_atleta_por_email(db, email=atleta_login.email)
    
    # 2. Si no existe el correo, o la contraseña no coincide... ¡Error 401!
    if not atleta or not verify_password(atleta_login.password, atleta.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Si todo está bien, le fabricamos su "manilla" (Token)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crear_token_acceso(
        data={"sub": atleta.email}, expires_delta=access_token_expires
    )

    # 4. Entregamos el Token
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=AtletaOut)
def leer_perfil_atleta(atleta_actual = Depends(obtener_atleta_actual)):
    """
    Si el código llega a esta línea, es porque Depends(obtener_atleta_actual) 
    ya hizo todo el trabajo sucio. Simplemente devolvemos los datos.
    """
    return atleta_actual

@router.get("/todos", response_model=List[AtletaOut])
def leer_todos_atletas(atleta_actual = Depends(obtener_atleta_actual), db: Session = Depends(get_db)):
    
    # 1. El guardia estricto: ¿Es entrenador?
    if not atleta_actual.es_entrenador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="¡Detente! Solo un Sensei puede ver el listado del dojo."
        )
    
    # 2. Si pasó el guardia, le traemos toda la tabla de atletas
    atletas = atleta_crud.obtener_todos_los_atletas(db)    
    return atletas      

@router.put("/{atleta_id}", response_model=AtletaOut)
def actualizar_datos_alumno(
    atleta_id: int, 
    datos: AtletaUpdate, 
    atleta_actual = Depends(obtener_atleta_actual), 
    db: Session = Depends(get_db)
):
    # 1. El guardia estricto: ¿Es Sensei?
    if not atleta_actual.es_entrenador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="¡Detente! Solo un Sensei puede ascender a un alumno o darle puntos."
        )
    
    # 2. Intentamos actualizar
    atleta_actualizado = atleta_crud.actualizar_atleta(db, atleta_id, datos)
    
    # 3. Si el ID no existe
    if not atleta_actualizado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Atleta no encontrado en el dojo")
        
    return atleta_actualizado

@router.delete("/{atleta_id}", status_code=status.HTTP_204_NO_CONTENT)
def expulsar_alumno(
    atleta_id: int, 
    atleta_actual = Depends(obtener_atleta_actual), 
    db: Session = Depends(get_db)
):
    # 1. El guardia estricto: ¿Es Sensei?
    if not atleta_actual.es_entrenador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo el Sensei puede expulsar alumnos del dojo."
        )
    
    # 2. Intentamos eliminar
    exito = atleta_crud.eliminar_atleta(db, atleta_id)
    
    if not exito:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Atleta no encontrado")
        
    return # 204 No Content no devuelve nada, solo indica que se borró con éxito