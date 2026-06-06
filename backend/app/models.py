from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    tenant_id = Column(String)
    email = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    financial_data = relationship("FinancialData", back_populates="user")


class FinancialData(Base):
    __tablename__ = "financial_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.user_id"))
    currency = Column(String, default="ARS")
    period_start = Column(String)
    period_end = Column(String)
    monthly_income = Column(Float)
    current_balance = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="financial_data")
    transactions = relationship("Transaction", back_populates="financial_data")
    available_products = relationship("AvailableProduct", back_populates="financial_data")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    financial_data_id = Column(Integer, ForeignKey("financial_data.id"))
    transaction_id = Column(String)
    date = Column(String)
    description = Column(String)
    merchant = Column(String)
    category = Column(String)
    amount = Column(Float)
    currency = Column(String, default="ARS")
    transaction_type = Column(String)

    financial_data = relationship("FinancialData", back_populates="transactions")


class AvailableProduct(Base):
    __tablename__ = "available_products"

    id = Column(Integer, primary_key=True, index=True)
    financial_data_id = Column(Integer, ForeignKey("financial_data.id"))
    product_id = Column(String)
    name = Column(String)
    product_type = Column(String)
    currency = Column(String, default="ARS")
    description = Column(String)
    risk_level = Column(String)
    liquidity = Column(String)
    simulated_annual_rate = Column(Float)

    financial_data = relationship("FinancialData", back_populates="available_products")
