from pydantic import BaseModel
from typing import List, Optional


class TransactionSchema(BaseModel):
    transaction_id: str
    date: str
    description: str
    merchant: str
    category: str
    amount: float
    currency: str = "ARS"
    type: str


class AvailableProductSchema(BaseModel):
    product_id: str
    name: str
    type: str
    currency: str = "ARS"
    description: str
    risk_level: str
    liquidity: str
    simulated_annual_rate: float


class FinancialDataRequest(BaseModel):
    user_id: str
    tenant_id: str
    email: Optional[str] = None
    currency: str = "ARS"
    period_start: str
    period_end: str
    monthly_income: float
    current_balance: float
    transactions: List[TransactionSchema] = []
    available_products: List[AvailableProductSchema] = []
