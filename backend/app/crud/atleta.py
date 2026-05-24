from sqlalchemy.orm import Session # <--- ¡ESTA ES LA QUE FALTABA!
from app.models import atleta as models
from app.schemas import atleta as schemas
from app.core.security import get_password_hash

def crear_atleta(db: Session, atleta: schemas.AtletaCreate):
    # 1. Hasheamos la contraseña
    password_encriptada = get_password_hash(atleta.password)
    
    # 2. Creamos el objeto para la DB
    db_atleta = models.Atleta(
        nombre=atleta.nombre,
        email=atleta.email,
        hashed_password=password_encriptada, # El nombre que tienes en models.py
        fecha_nacimiento=atleta.fecha_nacimiento, 
        peso_actual=atleta.peso_actual,
        grado_cinturon=atleta.grado_cinturon
    )
    
    # 3. Guardar
    db.add(db_atleta)
    db.commit()
    db.refresh(db_atleta)
    return db_atleta

def obtener_atleta_por_email(db: Session, email: str):
    return db.query(models.Atleta).filter(models.Atleta.email == email).first()

def obtener_todos_los_atletas(db: Session):
    return db.query(models.Atleta).all()

def actualizar_atleta(db: Session, atleta_id: int, datos: schemas.AtletaUpdate):

    # Buscamos al alumno por su ID
    db_atleta = db.query(models.Atleta).filter(models.Atleta.id == atleta_id).first()
    
    if db_atleta:
        # Si el Sensei mandó un cinturón nuevo, lo actualizamos
        if datos.grado_cinturon is not None:
            db_atleta.grado_cinturon = datos.grado_cinturon
            
        # Si el Sensei mandó puntos nuevos, los actualizamos
        if datos.puntos_ranking is not None:
            db_atleta.puntos_ranking = datos.puntos_ranking

        if datos.peso_actual is not None:
            db_atleta.peso_actual = datos.peso_actual
            
        # Guardamos los cambios en PostgreSQL
        db.commit()
        db.refresh(db_atleta)
        
    return db_atleta

def eliminar_atleta(db: Session, atleta_id: int):
    # Buscamos al alumno
    db_atleta = db.query(models.Atleta).filter(models.Atleta.id == atleta_id).first()
    
    if db_atleta:
        db.delete(db_atleta) # Lo borramos
        db.commit()         # Guardamos el cambio en PostgreSQL
        return True
    return False