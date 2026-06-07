from pydantic import BaseModel
from typing import Optional, List


class EvidenceItem(BaseModel):
    label: str
    value: str
    source: str


class FinancialAgentContext(BaseModel):
    user_id: str
    period: str
    income: float
    expenses: float
    current_balance: float
    saving_capacity: float
    expense_ratio: float
    projected_eom_balance: float
    liquidity_need: str          # "low" | "medium" | "high"
    top_categories: List[str]
    subscriptions_amount: float
    available_product_ids: List[str]
    insufficient_data: bool


class NextBestMove(BaseModel):
    suggested_action: str
    suggested_product_id: Optional[str]
    suggested_amount: Optional[float]
    confidence: str              # "low" | "medium" | "high"
    why: str
    what_to_avoid: str
    evidence: List[EvidenceItem]


class AgentCoachResponse(BaseModel):
    context: FinancialAgentContext
    next_best_move: NextBestMove
    income_insight: str
    liquidity_insight: str
    subscription_insight: str
    educational_tip: str
    safety_disclaimer: str
