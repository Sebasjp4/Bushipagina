from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ARCHIVO PROVISIONAL PARA PRUEBAS, SE DEBE CAMBIAR A POSTGRESQL O MYSQL EN PRODUCCION
SQLALCHEMY_DATABASE_URL = "sqlite:///./bushikai.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

#funcuion para obtener la sesion de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
