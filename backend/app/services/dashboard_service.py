from app.repositories.mock_repository import (
    get_demo_dashboard,
    get_demo_summary,
    get_demo_cash_flow,
    get_demo_category_breakdown,
    get_demo_top_merchants,
    get_demo_alerts,
    get_demo_recommendation,
)

DEMO_USER_ID = "demo"


def _ensure_demo(user_id: str) -> None:
    if user_id != DEMO_USER_ID:
        raise ValueError(f"Usuario '{user_id}' no encontrado")


def get_dashboard(user_id: str) -> dict:
    _ensure_demo(user_id)
    return get_demo_dashboard(user_id)


def get_summary(user_id: str) -> dict:
    _ensure_demo(user_id)
    return get_demo_summary(user_id)


def get_cash_flow(user_id: str) -> list:
    _ensure_demo(user_id)
    return get_demo_cash_flow(user_id)


def get_category_breakdown(user_id: str) -> list:
    _ensure_demo(user_id)
    return get_demo_category_breakdown(user_id)


def get_top_merchants(user_id: str) -> list:
    _ensure_demo(user_id)
    return get_demo_top_merchants(user_id)


def get_alerts(user_id: str) -> list:
    _ensure_demo(user_id)
    return get_demo_alerts(user_id)


def get_recommendation(user_id: str) -> dict:
    _ensure_demo(user_id)
    return get_demo_recommendation(user_id)
