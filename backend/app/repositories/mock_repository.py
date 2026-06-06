from app.mock_data.demo_dashboard import DEMO_DASHBOARD
from app.mock_data.demo_financial_data import DEMO_AVAILABLE_PRODUCTS


def get_demo_dashboard(_user_id: str = "demo") -> dict:
    return DEMO_DASHBOARD


def get_demo_summary(_user_id: str = "demo") -> dict:
    return DEMO_DASHBOARD["summary"]


def get_demo_cash_flow(_user_id: str = "demo") -> list:
    return DEMO_DASHBOARD["cash_flow"]


def get_demo_category_breakdown(_user_id: str = "demo") -> list:
    return DEMO_DASHBOARD["category_breakdown"]


def get_demo_top_merchants(_user_id: str = "demo") -> list:
    return DEMO_DASHBOARD["top_merchants"]


def get_demo_alerts(_user_id: str = "demo") -> list:
    return DEMO_DASHBOARD["alerts"]


def get_demo_recommendation(_user_id: str = "demo") -> dict:
    return DEMO_DASHBOARD["recommendation"]


def get_demo_educational_cards(_user_id: str = "demo") -> list:
    return DEMO_DASHBOARD["educational_cards"]


def get_demo_simulator_defaults(_user_id: str = "demo") -> dict:
    return DEMO_DASHBOARD["simulator_defaults"]


def get_demo_available_products() -> list:
    return DEMO_AVAILABLE_PRODUCTS
