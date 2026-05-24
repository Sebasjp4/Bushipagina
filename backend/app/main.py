from fastapi import FastAPI
from app.core.database import engine
from app.models import atleta  # Importamos para que SQLAlchemy lo reconozca
from app.api.v1 import atleta as atletas
from app.api.v1 import evento as eventos
from fastapi.middleware.cors import CORSMiddleware # Importamos la herramienta de seguridad


# Esto crea las tablas en el archivo bushikai.db si no existen
atleta.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Bushikai Digital API")

# 1. PRIMERO EL MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://127.0.0.1:4321", "http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=False,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# 2. LUEGO LAS RUTAS
app.include_router(atletas.router, prefix="/atletas", tags=["Atletas"])
app.include_router(eventos.router, prefix="/eventos", tags=["Eventos"])