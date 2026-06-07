FRANCO_DASHBOARD = {
    "user_id": "franco",
    "summary": {
        "income": 1800000.0,
        "expenses": 1100000.0,
        "net_cash_flow": 700000.0,
        "current_balance": 700000.0,
        "savings_rate": 0.3889,
        "financial_health_label": "Excelente",
        "currency": "ARS",
        "period": "Mayo 2026",
    },
    "cash_flow": [
        {"date": "2026-05-01", "income": 1800000.0, "expenses": 0.0,      "running_balance": 1800000.0},
        {"date": "2026-05-04", "income": 0.0,       "expenses": 130000.0, "running_balance": 1670000.0},
        {"date": "2026-05-08", "income": 0.0,       "expenses": 135000.0, "running_balance": 1535000.0},
        {"date": "2026-05-11", "income": 0.0,       "expenses": 140000.0, "running_balance": 1395000.0},
        {"date": "2026-05-15", "income": 0.0,       "expenses": 140000.0, "running_balance": 1255000.0},
        {"date": "2026-05-18", "income": 0.0,       "expenses": 135000.0, "running_balance": 1120000.0},
        {"date": "2026-05-22", "income": 0.0,       "expenses": 140000.0, "running_balance": 980000.0},
        {"date": "2026-05-25", "income": 0.0,       "expenses": 140000.0, "running_balance": 840000.0},
        {"date": "2026-05-29", "income": 0.0,       "expenses": 140000.0, "running_balance": 700000.0},
    ],
    "category_breakdown": [
        {"category": "Expensas y hogar",      "amount": 275000.0, "percentage": 25.00},
        {"category": "Supermercados",         "amount": 220000.0, "percentage": 20.00},
        {"category": "Salud y prepagas",      "amount": 198000.0, "percentage": 18.00},
        {"category": "Viajes y ocio",         "amount": 165000.0, "percentage": 15.00},
        {"category": "Restaurantes",          "amount": 132000.0, "percentage": 12.00},
        {"category": "Servicios profesionales","amount": 110000.0, "percentage": 10.00},
    ],
    "top_merchants": [
        {"merchant": "Expensas edificio",  "amount": 200000.0, "category": "Hogar",      "transactions": 1},
        {"merchant": "Swiss Medical",      "amount": 198000.0, "category": "Salud",      "transactions": 1},
        {"merchant": "Jumbo / Carrefour",  "amount": 150000.0, "category": "Supermercados","transactions": 6},
        {"merchant": "Despegar.com",       "amount": 120000.0, "category": "Viajes",     "transactions": 2},
        {"merchant": "Restaurantes varios","amount": 132000.0, "category": "Gastronomía","transactions": 14},
    ],
    "alerts": [
        {
            "alert_id": "franco_alert_001",
            "type": "retirement_planning",
            "severity": "medium",
            "title": "Oportunidad de planificación para el retiro",
            "message": "A ~12 años del retiro estimado, es el momento ideal para diversificar hacia instrumentos de largo plazo y maximizar el capital acumulado.",
            "action": "Ver opciones de inversión",
        },
        {
            "alert_id": "franco_alert_002",
            "type": "healthcare_review",
            "severity": "low",
            "title": "Gasto en salud: 18% del total",
            "message": "Tu prepaga representa $198.000 mensuales. Comparar planes alternativos podría liberar capital para inversión.",
            "action": "Revisar cobertura",
        },
    ],
    "recommendation": {
        "title": "Maximizá tu capital para el retiro",
        "description": "Tenés $700.000 disponibles. A 12 años del retiro, una estrategia diversificada entre liquidez, rendimiento y largo plazo puede marcar una diferencia significativa.",
        "product_ids": ["fixed_term_30d_ars", "daily_yield_ars", "liquid_balance_ars"],
        "disclaimer": "Esta información es de carácter educativo. No constituye asesoramiento financiero.",
        "cta": "Simular mi estrategia",
    },
    "educational_cards": [
        {
            "card_id": "franco_edu_001",
            "title": "Planificación para el retiro",
            "content": (
                "A 12 años del retiro, cada peso invertido hoy tiene tiempo de multiplicarse. "
                "Diversificar entre instrumentos de corto, mediano y largo plazo reduce el riesgo "
                "y maximiza el rendimiento acumulado. El tiempo todavía está de tu lado."
            ),
            "icon": "🏖️",
            "category": "retiro",
        },
        {
            "card_id": "franco_edu_002",
            "title": "Diversificación de portafolio",
            "content": (
                "No poner todos los activos en el mismo instrumento reduce la exposición al riesgo. "
                "Una mezcla de liquidez inmediata, rendimiento diario y plazo fijo permite "
                "cubrir imprevistos sin sacrificar el rendimiento del capital de largo plazo."
            ),
            "icon": "🎯",
            "category": "inversion",
        },
    ],
    "simulator_defaults": {
        "available_amount": 700000.0,
        "time_horizon_days": 90,
        "liquidity_need": "low",
        "risk_preference": "medium",
    },
}
