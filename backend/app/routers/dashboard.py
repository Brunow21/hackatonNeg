from fastapi import APIRouter, HTTPException
from app.services import dashboard_service

router = APIRouter(prefix="/v1/users", tags=["dashboard"])


def _not_found(user_id: str):
    raise HTTPException(
        status_code=404,
        detail=f"Usuario '{user_id}' no encontrado. Usá 'demo' para datos de ejemplo.",
    )


@router.get("/{user_id}/dashboard")
def get_dashboard(user_id: str):
    try:
        return dashboard_service.get_dashboard(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/summary")
def get_summary(user_id: str):
    try:
        return dashboard_service.get_summary(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/cash-flow")
def get_cash_flow(user_id: str):
    try:
        return dashboard_service.get_cash_flow(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/category-breakdown")
def get_category_breakdown(user_id: str):
    try:
        return dashboard_service.get_category_breakdown(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/top-merchants")
def get_top_merchants(user_id: str):
    try:
        return dashboard_service.get_top_merchants(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/alerts")
def get_alerts(user_id: str):
    try:
        return dashboard_service.get_alerts(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/recommendation")
def get_recommendation(user_id: str):
    try:
        return dashboard_service.get_recommendation(user_id)
    except ValueError:
        _not_found(user_id)
