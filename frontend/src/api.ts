import { mockDashboards } from './mockData'

export interface Summary {
  income: number
  expenses: number
  net_cash_flow: number
  current_balance: number
  savings_rate: number
  financial_health_label: string
  currency: string
  period: string
}

export interface CashFlowEntry {
  date: string
  income: number
  expenses: number
  running_balance: number
}

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
}

export interface TopMerchant {
  merchant: string
  amount: number
  category: string
  transactions: number
}

export interface Alert {
  alert_id: string
  type: string
  severity: string
  title: string
  message: string
  action: string
}

export interface Recommendation {
  title: string
  description: string
  product_ids: string[]
  disclaimer: string
  cta: string
}

export interface EducationalCard {
  card_id: string
  title: string
  content: string
  icon: string
  category: string
}

export interface SimulatorDefaults {
  available_amount: number
  time_horizon_days: number
  liquidity_need: string
  risk_preference: string
}

export interface DashboardData {
  user_id: string
  summary: Summary
  cash_flow: CashFlowEntry[]
  category_breakdown: CategoryBreakdown[]
  top_merchants: TopMerchant[]
  alerts: Alert[]
  recommendation: Recommendation
  educational_cards: EducationalCard[]
  simulator_defaults: SimulatorDefaults
}

export interface SimulatorInput {
  available_amount: number
  liquidity_need: 'high' | 'medium' | 'low'
  time_horizon_days: number
  risk_preference: 'low' | 'medium' | 'high'
}

export interface ProductComparison {
  product_id: string
  name: string
  allocated_amount: number
  simulated_yield: number
  annual_rate: number
  liquidity: string
  risk_level: string
}

export interface SimulatorOutput {
  user_id: string
  available_amount: number
  liquid_amount: number
  daily_yield_amount: number
  fixed_term_amount: number
  total_simulated_yield: number
  time_horizon_days: number
  explanation: string
  product_comparison: ProductComparison[]
  educational_cards: EducationalCard[]
}

export interface EvidenceItem {
  label: string
  value: string
  source: string
}

export interface FinancialAgentContext {
  user_id: string
  period: string
  income: number
  expenses: number
  current_balance: number
  saving_capacity: number
  expense_ratio: number
  projected_eom_balance: number
  liquidity_need: string
  top_categories: string[]
  subscriptions_amount: number
  available_product_ids: string[]
  insufficient_data: boolean
}

export interface NextBestMove {
  suggested_action: string
  suggested_product_id: string | null
  suggested_amount: number | null
  confidence: string
  why: string
  what_to_avoid: string
  evidence: EvidenceItem[]
}

export interface AgentCoachResponse {
  context: FinancialAgentContext
  next_best_move: NextBestMove
  income_insight: string
  liquidity_insight: string
  subscription_insight: string
  educational_tip: string
  safety_disclaimer: string
}

// FALLBACK MOCK — used when the backend is unreachable
export const MOCK_AGENT_COACHES: Record<string, AgentCoachResponse> = {
  demo: {
    context: {
      user_id: 'demo', period: 'Mayo 2026',
      income: 850000, expenses: 670000, current_balance: 180000,
      saving_capacity: 180000, expense_ratio: 0.7882,
      projected_eom_balance: 153000, liquidity_need: 'medium',
      top_categories: ['Transferencias', 'Supermercados', 'Servicios'],
      subscriptions_amount: 42900,
      available_product_ids: ['liquid_balance_ars', 'daily_yield_ars', 'fixed_term_30d_ars'],
      insufficient_data: false,
    },
    next_best_move: {
      suggested_action: 'daily_yield',
      suggested_product_id: 'daily_yield_ars',
      suggested_amount: 72000,
      confidence: 'medium',
      why: 'Según tus datos actuales, podrías explorar rendimiento diario como balance entre liquidez y rendimiento.',
      what_to_avoid: 'No mover todo el saldo si hay gastos próximos.',
      evidence: [
        { label: 'Capacidad de ahorro', value: '$180,000', source: 'summary' },
        { label: 'Saldo proyectado fin de mes', value: '$153,000', source: 'context' },
      ],
    },
    income_insight: 'Este mes registraste ingresos por $850,000, que suelen ingresar a principios del mes.',
    liquidity_insight: 'Tu saldo proyectado a fin de mes es $153,000. La necesidad de liquidez se clasifica como media.',
    subscription_insight: 'Se detectaron $42,900 en suscripciones con débito automático mensual.',
    educational_tip: 'Una opción prudente sería buscar el balance entre liquidez y rendimiento. El rendimiento diario permite acceso rápido al capital.',
    safety_disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado.',
  },
  cande: {
    context: {
      user_id: 'cande', period: 'Mayo 2026',
      income: 180000, expenses: 165000, current_balance: 15000,
      saving_capacity: 15000, expense_ratio: 0.9167,
      projected_eom_balance: 12750, liquidity_need: 'high',
      top_categories: ['Alquiler', 'Supermercados', 'Entretenimiento'],
      subscriptions_amount: 35000,
      available_product_ids: ['liquid_balance_ars', 'daily_yield_ars'],
      insufficient_data: false,
    },
    next_best_move: {
      suggested_action: 'reduce_expenses',
      suggested_product_id: null,
      suggested_amount: null,
      confidence: 'medium',
      why: 'Según tus datos actuales, tu ratio de gastos es 91.67%, lo que sugiere que una optimización de gastos es prioritaria antes de considerar productos de ahorro.',
      what_to_avoid: 'No destinar capital a productos de baja liquidez con el saldo actual.',
      evidence: [
        { label: 'Ratio de gastos', value: '91.67%', source: 'context' },
        { label: 'Saldo proyectado fin de mes', value: '$12,750', source: 'context' },
      ],
    },
    income_insight: 'Este mes registraste ingresos por $180,000, que suelen ingresar a principios del mes.',
    liquidity_insight: 'Tu saldo proyectado a fin de mes es $12,750. La necesidad de liquidez se clasifica como alta.',
    subscription_insight: 'Se detectaron $35,000 en suscripciones con débito automático mensual. Podrías revisar cuáles son necesarias.',
    educational_tip: 'Conviene comparar gastos recurrentes y evaluar cuáles generan valor real. Un pequeño ajuste puede liberar capital significativo.',
    safety_disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado.',
  },
  franco: {
    context: {
      user_id: 'franco', period: 'Mayo 2026',
      income: 1800000, expenses: 1100000, current_balance: 700000,
      saving_capacity: 700000, expense_ratio: 0.6111,
      projected_eom_balance: 595000, liquidity_need: 'low',
      top_categories: ['Transferencias', 'Restaurantes', 'Viajes'],
      subscriptions_amount: 0,
      available_product_ids: ['liquid_balance_ars', 'daily_yield_ars', 'fixed_term_30d_ars'],
      insufficient_data: false,
    },
    next_best_move: {
      suggested_action: 'fixed_term',
      suggested_product_id: 'fixed_term_30d_ars',
      suggested_amount: 210000,
      confidence: 'medium',
      why: 'Según tus datos actuales, la liquidez es baja y una opción prudente sería explorar un plazo fijo para una parte del excedente disponible.',
      what_to_avoid: 'No inmovilizar el 100% del saldo en plazo fijo si surgen gastos imprevistos.',
      evidence: [
        { label: 'Capacidad de ahorro', value: '$700,000', source: 'summary' },
        { label: 'Necesidad de liquidez', value: 'Baja', source: 'context' },
      ],
    },
    income_insight: 'Este mes registraste ingresos por $1,800,000, que suelen ingresar a principios del mes.',
    liquidity_insight: 'Tu saldo proyectado a fin de mes es $595,000. La necesidad de liquidez se clasifica como baja.',
    subscription_insight: 'No se detectaron suscripciones recurrentes significativas este período.',
    educational_tip: 'Una opción prudente sería considerar plazo fijo para maximizar el rendimiento del excedente disponible.',
    safety_disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado.',
  },
  cata: {
    context: {
      user_id: 'cata', period: 'Mayo 2026',
      income: 650000, expenses: 590000, current_balance: 60000,
      saving_capacity: 60000, expense_ratio: 0.9077,
      projected_eom_balance: 51000, liquidity_need: 'high',
      top_categories: ['Supermercados', 'Educación', 'Salud'],
      subscriptions_amount: 0,
      available_product_ids: ['liquid_balance_ars', 'daily_yield_ars'],
      insufficient_data: false,
    },
    next_best_move: {
      suggested_action: 'reduce_expenses',
      suggested_product_id: null,
      suggested_amount: null,
      confidence: 'medium',
      why: 'Según tus datos actuales, tu ratio de gastos es 90.77%, lo que sugiere que una optimización de gastos es prioritaria antes de considerar productos de ahorro.',
      what_to_avoid: 'No destinar capital a productos de baja liquidez con el saldo actual.',
      evidence: [
        { label: 'Ratio de gastos', value: '90.77%', source: 'context' },
        { label: 'Saldo proyectado fin de mes', value: '$51,000', source: 'context' },
      ],
    },
    income_insight: 'Este mes registraste ingresos por $650,000, que suelen ingresar a principios del mes.',
    liquidity_insight: 'Tu saldo proyectado a fin de mes es $51,000. La necesidad de liquidez se clasifica como alta.',
    subscription_insight: 'No se detectaron suscripciones recurrentes significativas este período.',
    educational_tip: 'Conviene comparar gastos recurrentes y evaluar cuáles generan valor real.',
    safety_disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado.',
  },
}

export const dashboardApi = {
  async getDashboard(userId: string): Promise<DashboardData> {
    try {
      const res = await fetch(`/v1/users/${userId}/dashboard`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    } catch (e) {
      console.warn('[VirtualFinance] Backend no disponible, usando datos mock:', e)
      return mockDashboards[userId] ?? mockDashboards['cande']
    }
  },

  async getCoach(userId: string): Promise<AgentCoachResponse> {
    try {
      const res = await fetch(`/v1/users/${userId}/agent/coach`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    } catch (e) {
      console.warn('[VirtualFinance] Coach no disponible, usando fallback:', e)
      return MOCK_AGENT_COACHES[userId] ?? MOCK_AGENT_COACHES['demo']
    }
  },

  async simulate(userId: string, input: SimulatorInput): Promise<SimulatorOutput> {
    const res = await fetch(`/v1/users/${userId}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  },
}
