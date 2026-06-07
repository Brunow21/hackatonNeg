# AGENTS.md — VirtualFinance / WealthLens API

Instrucciones para agentes de código (Codex, Claude Code, etc.) que trabajen en este repositorio.

---

## Producto

**VirtualFinance API** (también denominado WealthLens API) es una API B2B white-label para fintechs.

La fintech envía datos financieros del usuario final y VirtualFinance devuelve:
- dashboards estructurados
- insights calculados de forma determinística
- alertas contextuales
- simulador de distribución de capital
- recomendaciones guiadas por el AI Financial Coach

---

## Arquitectura general

```
Transactions / Wallet Data
      ↓
Backend deterministic analysis
      ↓
LLM-safe context (FinancialAgentContext)
      ↓
LLM generates educational explanation
      ↓
Backend validates LLM response (guardrails + Pydantic)
      ↓
Frontend shows insight
```

**La LLM no calcula métricas. La LLM explica patrones ya calculados.**

---

## Stack técnico

| Capa       | Tecnología                             |
|------------|----------------------------------------|
| Backend    | Python · FastAPI · SQLite · SQLAlchemy |
| Frontend   | React · TypeScript · Vite · Recharts   |
| LLM (opt.) | OpenAI API (opcional, con fallback)    |
| Auth       | No implementada (hackathon MVP)        |
| DB real    | No implementada (mock data)            |

---

## Restricciones globales del proyecto (NO VIOLAR)

1. **No agregar DB real** — usar únicamente mock data hasta que se indique lo contrario.
2. **No implementar JWT ni auth compleja** — no es parte del MVP.
3. **No romper endpoints existentes** — los endpoints actuales deben seguir funcionando.
4. **No rediseñar el frontend completo** — agregar secciones, no reemplazar lo existente.
5. **No agregar gamificación** — sin XP, rachas, badges ni puntos.
6. **No agregar productos inventados** — solo los definidos en `DEMO_AVAILABLE_PRODUCTS`.
7. **No implementar features fuera del contrato en `docs/api-contract.md`**.

Si algo parece estar fuera de estas restricciones, detener y consultar antes de continuar.

---

## AI Financial Coach — Reglas del agente LLM

### Arquitectura del agente

El agente sigue un pipeline estricto:

```
1. Backend calcula métricas (determinístico)
2. Backend construye FinancialAgentContext (datos seguros, sin PII)
3. Backend llama a LLM con ese contexto
4. LLM devuelve JSON estructurado (no texto libre)
5. Backend valida respuesta con Pydantic + guardrails
6. Si falla validación → fallback mock seguro
7. Backend devuelve respuesta validada al frontend
```

### Lo que la LLM NO puede hacer

- Calcular métricas financieras principales (ingresos, gastos, balances, ratios).
- Recibir datos personales sensibles (nombre, DNI, CUIT, email, CBU).
- Recibir transacciones crudas completas si no son necesarias.
- Inventar productos financieros no incluidos en `available_products`.
- Recomendar productos fuera de `available_products`.
- Decidir sola sin validación posterior del backend.
- Usar frases de asesoramiento financiero directo.

### Lo que la LLM SÍ puede hacer

- Explicar patrones ya calculados por el backend.
- Generar lenguaje educativo y didáctico.
- Justificar recomendaciones ya definidas por la lógica determinística.
- Adaptar el tono según el perfil del usuario.
- Generar `educational_cards` con conceptos básicos.

### Frases prohibidas (no pueden aparecer en ninguna respuesta del agente)

```
"invertí en"
"comprá"
"te garantizo"
"la mejor inversión"
"vas a ganar"
"vas a ganar seguro"
"riesgo cero"
"rendimiento asegurado"
"no podés perder"
```

### Frases permitidas

```
"podrías explorar"
"conviene comparar"
"una opción prudente sería"
"según tus datos actuales"
"priorizar liquidez"
"conviene mantener saldo disponible"
"podrías destinar una parte a"
```

### Evidencia obligatoria

- Toda recomendación del agente debe incluir al menos dos `EvidenceItem`.
- Si no hay evidencia suficiente → devolver `insufficient_data = true`.
- El campo `evidence` nunca puede estar vacío en una recomendación con `confidence != low`.

### Reglas de productos

- `suggested_product_id` debe existir en `available_products`.
- Si no existe → reemplazar por `keep_liquid` o fallback seguro.
- Si la wallet no ofrece `fixed_term` → no mencionarlo como recomendación principal.
- Si la wallet no ofrece `investments` → no mencionar inversiones de renta variable.

### Reglas de montos

- `suggested_amount` nunca puede superar `saving_capacity`.
- `suggested_amount` nunca puede superar `current_balance`.
- Si el cálculo excede → ajustar al mínimo o devolver fallback.

### Reglas de confianza

- `confidence` debe ser: `low` | `medium` | `high`.
- Si `insufficient_data = true` → `confidence` debe ser `low`.
- Si hay menos de 2 períodos de datos → `confidence = low`.

### Fallback obligatorio

- Si no existe `OPENAI_API_KEY` → usar respuesta mock segura.
- Si `LLM_ENABLED != true` → usar respuesta mock segura.
- Si la llamada LLM falla → usar respuesta mock segura.
- Si la respuesta LLM no valida con Pydantic → usar respuesta mock segura.
- El fallback mock debe usar datos reales del `FinancialAgentContext`, no strings hardcodeados.

### Tono del agente

- **Claro**: sin jerga innecesaria.
- **Didáctico**: explica conceptos con ejemplos simples.
- **Fintech / serio**: no infantil, no gamificado.
- **No alarmista**: alertas constructivas, no ansiogénicas.
- **No presionador**: nunca urgir al usuario a mover dinero.

---

## Features objetivo del AI Financial Coach

| Feature                      | Endpoint                              | Estado    |
|------------------------------|---------------------------------------|-----------|
| Agent Context                | `GET /agent/context`                  | ✅ Existe  |
| Next Best Financial Move     | `GET /agent/next-best-move`           | ✅ Existe  |
| AI Coach (respuesta completa)| `GET /agent/coach`                    | ✅ Existe  |
| Why am I seeing this?        | `GET /agent/why-this`                 | Planificado |
| Income Pattern AI            | `GET /agent/income-patterns`          | Planificado |
| Liquidity Guard              | `GET /agent/liquidity-guard`          | Planificado |
| Subscription Radar           | `GET /agent/subscription-radar`       | Planificado |
| Payday Plan                  | `GET /agent/payday-plan`              | Planificado |
| Scenario Agent               | `POST /agent/scenario`                | Planificado |
| AI Coach con LLM real        | `GET /agent/ai-coach`                 | Planificado |

---

## Variables de entorno relevantes

```env
OPENAI_API_KEY=sk-...        # Opcional. Sin esta clave, el agente usa fallback mock.
LLM_MODEL=gpt-4o-mini        # Modelo a usar. Default: gpt-4o-mini.
LLM_ENABLED=true             # Habilitar llamada real. Default: false (usa mock).
```

---

## Usuarios mock disponibles

| user_id  | Perfil                        |
|----------|-------------------------------|
| `demo`   | Usuario genérico estable      |
| `cande`  | 20 años, primera experiencia  |
| `franco` | 53 años, ejecutivo senior     |
| `cata`   | Madre, clase media            |

---

## Antes de modificar cualquier archivo

1. Leer `AGENTS.md` (este archivo).
2. Leer `docs/api-contract.md`.
3. Listar archivos a crear/modificar.
4. Listar archivos que NO se tocarán.
5. Confirmar que no se rompen endpoints existentes.
6. Mostrar plan antes de implementar.

---

## Emergency stop

Si el agente se está desviando del MVP, aplicar `PROMPT 14`:

```
Frená.
Resumí qué estabas haciendo.
Listá archivos tocados.
Decí qué parte es necesaria para el MVP.
Decí qué conviene revertir.
Esperá aprobación.
```
