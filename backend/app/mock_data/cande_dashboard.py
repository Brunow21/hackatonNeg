CANDE_DASHBOARD = {
    "user_id": "cande",
    "summary": {
        "income": 180000.0,
        "expenses": 165000.0,
        "net_cash_flow": 15000.0,
        "current_balance": 15000.0,
        "savings_rate": 0.0833,
        "financial_health_label": "En riesgo",
        "currency": "ARS",
        "period": "Mayo 2026",
    },
    "cash_flow": [
        {"date": "2026-05-01", "income": 180000.0, "expenses": 0.0,     "running_balance": 180000.0},
        {"date": "2026-05-04", "income": 0.0,      "expenses": 18000.0, "running_balance": 162000.0},
        {"date": "2026-05-08", "income": 0.0,      "expenses": 20000.0, "running_balance": 142000.0},
        {"date": "2026-05-11", "income": 0.0,      "expenses": 22000.0, "running_balance": 120000.0},
        {"date": "2026-05-15", "income": 0.0,      "expenses": 22000.0, "running_balance": 98000.0},
        {"date": "2026-05-18", "income": 0.0,      "expenses": 20000.0, "running_balance": 78000.0},
        {"date": "2026-05-22", "income": 0.0,      "expenses": 23000.0, "running_balance": 55000.0},
        {"date": "2026-05-25", "income": 0.0,      "expenses": 20000.0, "running_balance": 35000.0},
        {"date": "2026-05-29", "income": 0.0,      "expenses": 20000.0, "running_balance": 15000.0},
    ],
    "category_breakdown": [
        {"category": "Delivery y comida", "amount": 45000.0, "percentage": 27.27},
        {"category": "Suscripciones",     "amount": 35000.0, "percentage": 21.21},
        {"category": "Transporte",        "amount": 30000.0, "percentage": 18.18},
        {"category": "Indumentaria",      "amount": 25000.0, "percentage": 15.15},
        {"category": "Entretenimiento",   "amount": 20000.0, "percentage": 12.12},
        {"category": "Salud",             "amount": 10000.0, "percentage": 6.07},
    ],
    "top_merchants": [
        {"merchant": "Rappi",            "amount": 32000.0, "category": "Delivery",       "transactions": 12},
        {"merchant": "Cabify / Uber",    "amount": 22000.0, "category": "Transporte",     "transactions": 18},
        {"merchant": "Zara / H&M",       "amount": 25000.0, "category": "Indumentaria",   "transactions": 3},
        {"merchant": "Spotify + Netflix","amount": 18000.0, "category": "Suscripciones",  "transactions": 2},
        {"merchant": "McDonald's",       "amount": 13000.0, "category": "Comida",         "transactions": 8},
    ],
    "alerts": [
        {
            "alert_id": "cande_alert_001",
            "type": "emergency_fund_low",
            "severity": "high",
            "title": "Fondo de emergencia inexistente",
            "message": "Solo tenés $15.000 disponibles. Lo mínimo recomendado es 3 meses de gastos ($495.000). Cualquier imprevisto puede generarte deuda.",
            "action": "Ver cómo empezar",
        },
        {
            "alert_id": "cande_alert_002",
            "type": "burn_rate_high",
            "severity": "high",
            "title": "Burn rate acelerado",
            "message": "Gastaste $150.000 en los primeros 18 días del mes — el 91% de tu ingreso. Al ritmo actual, entrarás en rojo antes de fin de mes.",
            "action": "Ver detalle de gastos",
        },
        {
            "alert_id": "cande_alert_003",
            "type": "unidentified_recurring",
            "severity": "medium",
            "title": "Cargo recurrente no identificado",
            "message": "Detectamos 3 débitos automáticos por $18.000 que se repiten mensualmente y no están clasificados en tu presupuesto. ¿Los tenés en cuenta?",
            "action": "Revisar débitos",
        },
        {
            "alert_id": "cande_alert_004",
            "type": "savings_goal_reached",
            "severity": "opportunity",
            "title": "Meta de ahorro al alcance",
            "message": "Separando $18.000/mes (solo el 10% de tu sueldo), en 6 meses tenés tu primer fondo de emergencia. Es más cerca de lo que parece.",
            "action": "Empezar hoy",
        },
    ],
    "recommendation": {
        "title": "Empezá a ahorrar desde hoy",
        "description": "Incluso separando el 10% de tu sueldo al inicio de cada mes hacés la diferencia. Comezá con un fondo líquido y sumá rendimiento diario.",
        "product_ids": ["liquid_balance_ars", "daily_yield_ars"],
        "disclaimer": "Esta información es de carácter educativo. No constituye asesoramiento financiero.",
        "cta": "Simular mi primer ahorro",
    },
    "educational_cards": [
        {
            "card_id": "cande_edu_001",
            "title": "¿Qué es un fondo de emergencia?",
            "content": (
                "Es dinero guardado para cubrir gastos imprevistos sin endeudarte. "
                "La regla de oro: tener entre 3 y 6 meses de gastos disponibles. "
                "No necesitás tenerlo todo de una — empezá con $15.000 y sumá cada mes."
            ),
            "icon": "🛟",
            "category": "ahorro",
        },
        {
            "card_id": "cande_edu_002",
            "title": "El poder de empezar joven",
            "content": (
                "Si empezás a ahorrar $10.000 por mes a los 20 años, a los 40 "
                "tenés mucho más que alguien que empezó a los 30 con el doble. "
                "El tiempo es tu mayor activo financiero."
            ),
            "icon": "⏳",
            "category": "inversion",
        },
    ],
    "simulator_defaults": {
        "available_amount": 15000.0,
        "time_horizon_days": 30,
        "liquidity_need": "high",
        "risk_preference": "low",
    },
}
