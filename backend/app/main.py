from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import health, financial_data, dashboard, simulator

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VirtualFinance API",
    description="API B2B white-label de insights financieros para fintechs",
    version="1.0.0",
    contact={"name": "VirtualFinance", "url": "http://localhost:8000"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(financial_data.router)
app.include_router(dashboard.router)
app.include_router(simulator.router)
