from pydantic import BaseModel
from typing import List, Any


class SimulatorInput(BaseModel):
    available_amount: float
    liquidity_need: str = "medium"
    time_horizon_days: int = 30
    risk_preference: str = "low"


class ProductComparison(BaseModel):
    product_id: str
    name: str
    allocated_amount: float
    simulated_yield: float
    annual_rate: float
    liquidity: str
    risk_level: str


class SimulatorResult(BaseModel):
    user_id: str
    available_amount: float
    liquid_amount: float
    daily_yield_amount: float
    fixed_term_amount: float
    total_simulated_yield: float
    time_horizon_days: int
    explanation: str
    product_comparison: List[ProductComparison]
    educational_cards: List[Any]
