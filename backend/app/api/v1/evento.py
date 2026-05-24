from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
# Importamos los modelos y esquemas ya renombrados a Evento
from app.models.evento import Evento
from app.schemas.evento import EventoCreate, EventoResponse
from app.api.v1.atleta import obtener_atleta_actual # Guardia de seguridad
from app.models.atleta import Atleta

router = APIRouter()

# 1. VER TODOS LOS EVENTOS (Ordenados por fecha más próxima)
@router.get("/", response_model=List[EventoResponse])
def listar_eventos(db: Session = Depends(get_db)):
    # Trae todos los eventos ordenados por fecha
    return db.query(Evento).order_by(Evento.fecha.asc()).all()

# 2. CREAR UN EVENTO (Solo Sensei)
@router.post("/nuevo", response_model=EventoResponse)
def crear_evento(
    evento: EventoCreate, 
    db: Session = Depends(get_db),
    usuario_actual: Atleta = Depends(obtener_atleta_actual)
):
    # ¡Guardia de seguridad! Solo el entrenador puede programar eventos
    if not usuario_actual.es_entrenador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo el Sensei puede registrar nuevos eventos."
        )
    
    # Creamos el evento con los datos que llegaron
    nuevo_evento = Evento(**evento.model_dump())
    db.add(nuevo_evento)
    db.commit()
    db.refresh(nuevo_evento)
    
    return nuevo_evento