from sqlalchemy import Column, Integer, String, Date, Boolean
from app.core.database import Base

class Evento(Base):
    __tablename__ = "eventos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    fecha = Column(Date)
    lugar = Column(String)
    tipo = Column(String, default="Circular") 
    es_nacional = Column(Boolean, default=True)