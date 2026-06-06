from pydantic import BaseModel
from typing import List, Any


class SummaryResponse(BaseModel):
    income: float
    expenses: float
    net_cash_flow: float
    current_balance: float
    savings_rate: float
    financial_health_label: str
    currency: str
    period: str


class CashFlowEntry(BaseModel):
    date: str
    income: float
    expenses: float
    running_balance: float


class CategoryBreakdown(BaseModel):
    category: str
    amount: float
    percentage: float


class TopMerchant(BaseModel):
    merchant: str
    amount: float
    category: str
    transactions: int


class Alert(BaseModel):
    alert_id: str
    type: str
    severity: str
    title: str
    message: str
    action: str


class Recommendation(BaseModel):
    title: str
    description: str
    product_ids: List[str]
    disclaimer: str
    cta: str


class EducationalCard(BaseModel):
    card_id: str
    title: str
    content: str
    icon: str
    category: str


class SimulatorDefaults(BaseModel):
    available_amount: float
    time_horizon_days: int
    liquidity_need: str
    risk_preference: str


class DashboardResponse(BaseModel):
    user_id: str
    summary: SummaryResponse
    cash_flow: List[CashFlowEntry]
    category_breakdown: List[CategoryBreakdown]
    top_merchants: List[TopMerchant]
    alerts: List[Alert]
    recommendation: Recommendation
    educational_cards: List[EducationalCard]
    simulator_defaults: SimulatorDefaults
