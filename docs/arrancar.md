# 🚀 Guía de Inicio Rápido: Bushikai Digital

Para levantar todo el entorno de desarrollo local, necesitarás abrir 3 terminales separadas. Sigue este orden estricto:

### 1. Levantar la Base de Datos (PostgreSQL)
El motor de base de datos debe estar corriendo antes de que el backend intente conectarse.

Abre la **Terminal 1** (en la raíz del proyecto) y ejecuta:
```bash
# Inicia el contenedor en segundo plano
docker compose up -d

(Nota: Para apagar la base de datos al terminar tu jornada, usa docker compose down).

# 1. Navega a la carpeta del backend
cd backend

# 2. Activa el entorno virtual (Comando para Windows)
.\venv\Scripts\activate

# 3. Enciende el servidor Uvicorn con auto-recarga
uvicorn app.main:app --reload

# 1. Navega a la carpeta del frontend
cd frontend

# 2. Enciende el servidor de Vite/Astro
npm run dev