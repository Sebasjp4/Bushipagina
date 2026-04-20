from sqlalchemy.orm import Session
from app.models.atleta import Atleta
from app.schemas.atleta import AtletaCreate

def crear_atleta(db: Session, atleta: AtletaCreate):
    # Por ahora guardamos el password tal cual (luego le ponemos seguridad/hash) !IMPORTANTE!
    nuevo_atleta = Atleta(
        nombre=atleta.nombre,
        email=atleta.email,
        hashed_password=atleta.password, 
        edad=atleta.edad,
        peso_actual=atleta.peso_actual,
        grado_cinturon=atleta.grado_cinturon
    )
    db.add(nuevo_atleta)
    db.commit()
    db.refresh(nuevo_atleta)
    return nuevo_atleta