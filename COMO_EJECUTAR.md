# VirtualFinance — Instrucciones de ejecución

## Requisitos previos

- Python 3.10+
- Node.js 18+
- npm

No se requiere Docker, PostgreSQL ni ninguna instalación externa.

---

## Backend (FastAPI + SQLite)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

La base de datos SQLite (`virtualfinance.db`) se crea automáticamente al primer arranque.

- API disponible en: http://localhost:8000
- Swagger UI (docs): http://localhost:8000/docs
- Health check: http://localhost:8000/health

### Endpoints de prueba rápida

```bash
# Dashboard del usuario demo
curl http://localhost:8000/v1/users/demo/dashboard

# Simulación
curl -X POST http://localhost:8000/v1/users/demo/simulate \
  -H "Content-Type: application/json" \
  -d '{"available_amount": 180000, "liquidity_need": "medium", "time_horizon_days": 30, "risk_preference": "low"}'
```

---

## Frontend (React + TypeScript + Vite)

```bash
cd frontend
npm install
npm run dev
```

Dashboard disponible en: **http://localhost:5173**

> El frontend carga datos del backend automáticamente.
> Si el backend no está corriendo, usa datos mock hardcodeados para permitir desarrollo independiente.

---

## Estructura del proyecto

```
/
├── backend/
│   ├── app/
│   │   ├── main.py               # Entry point FastAPI
│   │   ├── database.py           # SQLite + SQLAlchemy
│   │   ├── models.py             # Modelos ORM
│   │   ├── schemas/              # Pydantic schemas
│   │   ├── routers/              # Endpoints HTTP
│   │   ├── services/             # Lógica de negocio
│   │   ├── repositories/         # Acceso a datos mock
│   │   └── mock_data/            # Datos demo hardcodeados
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.tsx               # Componente raíz
    │   ├── api.ts                # Interfaces + cliente HTTP
    │   ├── mockData.ts           # Fallback sin backend
    │   └── components/           # 12 componentes del dashboard
    ├── index.html
    ├── package.json
    └── vite.config.ts            # Proxy /v1 → localhost:8000
```

---

## Usuario demo

El `user_id = "demo"` siempre devuelve datos estables (hardcodeados en `mock_data/`).
No requiere registrar datos previamente en la base de datos.

Para registrar un usuario real, usar:

```bash
curl -X POST http://localhost:8000/v1/financial-data \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "tenant_id": "fintech_co",
    "email": "user@example.com",
    "currency": "ARS",
    "period_start": "2026-05-01",
    "period_end": "2026-05-31",
    "monthly_income": 500000,
    "current_balance": 120000,
    "transactions": [],
    "available_products": []
  }'
```
