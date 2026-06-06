from fastapi import APIRouter
from app.schemas.common import HealthResponse, RootResponse

router = APIRouter(tags=["info"])


@router.get("/", response_model=RootResponse)
def root():
    return RootResponse(
        service="VirtualFinance API",
        version="1.0.0",
        description="API B2B white-label de insights financieros para fintechs",
        docs="/docs",
        health="/health",
    )


@router.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok",
        service="VirtualFinance API",
        version="1.0.0",
    )
