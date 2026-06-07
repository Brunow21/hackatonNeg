import type { CashFlowEntry, CategoryBreakdown, TopMerchant, Alert } from '../api'

export interface UserBalance {
  total_ars_equiv: number
  ars: number
  usdc: number
  usd: number
  eur: number
  brl: number
}

export interface DemoUser {
  name: string
  profile: string
  period: string
  balances: UserBalance
  income_ars_equiv: number
  expenses_ars: number
  saving_capacity_ars: number
  upcoming_expenses: number
  extra_income: number
  last_exterior_income: { amount: number; currency: string; source: string }
  liquidity_need: 'high' | 'medium' | 'low'
  products: string[]
  cashFlow: CashFlowEntry[]
  categoryBreakdown: CategoryBreakdown[]
  topMerchants: TopMerchant[]
  alerts: Alert[]
  simulatorDefaults: {
    available_amount: number
    time_horizon_days: number
    liquidity_need: string
    risk_preference: string
  }
}

export const DEMO_USER: DemoUser = {
  name: 'Martina',
  profile: 'Freelancer · Diseñadora UX · Ingresos del exterior',
  period: 'Mayo 2026',
  balances: {
    total_ars_equiv: 1420000,
    ars: 320000,
    usdc: 850,
    usd: 120,
    eur: 0,
    brl: 0,
  },
  income_ars_equiv: 1250000,
  expenses_ars: 710000,
  saving_capacity_ars: 280000,
  upcoming_expenses: 85000,
  extra_income: 95000,
  last_exterior_income: { amount: 850, currency: 'USDC', source: 'Payoneer' },
  liquidity_need: 'high',
  products: [
    'Saldo disponible',
    'Rendimiento diario',
    'Cambio de moneda',
    'Tarjeta internacional',
    'Pago de servicios',
    'Recibir del exterior',
  ],
  cashFlow: [
    { date: '2026-05-01', income: 1000000, expenses: 0,      running_balance: 1000000 },
    { date: '2026-05-03', income: 0,       expenses: 110000, running_balance: 890000  },
    { date: '2026-05-07', income: 0,       expenses: 65000,  running_balance: 825000  },
    { date: '2026-05-10', income: 250000,  expenses: 0,      running_balance: 1075000 },
    { date: '2026-05-13', income: 0,       expenses: 52000,  running_balance: 1023000 },
    { date: '2026-05-16', income: 0,       expenses: 85000,  running_balance: 938000  },
    { date: '2026-05-19', income: 0,       expenses: 60000,  running_balance: 878000  },
    { date: '2026-05-22', income: 0,       expenses: 95000,  running_balance: 783000  },
    { date: '2026-05-25', income: 0,       expenses: 78000,  running_balance: 705000  },
    { date: '2026-05-28', income: 95000,   expenses: 0,      running_balance: 800000  },
    { date: '2026-05-31', income: 0,       expenses: 65000,  running_balance: 735000  },
  ],
  categoryBreakdown: [
    { category: 'Vivienda / alquiler',     amount: 110000, percentage: 15.5 },
    { category: 'Comidas y delivery',      amount: 95000,  percentage: 13.4 },
    { category: 'Servicios varios',        amount: 85000,  percentage: 12.0 },
    { category: 'Compras y misc',          amount: 78000,  percentage: 11.0 },
    { category: 'Transporte',              amount: 60000,  percentage:  8.5 },
    { category: 'Software / suscripciones',amount: 52000,  percentage:  7.3 },
    { category: 'Supermercados',           amount: 65000,  percentage:  9.2 },
    { category: 'Salud',                   amount: 45000,  percentage:  6.3 },
    { category: 'Educación',               amount: 30000,  percentage:  4.2 },
    { category: 'Otros',                   amount: 90000,  percentage: 12.7 },
  ],
  topMerchants: [
    { merchant: 'Alquiler mensual',   amount: 110000, category: 'Vivienda',      transactions: 1  },
    { merchant: 'Rappi + PedidosYa', amount: 95000,  category: 'Delivery',      transactions: 22 },
    { merchant: 'Adobe Creative',    amount: 52000,  category: 'Software',      transactions: 2  },
    { merchant: 'Carrefour / Disco', amount: 65000,  category: 'Supermercados', transactions: 7  },
    { merchant: 'Uber / Cabify',     amount: 60000,  category: 'Transporte',    transactions: 19 },
  ],
  alerts: [
    {
      alert_id: 'm_a1',
      type: 'exterior_income',
      severity: 'opportunity',
      title: 'Ingreso del exterior detectado',
      message: '850 USDC llegaron desde Payoneer. Tu coach ya analizó el mejor paso para optimizar este ingreso.',
      action: 'Ver recomendación',
    },
    {
      alert_id: 'm_a2',
      type: 'upcoming_expenses',
      severity: 'high',
      title: 'Gastos próximos esta semana',
      message: '$85.000 en gastos próximos detectados (Adobe, Netflix, celular). Tenés el saldo disponible para cubrirlos.',
      action: 'Ver detalle',
    },
    {
      alert_id: 'm_a3',
      type: 'usdc_idle',
      severity: 'medium',
      title: 'Saldo USDC disponible',
      message: 'Tenés 850 USDC disponibles. Podrías explorar opciones según tu necesidad de liquidez.',
      action: 'Explorar opciones',
    },
    {
      alert_id: 'm_a4',
      type: 'subscription',
      severity: 'medium',
      title: 'Suscripción próxima',
      message: 'Adobe Creative Cloud y Netflix se debitan en los próximos días. Asegurate de tener saldo en ARS o tarjeta habilitada.',
      action: 'Revisar suscripciones',
    },
    {
      alert_id: 'm_a5',
      type: 'extra_income',
      severity: 'opportunity',
      title: 'Ingreso extra a optimizar',
      message: 'Detectamos $95.000 de ingreso extra. Con tus gastos próximos cubiertos, una parte podría ir a rendimiento diario.',
      action: 'Ver sugerencia del coach',
    },
    {
      alert_id: 'm_a6',
      type: 'delivery_spending',
      severity: 'medium',
      title: 'Gasto alto: delivery y comidas',
      message: 'El delivery representó el 13.4% de tus gastos este mes ($95.000). Una revisión mensual puede liberar capital significativo.',
      action: 'Ver categorías',
    },
  ],
  simulatorDefaults: {
    available_amount: 280000,
    time_horizon_days: 30,
    liquidity_need: 'high',
    risk_preference: 'low',
  },
}

// Scripted responses for CoachChat
export const CHAT_RESPONSES: Record<string, string> = {
  usdc: `Recibiste 850 USDC desde Payoneer. Como tenés gastos próximos de $85.000 en pesos, una opción prudente sería convertir solo la parte que necesitás en ARS y mantener el resto disponible en USDC. Si la wallet tiene rendimiento en USDC, podrías explorar esa opción para lo que no vayas a usar de inmediato. Convertir todo al mismo tiempo no siempre es la mejor estrategia.`,

  disponible: `Según tus datos, tenés $85.000 en gastos próximos esta semana (Adobe, Netflix, celular). Con $320.000 disponibles en ARS, tenés margen. Una opción prudente sería reservar al menos ese monto en ARS y evaluar mover ~$120.000 a rendimiento diario — es accesible en 24hs si lo necesitás, y mientras tanto genera rendimiento estimado.`,

  cambio: `Depende de qué necesitás. Para cubrir tus gastos próximos ($85.000), conviene convertir solo esa parte. Convertir todo al mismo tiempo reduce tu cobertura si el tipo de cambio varía. Una opción prudente sería convertir por partes: primero lo que necesitás y mantener el resto en USDC mientras no lo precisás.`,

  ingreso: `Detectamos $95.000 de ingreso extra este mes. Como tus gastos próximos ya están cubiertos en tu saldo disponible, una opción prudente sería explorar destinar parte de ese ingreso a rendimiento diario — generás rendimiento estimado sin bloquear el capital, porque podés retirarlo en 24hs si lo necesitás.`,

  rendimiento: `Con necesidad de liquidez alta y gastos próximos esta semana, el rendimiento diario sería la opción más compatible con tu situación actual — tenés acceso al capital en 24hs. El plazo fijo bloquea el dinero por 30 días o más. Una opción prudente sería usar rendimiento diario para el excedente disponible y evaluar plazo fijo solo cuando tengas flujo más estable.`,

  gasto: `Según tus datos de mayo, el gasto más significativo fue el alquiler ($110.000, 15.5%), seguido de comidas y delivery ($95.000, 13.4%) y servicios varios ($85.000, 12%). Las herramientas de trabajo como Adobe son inversiones en tu actividad. Lo que podrías revisar es el delivery — $95.000/mes es una categoría donde ajustes pequeños pueden liberar capital mes a mes.`,

  fallback: `Podés preguntarme sobre: qué hacer con los USDC que recibiste, cuánto mantener disponible, si conviene cambiar a pesos ahora, cómo manejar el ingreso extra, la diferencia entre rendimiento diario y plazo fijo, o qué gasto te está afectando más. ¿Qué querés explorar?`,
}

export function getCoachResponse(input: string): string {
  const lc = input.toLowerCase()
  if (/usdc|payoneer|exterior|dólar|dolar/.test(lc))      return CHAT_RESPONSES.usdc
  if (/disponible|reservar|guardar|líquida|liquida/.test(lc)) return CHAT_RESPONSES.disponible
  if (/cambiar|convertir|pesos|cambio/.test(lc))          return CHAT_RESPONSES.cambio
  if (/ingreso extra|extra|bonus/.test(lc))               return CHAT_RESPONSES.ingreso
  if (/rendimiento|plazo fijo|invertir|inversión/.test(lc)) return CHAT_RESPONSES.rendimiento
  if (/gasto|afectando|categoría|categoria|delivery/.test(lc)) return CHAT_RESPONSES.gasto
  return CHAT_RESPONSES.fallback
}
