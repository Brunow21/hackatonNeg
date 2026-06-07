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
