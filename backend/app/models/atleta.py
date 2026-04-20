from sqlalchemy import Column, Integer, String, Float, Boolean
from app.core.database import Base

class Atleta(Base):
    __tablename__ = "atletas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # Datos de karate
    edad = Column(Integer)
    peso_actual = Column(Float)
    grado_cinturon = Column(String)  # Blanco, Amarillo, Negro...
    es_entrenador = Column(Boolean, default=False)
    puntos_ranking = Column(Integer, default=0) 