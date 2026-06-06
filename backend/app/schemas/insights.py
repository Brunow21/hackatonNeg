from pydantic import BaseModel


class SummaryInsight(BaseModel):
    label: str
    value: float
    trend: str
    description: str


class CashFlowInsight(BaseModel):
    date: str
    running_balance: float
    bucket: str


class CategoryInsight(BaseModel):
    category: str
    amount: float
    percentage: float
    trend: str


class MerchantInsight(BaseModel):
    merchant: str
    amount: float
    frequency: int
    category: str
