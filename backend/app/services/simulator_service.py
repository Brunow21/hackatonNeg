from app.schemas.simulator import SimulatorInput, SimulatorResult, ProductComparison
from app.mock_data.demo_financial_data import DEMO_AVAILABLE_PRODUCTS

LIQUIDITY_SPLITS = {
    "high":   {"liquid": 0.60, "daily_yield": 0.30, "fixed_term": 0.10},
    "medium": {"liquid": 0.30, "daily_yield": 0.40, "fixed_term": 0.30},
    "low":    {"liquid": 0.10, "daily_yield": 0.30, "fixed_term": 0.60},
}


def _annual_to_period_yield(amount: float, annual_rate: float, days: int) -> float:
    return amount * (annual_rate / 365) * days


def run_simulation(user_id: str, sim_input: SimulatorInput) -> SimulatorResult:
    split = LIQUIDITY_SPLITS.get(sim_input.liquidity_need, LIQUIDITY_SPLITS["medium"])

    liquid_amount = sim_input.available_amount * split["liquid"]
    daily_yield_amount = sim_input.available_amount * split["daily_yield"]
    fixed_term_amount = sim_input.available_amount * split["fixed_term"]

    products = {p["product_id"]: p for p in DEMO_AVAILABLE_PRODUCTS}

    liquid_rate = products["liquid_balance_ars"]["simulated_annual_rate"]
    daily_rate = products["daily_yield_ars"]["simulated_annual_rate"]
    fixed_rate = products["fixed_term_30d_ars"]["simulated_annual_rate"]

    liquid_yield = _annual_to_period_yield(liquid_amount, liquid_rate, sim_input.time_horizon_days)
    daily_yield = _annual_to_period_yield(daily_yield_amount, daily_rate, sim_input.time_horizon_days)
    fixed_yield = _annual_to_period_yield(fixed_term_amount, fixed_rate, sim_input.time_horizon_days)
    total_yield = liquid_yield + daily_yield + fixed_yield

    liquid_pct = int(split["liquid"] * 100)
    daily_pct = int(split["daily_yield"] * 100)
    fixed_pct = int(split["fixed_term"] * 100)

    explanation = (
        f"Con necesidad de liquidez '{sim_input.liquidity_need}', distribuimos "
        f"$ {sim_input.available_amount:,.0f} de la siguiente manera: "
        f"Saldo Líquido {liquid_pct}% ($ {liquid_amount:,.0f}), "
        f"Rendimiento Diario {daily_pct}% ($ {daily_yield_amount:,.0f}), "
        f"Plazo Fijo {fixed_pct}% ($ {fixed_term_amount:,.0f}). "
        f"Rendimiento total estimado en {sim_input.time_horizon_days} días: $ {total_yield:,.0f}."
    )

    product_comparison = [
        ProductComparison(
            product_id="liquid_balance_ars",
            name="Saldo Líquido ARS",
            allocated_amount=liquid_amount,
            simulated_yield=liquid_yield,
            annual_rate=liquid_rate,
            liquidity="Inmediata",
            risk_level="Muy bajo",
        ),
        ProductComparison(
            product_id="daily_yield_ars",
            name="Rendimiento Diario ARS",
            allocated_amount=daily_yield_amount,
            simulated_yield=daily_yield,
            annual_rate=daily_rate,
            liquidity="24 horas",
            risk_level="Bajo",
        ),
        ProductComparison(
            product_id="fixed_term_30d_ars",
            name="Plazo Fijo 30 días ARS",
            allocated_amount=fixed_term_amount,
            simulated_yield=fixed_yield,
            annual_rate=fixed_rate,
            liquidity="30 días",
            risk_level="Bajo",
        ),
    ]

    educational_cards = [
        {
            "card_id": "sim_edu_001",
            "title": "¿Por qué diversificar?",
            "content": (
                "Distribuir tu dinero entre distintos productos te permite balancear "
                "rendimiento y liquidez según tus necesidades reales. No pongas todos "
                "los huevos en la misma canasta."
            ),
            "icon": "⚖️",
            "category": "diversificacion",
        },
        {
            "card_id": "sim_edu_002",
            "title": "Tasa anual vs. rendimiento real",
            "content": (
                f"Una tasa del {int(daily_rate * 100)}% anual sobre "
                f"$ {daily_yield_amount:,.0f} durante {sim_input.time_horizon_days} días "
                f"genera aproximadamente $ {daily_yield:,.0f}. "
                "Las tasas anuales se prorratean por el tiempo efectivo de la inversión."
            ),
            "icon": "📊",
            "category": "tasas",
        },
    ]

    return SimulatorResult(
        user_id=user_id,
        available_amount=sim_input.available_amount,
        liquid_amount=liquid_amount,
        daily_yield_amount=daily_yield_amount,
        fixed_term_amount=fixed_term_amount,
        total_simulated_yield=total_yield,
        time_horizon_days=sim_input.time_horizon_days,
        explanation=explanation,
        product_comparison=product_comparison,
        educational_cards=educational_cards,
    )
