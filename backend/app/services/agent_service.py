from app.repositories.mock_repository import get_dashboard_for, get_demo_available_products, KNOWN_USERS
from app.schemas.agent import (
    FinancialAgentContext, NextBestMove, AgentCoachResponse, EvidenceItem
)


def build_context(user_id: str) -> FinancialAgentContext:
    if user_id not in KNOWN_USERS:
        raise ValueError(f"Unknown user: {user_id}")

    dashboard = get_dashboard_for(user_id)
    summary = dashboard["summary"]
    category_breakdown = dashboard["category_breakdown"]
    products = get_demo_available_products()

    income = summary["income"]
    expenses = summary["expenses"]
    current_balance = summary["current_balance"]

    saving_capacity = income - expenses
    expense_ratio = expenses / income
    projected_eom_balance = current_balance * 0.85

    if expense_ratio > 0.85:
        liquidity_need = "high"
    elif expense_ratio > 0.70:
        liquidity_need = "medium"
    else:
        liquidity_need = "low"

    top_categories = [cat["category"] for cat in category_breakdown]

    subscriptions_amount = next(
        (cat["amount"] for cat in category_breakdown if cat["category"] == "Suscripciones"),
        0.0,
    )

    available_product_ids = [p["product_id"] for p in products]

    return FinancialAgentContext(
        user_id=user_id,
        period=summary["period"],
        income=income,
        expenses=expenses,
        current_balance=current_balance,
        saving_capacity=saving_capacity,
        expense_ratio=expense_ratio,
        projected_eom_balance=projected_eom_balance,
        liquidity_need=liquidity_need,
        top_categories=top_categories,
        subscriptions_amount=subscriptions_amount,
        available_product_ids=available_product_ids,
        insufficient_data=False,
    )


def build_next_best_move(ctx: FinancialAgentContext) -> NextBestMove:
    what_to_avoid = "No mover todo el saldo si hay gastos próximos."

    if ctx.insufficient_data:
        return NextBestMove(
            suggested_action="insufficient_data",
            suggested_product_id=None,
            suggested_amount=None,
            confidence="low",
            why="No hay suficientes datos para generar una recomendación.",
            what_to_avoid=what_to_avoid,
            evidence=[
                EvidenceItem(label="Datos disponibles", value="insuficientes", source="context"),
            ],
        )

    if ctx.expense_ratio > 0.85:
        return NextBestMove(
            suggested_action="reduce_expenses",
            suggested_product_id=None,
            suggested_amount=None,
            confidence="medium",
            why=f"Según tus datos actuales, tu ratio de gastos es {ctx.expense_ratio:.4f}, lo que sugiere que una opción prudente sería revisar los egresos antes de explorar productos de inversión.",
            what_to_avoid=what_to_avoid,
            evidence=[
                EvidenceItem(label="Ratio de gastos", value=f"{ctx.expense_ratio:.4f}", source="summary"),
                EvidenceItem(label="Capacidad de ahorro", value=f"${ctx.saving_capacity:,.2f}", source="summary"),
            ],
        )

    if ctx.liquidity_need == "high":
        suggested_amount = min(ctx.saving_capacity, ctx.current_balance * 0.5)
        return NextBestMove(
            suggested_action="keep_liquid",
            suggested_product_id="liquid_balance_ars",
            suggested_amount=suggested_amount,
            confidence="medium",
            why=f"Según tus datos actuales, la necesidad de liquidez es alta. Conviene comparar mantener fondos accesibles antes de explorar otras opciones.",
            what_to_avoid=what_to_avoid,
            evidence=[
                EvidenceItem(label="Necesidad de liquidez", value=ctx.liquidity_need, source="context"),
                EvidenceItem(label="Saldo actual", value=f"${ctx.current_balance:,.2f}", source="summary"),
            ],
        )

    if ctx.liquidity_need == "medium" and "daily_yield_ars" in ctx.available_product_ids:
        suggested_amount = min(ctx.saving_capacity * 0.6, ctx.current_balance * 0.4)
        return NextBestMove(
            suggested_action="daily_yield",
            suggested_product_id="daily_yield_ars",
            suggested_amount=suggested_amount,
            confidence="medium",
            why=f"Según tus datos actuales, podrías explorar rendimiento diario como balance entre liquidez y retorno. Tu capacidad de ahorro es ${ctx.saving_capacity:,.2f}.",
            what_to_avoid=what_to_avoid,
            evidence=[
                EvidenceItem(label="Capacidad de ahorro", value=f"${ctx.saving_capacity:,.2f}", source="summary"),
                EvidenceItem(label="Saldo proyectado fin de mes", value=f"${ctx.projected_eom_balance:,.2f}", source="context"),
            ],
        )

    if ctx.liquidity_need == "low" and "fixed_term_30d_ars" in ctx.available_product_ids:
        suggested_amount = min(ctx.saving_capacity * 0.5, ctx.current_balance * 0.3)
        return NextBestMove(
            suggested_action="fixed_term",
            suggested_product_id="fixed_term_30d_ars",
            suggested_amount=suggested_amount,
            confidence="medium",
            why=f"Según tus datos actuales, la liquidez es baja y una opción prudente sería explorar un plazo fijo. Tu capacidad de ahorro es ${ctx.saving_capacity:,.2f}.",
            what_to_avoid=what_to_avoid,
            evidence=[
                EvidenceItem(label="Capacidad de ahorro", value=f"${ctx.saving_capacity:,.2f}", source="summary"),
                EvidenceItem(label="Necesidad de liquidez", value=ctx.liquidity_need, source="context"),
            ],
        )

    return NextBestMove(
        suggested_action="review_profile",
        suggested_product_id=None,
        suggested_amount=None,
        confidence="low",
        why="No se encontró una recomendación específica para el perfil actual.",
        what_to_avoid=what_to_avoid,
        evidence=[
            EvidenceItem(label="Ratio de gastos", value=f"{ctx.expense_ratio:.4f}", source="summary"),
            EvidenceItem(label="Capacidad de ahorro", value=f"${ctx.saving_capacity:,.2f}", source="summary"),
        ],
    )


def build_agent_response(user_id: str) -> AgentCoachResponse:
    ctx = build_context(user_id)
    move = build_next_best_move(ctx)

    income_insight = (
        f"Este mes registraste ingresos por ${ctx.income:,.2f}, que suelen ingresar a principios de mes. "
        "Según tus datos actuales, este patrón es consistente."
    )

    liquidity_insight = (
        f"Tu saldo proyectado a fin de mes es ${ctx.projected_eom_balance:,.2f}. "
        f"La necesidad de liquidez se clasifica como '{ctx.liquidity_need}', "
        "conviene comparar opciones antes de comprometer fondos."
    )

    subscription_insight = (
        f"Se detectaron ${ctx.subscriptions_amount:,.2f} en suscripciones con débito automático mensual. "
        "Podrías explorar si todos los servicios están activos y en uso."
    )

    if ctx.liquidity_need == "medium":
        educational_tip = (
            "Una opción prudente sería buscar el balance entre liquidez y rendimiento: "
            "podrías explorar productos con rescate en 24hs que mantienen el capital accesible "
            "mientras generan rendimiento. Conviene comparar tasas antes de decidir."
        )
    elif ctx.liquidity_need == "high":
        educational_tip = (
            "Una opción prudente sería mantener un fondo de emergencia equivalente a 3-6 meses de gastos. "
            "Esto te protege ante imprevistos sin necesidad de endeudarte. "
            "Podrías explorar opciones de saldo líquido con rendimiento mínimo."
        )
    else:
        educational_tip = (
            "Según tus datos actuales, una opción prudente sería considerar diversificar: "
            "podrías explorar distribuir tus fondos entre productos de distinto plazo y liquidez "
            "para equilibrar rendimiento y acceso al capital."
        )

    safety_disclaimer = (
        "Esta información es de carácter educativo. "
        "No constituye asesoramiento financiero personalizado."
    )

    return AgentCoachResponse(
        context=ctx,
        next_best_move=move,
        income_insight=income_insight,
        liquidity_insight=liquidity_insight,
        subscription_insight=subscription_insight,
        educational_tip=educational_tip,
        safety_disclaimer=safety_disclaimer,
    )
