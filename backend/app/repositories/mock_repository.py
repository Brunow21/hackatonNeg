from app.mock_data.demo_dashboard import DEMO_DASHBOARD
from app.mock_data.cande_dashboard import CANDE_DASHBOARD
from app.mock_data.franco_dashboard import FRANCO_DASHBOARD
from app.mock_data.cata_dashboard import CATA_DASHBOARD
from app.mock_data.demo_financial_data import DEMO_AVAILABLE_PRODUCTS

MOCK_DASHBOARDS = {
    "demo":   DEMO_DASHBOARD,
    "cande":  CANDE_DASHBOARD,
    "franco": FRANCO_DASHBOARD,
    "cata":   CATA_DASHBOARD,
}

KNOWN_USERS = set(MOCK_DASHBOARDS.keys())


def get_dashboard_for(user_id: str) -> dict:
    return MOCK_DASHBOARDS.get(user_id, DEMO_DASHBOARD)


def get_summary_for(user_id: str) -> dict:
    return get_dashboard_for(user_id)["summary"]


def get_cash_flow_for(user_id: str) -> list:
    return get_dashboard_for(user_id)["cash_flow"]


def get_category_breakdown_for(user_id: str) -> list:
    return get_dashboard_for(user_id)["category_breakdown"]


def get_top_merchants_for(user_id: str) -> list:
    return get_dashboard_for(user_id)["top_merchants"]


def get_alerts_for(user_id: str) -> list:
    return get_dashboard_for(user_id)["alerts"]


def get_recommendation_for(user_id: str) -> dict:
    return get_dashboard_for(user_id)["recommendation"]


def get_educational_cards_for(user_id: str) -> list:
    return get_dashboard_for(user_id)["educational_cards"]


def get_simulator_defaults_for(user_id: str) -> dict:
    return get_dashboard_for(user_id)["simulator_defaults"]


def get_demo_available_products() -> list:
    return DEMO_AVAILABLE_PRODUCTS
