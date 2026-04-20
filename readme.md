# 🥋 Bushikai Digital - V1.0
Sistema integral de gestión y alto rendimiento para karatekas de élite. Diseñado para centralizar el progreso técnico, físico y logístico del dojo.

## 🚀 Arquitectura
Este proyecto utiliza una arquitectura de **Monorepo**:
- **Backend:** FastAPI (Python) + SQLAlchemy + SQLite (Desarrollo).
- **Frontend:** Astro + React + Tailwind CSS 4.

## 🛠️ Requisitos previos
- Python 3.11+
- Node.js 18+
- npm o pnpm

## 🔧 Configuración del Entorno

### Backend
1. Entrar a la carpeta: `cd backend`
2. Crear entorno virtual: `python -m venv venv`
3. Activar: `.\venv\Scripts\activate` (Windows)
4. Instalar dependencias: `pip install -r requirements.txt`
5. Ejecutar: `uvicorn app.main:app --reload`

### Frontend
1. Entrar a la carpeta: `cd frontend`
2. Instalar dependencias: `npm install --legacy-peer-deps`
3. Ejecutar: `npm run dev`

---

## 📂 Estructura del Proyecto
```text
bushikai-digital/
├── backend/            # API REST con FastAPI
│   ├── app/
│   │   ├── api/        # Endpoints (v1)
│   │   ├── models/     # Modelos de DB (SQLAlchemy)
│   │   ├── schemas/    # Validación (Pydantic)
│   │   └── crud/       # Lógica de base de datos
├── frontend/           # Interfaz de usuario con Astro
│   ├── src/
│   │   ├── components/ # Componentes interactivos (React)
│   │   ├── layouts/    # Plantillas de página
│   │   └── pages/      # Rutas (Landing, Login, Dashboard)
└── docs/               # Documentación de Sprints