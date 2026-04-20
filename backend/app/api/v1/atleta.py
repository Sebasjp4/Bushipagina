from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.atleta import AtletaCreate, AtletaOut
from app.crud import atleta as atleta_crud

router = APIRouter()

@router.post("/", response_model=AtletaOut)
def registrar_atleta(atleta: AtletaCreate, db: Session = Depends(get_db)):
    return atleta_crud.crear_atleta(db=db, atleta=atleta)