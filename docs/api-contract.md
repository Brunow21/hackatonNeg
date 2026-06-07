# API Contract — VirtualFinance / WealthLens API

Versión: 1.0.0  
Base URL: `http://localhost:8000`  
Prefix: `/v1/users/{user_id}`

---

## Convenciones generales

- Todos los endpoints devuelven JSON.
- `user_id` inválido o desconocido → HTTP 404.
- Sin auth en MVP (hackathon).
- Datos de prueba disponibles para `user_id`: `demo`, `cande`, `franco`, `cata`.

---

## Endpoints existentes

### Health

```
GET /health
```

Response:
```json
{ "status": "ok" }
```

---

### Dashboard

```
GET /v1/users/{user_id}/dashboard
GET /v1/users/{user_id}/summary
GET /v1/users/{user_id}/cash-flow
GET /v1/users/{user_id}/category-breakdown
GET /v1/users/{user_id}/top-merchants
GET /v1/users/{user_id}/alerts
GET /v1/users/{user_id}/recommendation
```

---

### Simulator

```
POST /v1/users/{user_id}/simulate
```

Body:
```json
{
  "available_amount": 180000,
  "liquidity_need": "medium",
  "time_horizon_days": 30,
  "risk_preference": "low"
}
```

---

### Financial Data

```
POST /v1/financial-data
GET  /v1/financial-data/{user_id}
GET  /v1/financial-data/{user_id}/products
```

---

## AI Financial Coach Contract

> Esta sección documenta los endpoints planificados para el AI Financial Coach.
> Los marcados como ✅ ya están implementados. Los marcados como 📋 son planificados.

---

### ✅ Agent Context

```
GET /v1/users/{user_id}/agent/context
```

Devuelve el contexto financiero estructurado que se pasaría a la LLM. No incluye datos personales sensibles.

Response schema: `FinancialAgentContext`

```json
{
  "user_id": "demo",
  "period": "Mayo 2026",
  "income": 850000.0,
  "expenses": 670000.0,
  "current_balance": 180000.0,
  "saving_capacity": 180000.0,
  "expense_ratio": 0.7882,
  "projected_eom_balance": 153000.0,
  "liquidity_need": "medium",
  "top_categories": ["Transferencias", "Supermercados", "Servicios"],
  "subscriptions_amount": 42900.0,
  "available_product_ids": ["liquid_balance_ars", "daily_yield_ars", "fixed_term_30d_ars"],
  "insufficient_data": false
}
```

---

### ✅ Next Best Financial Move

```
GET /v1/users/{user_id}/agent/next-best-move
```

Recomendación principal determinística. No requiere LLM.

Response schema: `NextBestMove`

```json
{
  "suggested_action": "daily_yield",
  "suggested_product_id": "daily_yield_ars",
  "suggested_amount": 72000.0,
  "confidence": "medium",
  "why": "Según tus datos actuales, podrías explorar rendimiento diario...",
  "what_to_avoid": "No mover todo el saldo si hay gastos próximos.",
  "evidence": [
    { "label": "Capacidad de ahorro", "value": "$180,000", "source": "summary" },
    { "label": "Saldo proyectado fin de mes", "value": "$153,000", "source": "context" }
  ]
}
```

Valores posibles de `suggested_action`:
- `daily_yield` — mover excedente a rendimiento diario
- `fixed_term` — considerar plazo fijo
- `keep_liquid` — mantener saldo disponible
- `reduce_expenses` — ratio de gastos alto, priorizar reducción
- `insufficient_data` — no hay datos suficientes para recomendar

---

### ✅ AI Coach (respuesta completa)

```
GET /v1/users/{user_id}/agent/coach
```

Respuesta completa del agente con contexto + recomendación + insights educativos.

Response schema: `AgentCoachResponse`

```json
{
  "context": { "...": "FinancialAgentContext" },
  "next_best_move": { "...": "NextBestMove" },
  "income_insight": "Este mes registraste ingresos por $850,000...",
  "liquidity_insight": "Tu saldo proyectado a fin de mes es $153,000...",
  "subscription_insight": "Se detectaron $42,900 en suscripciones...",
  "educational_tip": "Una opción prudente sería buscar el balance entre liquidez y rendimiento...",
  "safety_disclaimer": "Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado."
}
```

---

### 📋 Why am I seeing this?

```
GET /v1/users/{user_id}/agent/why-this
```

Explicación estructurada de por qué se muestra la recomendación actual.

Response schema: `WhyThisResponse`

```json
{
  "title": "¿Por qué ves esta recomendación?",
  "short_explanation": "Detectamos un ingreso extra, pero también gastos próximos...",
  "evidence_items": [
    { "label": "Ingreso extra detectado", "value": "$95.000", "source": "income_patterns" },
    { "label": "Gastos próximos", "value": "$42.000", "source": "expense_patterns" }
  ],
  "metrics_used": ["saving_capacity", "expense_ratio", "projected_eom_balance"],
  "products_considered": ["daily_yield_ars"],
  "products_not_considered": [
    { "product": "fixed_term_30d_ars", "reason": "El usuario necesita liquidez alta." }
  ],
  "safety_notes": ["No se recomienda bloquear todo el saldo si hay gastos próximos."]
}
```

---

### 📋 Income Pattern AI

```
GET /v1/users/{user_id}/agent/income-patterns
```

Análisis del patrón de ingresos del usuario.

Response schema: `IncomePatternsResponse`

```json
{
  "regular_income_detected": true,
  "usual_income_days": [1, 5],
  "income_frequency": "monthly",
  "variable_income": false,
  "average_income": 850000.0,
  "income_windows": [{ "day_from": 1, "day_to": 5, "probability": 0.9 }],
  "extra_income_detected": false,
  "extra_income_amount": null,
  "extra_income_date": null,
  "explanation": "Detectamos que tus ingresos principales suelen llegar entre el día 1 y 5.",
  "recommended_timing": "Los primeros días del mes son el mejor momento para separar excedentes.",
  "confidence": "medium",
  "evidence": []
}
```

---

### 📋 Liquidity Guard

```
GET /v1/users/{user_id}/agent/liquidity-guard
```

Evaluación de si el usuario debería mantener saldo líquido antes de mover dinero.

Response schema: `LiquidityGuardResponse`

```json
{
  "liquidity_need": "medium",
  "should_keep_liquid": true,
  "minimum_liquid_amount": 90000.0,
  "reason": "Tenés gastos próximos estimados que requieren saldo disponible.",
  "upcoming_expenses": [
    { "category": "Suscripciones", "amount": 42900.0, "estimated_days": 5 }
  ],
  "safety_notes": ["No mover todo el saldo a productos con liquidez de 30 días."],
  "evidence": []
}
```

---

### 📋 Subscription Radar

```
GET /v1/users/{user_id}/agent/subscription-radar
```

Detección de suscripciones y gastos recurrentes próximos.

Response schema: `SubscriptionRadarResponse`

```json
{
  "subscriptions_detected": true,
  "upcoming_subscriptions": [
    { "name": "Suscripciones detectadas", "amount": 42900.0, "estimated_date": "2026-06-05" }
  ],
  "total_upcoming_amount": 42900.0,
  "next_subscription_date": "2026-06-05",
  "explanation": "Detectamos $42,900 en cargos recurrentes próximos.",
  "suggested_action": "keep_liquid",
  "confidence": "medium",
  "evidence": []
}
```

---

### 📋 Payday Plan

```
GET /v1/users/{user_id}/agent/payday-plan
```

Plan paso a paso para organizar el dinero cuando llega un ingreso fuerte.

Response schema: `PaydayPlanResponse`

```json
{
  "title": "Tu plan para este ingreso",
  "income_event_detected": true,
  "income_amount": 850000.0,
  "income_date": "2026-05-01",
  "plan_steps": [
    {
      "step_number": 1,
      "title": "Reservar gastos próximos",
      "description": "Separar el monto necesario para cubrir gastos de los próximos 30 días.",
      "amount": 670000.0,
      "action_type": "reserve"
    },
    {
      "step_number": 2,
      "title": "Mantener fondo de liquidez",
      "description": "Conservar una parte disponible para imprevistos.",
      "amount": 54000.0,
      "action_type": "keep_liquid"
    },
    {
      "step_number": 3,
      "title": "Destinar excedente a rendimiento",
      "description": "Podrías explorar mover el excedente a un producto de rendimiento diario.",
      "amount": 72000.0,
      "action_type": "daily_yield"
    }
  ],
  "suggested_split": {
    "liquid": 54000.0,
    "daily_yield": 72000.0,
    "fixed_term": 0.0
  },
  "warnings": [],
  "evidence": [],
  "confidence": "medium"
}
```

---

### 📋 AI Coach con LLM real

```
GET /v1/users/{user_id}/agent/ai-coach
```

Respuesta enriquecida por LLM real (si `LLM_ENABLED=true` y `OPENAI_API_KEY` está configurado).
Usa fallback mock si la LLM no está disponible o falla la validación.

Response schema: `AIInsightResponse`

```json
{
  "main_insight": "...",
  "next_best_move_text": "...",
  "income_pattern_text": "...",
  "extra_income_text": null,
  "liquidity_guard_text": "...",
  "product_fit_text": "...",
  "what_to_avoid": "...",
  "educational_cards": [],
  "evidence": [],
  "confidence": "medium",
  "safety_status": "ok",
  "llm_used": false
}
```

---

### 📋 Scenario Agent

```
POST /v1/users/{user_id}/agent/scenario
```

Simula una decisión del usuario y el agente explica el resultado.

Request body:
```json
{
  "scenario_type": "separate_money",
  "amount": 120000,
  "liquidity_need": "high",
  "time_horizon_days": 30,
  "risk_preference": "low"
}
```

Response schema: `ScenarioAgentResponse`

```json
{
  "scenario_summary": "Querés separar $120,000 con liquidez alta a 30 días.",
  "recommended_split": {
    "liquid": 72000.0,
    "daily_yield": 48000.0,
    "fixed_term": 0.0
  },
  "explanation": "Dado que necesitás liquidez alta, conviene mantener la mayoría disponible...",
  "what_changes": ["Mayor disponibilidad de saldo.", "Menor rendimiento esperado."],
  "what_to_avoid": "No mover todo el monto a plazo fijo si necesitás acceso rápido.",
  "product_fit": [
    { "product_id": "liquid_balance_ars", "fit": "high", "reason": "Liquidez inmediata." },
    { "product_id": "daily_yield_ars", "fit": "medium", "reason": "Liquidez en 24hs." }
  ],
  "evidence": [],
  "confidence": "medium"
}
```

---

## Reglas de validación (guardrails del backend)

Todas las respuestas del agente pasan por estas validaciones antes de salir al frontend:

| Validación                  | Regla                                                              |
|-----------------------------|--------------------------------------------------------------------|
| `validate_allowed_product`  | `suggested_product_id` debe estar en `available_products`         |
| `validate_suggested_amount` | No puede superar `saving_capacity` ni `current_balance`           |
| `validate_evidence`         | `evidence` no puede estar vacío si `confidence != low`            |
| `validate_forbidden_phrases`| Detectar y eliminar frases de asesoramiento directo               |
| `validate_confidence`       | Si `insufficient_data = true` → `confidence = low`                |
| `validate_product_limits`   | Si `fixed_term` no está en `available_products` → no mencionarlo  |

---

## Errores comunes

| HTTP | Causa                                      |
|------|--------------------------------------------|
| 404  | `user_id` no reconocido                    |
| 422  | Body inválido (POST endpoints)             |
| 500  | Error interno del backend                  |
