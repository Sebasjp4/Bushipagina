from fastapi import FastAPI
from app.core.database import engine
from app.models import atleta  # Importamos para que SQLAlchemy lo reconozca
from app.api.v1 import atleta as atletas

# Esto crea las tablas en el archivo bushikai.db si no existen
atleta.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Bushikai Digital API")
app.include_router(atletas.router, prefix="/atletas", tags=["Atletas"])

@app.get("/")
def read_root():
    return {"message": "Base de datos conectada y tablas creadas"}

