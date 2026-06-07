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
            "type": "burn_rate_high",
            "severity": "high",
            "title": "Burn rate acelerado",
            "message": "Gastaste $520.000 en los primeros 22 días del mes — el 88% de tu ingreso. Quedan aproximadamente $130.000 para los próximos 8 días.",
            "action": "Ver desglose",
        },
        {
            "alert_id": "cata_alert_002",
            "type": "education_cost_planning",
            "severity": "medium",
            "title": "Cuotas escolares: 22% del presupuesto",
            "message": "La educación es tu segundo gasto más alto. Planificar el ciclo lectivo con anticipación (matrícula, útiles, actividades extracurriculares) te ayuda a distribuir el impacto.",
            "action": "Ver planificación educativa",
        },
        {
            "alert_id": "cata_alert_003",
            "type": "unidentified_recurring",
            "severity": "medium",
            "title": "Débitos fijos de alto impacto",
            "message": "Cuota escolar ($129.800) + OSDE familiar ($106.200) = $236.000/mes en débitos automáticos. Son el 40% de tu presupuesto — planificarlos con anticipo evita sorpresas de liquidez.",
            "action": "Ver calendario de pagos",
        },
        {
            "alert_id": "cata_alert_004",
            "type": "savings_goal_reached",
            "severity": "opportunity",
            "title": "Meta de ahorro familiar al alcance",
            "message": "Reduciendo el gasto en supermercados un 5% (~$9.400/mes) alcanzarías el 15% de ahorro recomendado para familias en menos de 3 meses.",
            "action": "Ver cómo lograrlo",
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
