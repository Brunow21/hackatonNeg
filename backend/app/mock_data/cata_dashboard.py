CATA_DASHBOARD = {
    "user_id": "cata",
    "summary": {
        "income": 650000.0,
        "expenses": 590000.0,
        "net_cash_flow": 60000.0,
        "current_balance": 60000.0,
        "savings_rate": 0.0923,
        "financial_health_label": "Estable",
        "currency": "ARS",
        "period": "Mayo 2026",
    },
    "cash_flow": [
        {"date": "2026-05-01", "income": 650000.0, "expenses": 0.0,     "running_balance": 650000.0},
        {"date": "2026-05-04", "income": 0.0,      "expenses": 75000.0, "running_balance": 575000.0},
        {"date": "2026-05-08", "income": 0.0,      "expenses": 75000.0, "running_balance": 500000.0},
        {"date": "2026-05-11", "income": 0.0,      "expenses": 75000.0, "running_balance": 425000.0},
        {"date": "2026-05-15", "income": 0.0,      "expenses": 75000.0, "running_balance": 350000.0},
        {"date": "2026-05-18", "income": 0.0,      "expenses": 70000.0, "running_balance": 280000.0},
        {"date": "2026-05-22", "income": 0.0,      "expenses": 80000.0, "running_balance": 200000.0},
        {"date": "2026-05-25", "income": 0.0,      "expenses": 70000.0, "running_balance": 130000.0},
        {"date": "2026-05-29", "income": 0.0,      "expenses": 70000.0, "running_balance": 60000.0},
    ],
    "category_breakdown": [
        {"category": "Supermercados", "amount": 188800.0, "percentage": 32.00},
        {"category": "Educación",     "amount": 129800.0, "percentage": 22.00},
        {"category": "Salud",         "amount": 106200.0, "percentage": 18.00},
        {"category": "Servicios",     "amount": 88500.0,  "percentage": 15.00},
        {"category": "Transporte",    "amount": 47200.0,  "percentage": 8.00},
        {"category": "Entretenimiento familiar", "amount": 29500.0, "percentage": 5.00},
    ],
    "top_merchants": [
        {"merchant": "Cuota escolar",      "amount": 129800.0, "category": "Educación",    "transactions": 1},
        {"merchant": "Carrefour / Disco",  "amount": 120000.0, "category": "Supermercados","transactions": 8},
        {"merchant": "OSDE familiar",      "amount": 106200.0, "category": "Salud",        "transactions": 1},
        {"merchant": "Expensas",           "amount": 70000.0,  "category": "Servicios",    "transactions": 1},
        {"merchant": "YPF / Shell",        "amount": 40000.0,  "category": "Transporte",   "transactions": 5},
    ],
    "alerts": [
        {
            "alert_id": "cata_alert_001",
            "type": "education_cost_planning",
            "severity": "medium",
            "title": "Cuotas escolares: 22% del presupuesto",
            "message": "La educación es tu segundo gasto más alto. Planificar el ciclo lectivo con anticipación (matrícula, útiles, actividades) te ayuda a distribuir el impacto.",
            "action": "Ver planificación educativa",
        },
        {
            "alert_id": "cata_alert_002",
            "type": "savings_below_target",
            "severity": "medium",
            "title": "Ahorro por debajo del objetivo familiar",
            "message": "Tu tasa de ahorro del 9.2% está por debajo del 15% recomendado para familias. Pequeños ajustes en supermercados pueden acercar ese número.",
            "action": "Ver oportunidades",
        },
    ],
    "recommendation": {
        "title": "Protegé los gastos de tu familia",
        "description": "Tenés $60.000 disponibles. Priorizar un fondo de emergencia familiar te da tranquilidad ante imprevistos — desde un gasto médico hasta una reparación del hogar.",
        "product_ids": ["liquid_balance_ars", "daily_yield_ars"],
        "disclaimer": "Esta información es de carácter educativo. No constituye asesoramiento financiero.",
        "cta": "Simular fondo familiar",
    },
    "educational_cards": [
        {
            "card_id": "cata_edu_001",
            "title": "El presupuesto familiar",
            "content": (
                "Llevar un presupuesto familiar no significa privarse — significa decidir "
                "a dónde va cada peso antes de que se gaste solo. "
                "Con $650.000 de ingreso y gastos fijos de $590.000, "
                "cada peso ahorrado es una decisión activa."
            ),
            "icon": "🏠",
            "category": "presupuesto",
        },
        {
            "card_id": "cata_edu_002",
            "title": "Fondo educativo para tus hijos",
            "content": (
                "Los costos educativos crecen anualmente por encima de la inflación. "
                "Separar un pequeño monto mensual en un instrumento de rendimiento diario "
                "puede cubrir la matrícula del próximo año sin sentir el impacto."
            ),
            "icon": "📚",
            "category": "educacion",
        },
    ],
    "simulator_defaults": {
        "available_amount": 60000.0,
        "time_horizon_days": 30,
        "liquidity_need": "medium",
        "risk_preference": "low",
    },
}
