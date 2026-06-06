import type { DashboardData } from './api'

export const mockDashboard: DashboardData = {
  user_id: 'demo',
  summary: {
    income: 850000,
    expenses: 670000,
    net_cash_flow: 180000,
    current_balance: 180000,
    savings_rate: 0.2118,
    financial_health_label: 'stable',
    currency: 'ARS',
    period: 'Mayo 2026',
  },
  cash_flow: [
    { date: '2026-05-01', income: 850000, expenses: 0,     running_balance: 850000 },
    { date: '2026-05-04', income: 0,      expenses: 80000, running_balance: 770000 },
    { date: '2026-05-08', income: 0,      expenses: 80000, running_balance: 690000 },
    { date: '2026-05-11', income: 0,      expenses: 90000, running_balance: 600000 },
    { date: '2026-05-15', income: 0,      expenses: 90000, running_balance: 510000 },
    { date: '2026-05-18', income: 0,      expenses: 80000, running_balance: 430000 },
    { date: '2026-05-22', income: 0,      expenses: 90000, running_balance: 340000 },
    { date: '2026-05-25', income: 0,      expenses: 80000, running_balance: 260000 },
    { date: '2026-05-29', income: 0,      expenses: 80000, running_balance: 180000 },
  ],
  category_breakdown: [
    { category: 'Transferencias', amount: 200000, percentage: 29.85 },
    { category: 'Supermercados',  amount: 189700, percentage: 28.31 },
    { category: 'Servicios',      amount: 121900, percentage: 18.19 },
    { category: 'Transporte',     amount: 85500,  percentage: 12.76 },
    { category: 'Suscripciones',  amount: 42900,  percentage: 6.40  },
    { category: 'Salud',          amount: 30000,  percentage: 4.48  },
  ],
  top_merchants: [
    { merchant: 'Transferencia CBU',      amount: 120000, category: 'Transferencias', transactions: 3 },
    { merchant: 'Mercado Pago',           amount: 98000,  category: 'Servicios',      transactions: 8 },
    { merchant: 'Coto Digital',           amount: 87000,  category: 'Supermercados',  transactions: 5 },
    { merchant: 'Carrefour Market',       amount: 65000,  category: 'Supermercados',  transactions: 4 },
    { merchant: 'Transferencia familiar', amount: 80000,  category: 'Transferencias', transactions: 2 },
  ],
  alerts: [
    {
      alert_id: 'alert_001',
      type: 'liquidity_review',
      severity: 'medium',
      title: 'Revisión de liquidez recomendada',
      message: 'Tu saldo disponible podría optimizarse. Considerá distribuir tus fondos entre productos de mayor rendimiento.',
      action: 'Ver recomendaciones',
    },
    {
      alert_id: 'alert_002',
      type: 'recurring_spend',
      severity: 'low',
      title: 'Gasto recurrente identificado',
      message: 'Detectamos $42.900 en suscripciones mensuales. Revisá si todas están activas y en uso.',
      action: 'Ver desglose',
    },
  ],
  recommendation: {
    title: 'Optimizá tu dinero disponible',
    description: 'Tenés $180.000 disponibles. Comparamos las mejores alternativas según tu perfil.',
    product_ids: ['liquid_balance_ars', 'daily_yield_ars', 'fixed_term_30d_ars'],
    disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero.',
    cta: 'Simular distribución',
  },
  educational_cards: [
    {
      card_id: 'edu_001',
      title: '¿Qué es la liquidez?',
      content:
        'La liquidez es la capacidad de convertir tus activos en dinero disponible rápidamente. Un fondo líquido te permite hacer frente a gastos imprevistos sin penalidades ni demoras.',
      icon: '💧',
      category: 'liquidez',
    },
    {
      card_id: 'edu_002',
      title: 'Flujo de caja positivo',
      content:
        'Tu flujo de caja es la diferencia entre lo que ingresa y lo que gastás. Con un flujo positivo de $180.000, estás generando ahorro real. Mantener este hábito es clave para la salud financiera.',
      icon: '📈',
      category: 'flujo_de_caja',
    },
  ],
  simulator_defaults: {
    available_amount: 180000,
    time_horizon_days: 30,
    liquidity_need: 'medium',
    risk_preference: 'low',
  },
}
