DEMO_AVAILABLE_PRODUCTS = [
    {
        "product_id": "liquid_balance_ars",
        "name": "Saldo Líquido ARS",
        "type": "savings",
        "currency": "ARS",
        "description": (
            "Dinero disponible al instante, sin restricciones. "
            "Ideal para emergencias y gastos cotidianos."
        ),
        "risk_level": "very_low",
        "liquidity": "immediate",
        "simulated_annual_rate": 0.93,
    },
    {
        "product_id": "daily_yield_ars",
        "name": "Rendimiento Diario ARS",
        "type": "money_market",
        "currency": "ARS",
        "description": (
            "Fondo común de inversión con rescate en 24hs. "
            "Combina liquidez con rendimiento competitivo."
        ),
        "risk_level": "low",
        "liquidity": "24h",
        "simulated_annual_rate": 0.97,
    },
    {
        "product_id": "fixed_term_30d_ars",
        "name": "Plazo Fijo 30 días ARS",
        "type": "fixed_term",
        "currency": "ARS",
        "description": (
            "Inversión a tasa fija garantizada por 30 días. "
            "Mayor rendimiento a cambio de menor disponibilidad."
        ),
        "risk_level": "low",
        "liquidity": "30_days",
        "simulated_annual_rate": 1.10,
    },
]
