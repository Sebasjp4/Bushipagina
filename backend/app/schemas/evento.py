# En backend/app/schemas/evento.py
from pydantic import BaseModel
from datetime import date

class EventoCreate(BaseModel):  # Antes TorneoCreate
    titulo: str
    fecha: date
    lugar: str
    tipo: str = "Circular"
    es_nacional: bool = True

class EventoResponse(EventoCreate): # Antes TorneoResponse
    id: int

    class Config:
        from_attributes = True