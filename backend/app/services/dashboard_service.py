from app.repositories.mock_repository import (
    KNOWN_USERS,
    get_dashboard_for,
    get_summary_for,
    get_cash_flow_for,
    get_category_breakdown_for,
    get_top_merchants_for,
    get_alerts_for,
    get_recommendation_for,
)


def _ensure_known(user_id: str) -> None:
    if user_id not in KNOWN_USERS:
        raise ValueError(
            f"Usuario '{user_id}' no encontrado. "
            f"Usuarios disponibles: {', '.join(sorted(KNOWN_USERS))}"
        )


def get_dashboard(user_id: str) -> dict:
    _ensure_known(user_id)
    return get_dashboard_for(user_id)


def get_summary(user_id: str) -> dict:
    _ensure_known(user_id)
    return get_summary_for(user_id)


def get_cash_flow(user_id: str) -> list:
    _ensure_known(user_id)
    return get_cash_flow_for(user_id)


def get_category_breakdown(user_id: str) -> list:
    _ensure_known(user_id)
    return get_category_breakdown_for(user_id)


def get_top_merchants(user_id: str) -> list:
    _ensure_known(user_id)
    return get_top_merchants_for(user_id)


def get_alerts(user_id: str) -> list:
    _ensure_known(user_id)
    return get_alerts_for(user_id)


def get_recommendation(user_id: str) -> dict:
    _ensure_known(user_id)
    return get_recommendation_for(user_id)
