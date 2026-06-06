from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.financial_data import FinancialDataRequest
from app import models

router = APIRouter(prefix="/v1", tags=["financial-data"])


@router.post("/financial-data")
def create_financial_data(data: FinancialDataRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == data.user_id).first()
    if not user:
        user = models.User(
            user_id=data.user_id,
            tenant_id=data.tenant_id,
            email=data.email,
        )
        db.add(user)
        db.flush()

    financial_data = models.FinancialData(
        user_id=data.user_id,
        currency=data.currency,
        period_start=data.period_start,
        period_end=data.period_end,
        monthly_income=data.monthly_income,
        current_balance=data.current_balance,
    )
    db.add(financial_data)
    db.flush()

    for tx in data.transactions:
        transaction = models.Transaction(
            financial_data_id=financial_data.id,
            transaction_id=tx.transaction_id,
            date=tx.date,
            description=tx.description,
            merchant=tx.merchant,
            category=tx.category,
            amount=tx.amount,
            currency=tx.currency,
            transaction_type=tx.type,
        )
        db.add(transaction)

    for product in data.available_products:
        ap = models.AvailableProduct(
            financial_data_id=financial_data.id,
            product_id=product.product_id,
            name=product.name,
            product_type=product.type,
            currency=product.currency,
            description=product.description,
            risk_level=product.risk_level,
            liquidity=product.liquidity,
            simulated_annual_rate=product.simulated_annual_rate,
        )
        db.add(ap)

    db.commit()

    return {
        "status": "ok",
        "user_id": data.user_id,
        "message": "Datos financieros registrados correctamente",
    }
