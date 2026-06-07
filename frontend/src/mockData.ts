import type { DashboardData } from './api'

const candeDashboard: DashboardData = {
  user_id: 'cande',
  summary: {
    income: 180000, expenses: 165000, net_cash_flow: 15000, current_balance: 15000,
    savings_rate: 0.0833, financial_health_label: 'En riesgo', currency: 'ARS', period: 'Mayo 2026',
  },
  cash_flow: [
    { date: '2026-05-01', income: 180000, expenses: 0,     running_balance: 180000 },
    { date: '2026-05-04', income: 0,      expenses: 18000, running_balance: 162000 },
    { date: '2026-05-08', income: 0,      expenses: 20000, running_balance: 142000 },
    { date: '2026-05-11', income: 0,      expenses: 22000, running_balance: 120000 },
    { date: '2026-05-15', income: 0,      expenses: 22000, running_balance: 98000  },
    { date: '2026-05-18', income: 0,      expenses: 20000, running_balance: 78000  },
    { date: '2026-05-22', income: 0,      expenses: 23000, running_balance: 55000  },
    { date: '2026-05-25', income: 0,      expenses: 20000, running_balance: 35000  },
    { date: '2026-05-29', income: 0,      expenses: 20000, running_balance: 15000  },
  ],
  category_breakdown: [
    { category: 'Delivery y comida', amount: 45000, percentage: 27.27 },
    { category: 'Suscripciones',     amount: 35000, percentage: 21.21 },
    { category: 'Transporte',        amount: 30000, percentage: 18.18 },
    { category: 'Indumentaria',      amount: 25000, percentage: 15.15 },
    { category: 'Entretenimiento',   amount: 20000, percentage: 12.12 },
    { category: 'Salud',             amount: 10000, percentage: 6.07  },
  ],
  top_merchants: [
    { merchant: 'Rappi',             amount: 32000, category: 'Delivery',      transactions: 12 },
    { merchant: 'Cabify / Uber',     amount: 22000, category: 'Transporte',    transactions: 18 },
    { merchant: 'Zara / H&M',        amount: 25000, category: 'Indumentaria',  transactions: 3  },
    { merchant: 'Spotify + Netflix', amount: 18000, category: 'Suscripciones', transactions: 2  },
    { merchant: "McDonald's",        amount: 13000, category: 'Comida',        transactions: 8  },
  ],
  alerts: [
    { alert_id: 'cande_a1', type: 'emergency_fund_low',  severity: 'high',   title: 'Fondo de emergencia inexistente',  message: 'Solo tenés $15.000 disponibles. Lo mínimo recomendado es 3 meses de gastos. Cualquier imprevisto puede generarte deuda.', action: 'Ver cómo empezar' },
    { alert_id: 'cande_a2', type: 'subscription_overload', severity: 'medium', title: 'Suscripciones al límite', message: 'Gastás $35.000/mes en suscripciones — el 21% de tus ingresos. Revisá cuáles realmente usás.', action: 'Ver desglose' },
  ],
  recommendation: {
    title: 'Empezá a ahorrar desde hoy',
    description: 'Incluso separando el 10% de tu sueldo al inicio de cada mes hacés la diferencia. Comenzá con un fondo líquido y sumá rendimiento diario.',
    product_ids: ['liquid_balance_ars', 'daily_yield_ars'],
    disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero.',
    cta: 'Simular mi primer ahorro',
  },
  educational_cards: [
    { card_id: 'cande_e1', title: '¿Qué es un fondo de emergencia?', content: 'Es dinero guardado para cubrir gastos imprevistos sin endeudarte. La regla de oro: tener entre 3 y 6 meses de gastos disponibles. No necesitás tenerlo todo de una — empezá de a poco.', icon: '🛟', category: 'ahorro' },
    { card_id: 'cande_e2', title: 'El poder de empezar joven', content: 'Si empezás a ahorrar $10.000 por mes a los 20 años, a los 40 tenés mucho más que alguien que empezó a los 30 con el doble. El tiempo es tu mayor activo financiero.', icon: '⏳', category: 'inversion' },
  ],
  simulator_defaults: { available_amount: 15000, time_horizon_days: 30, liquidity_need: 'high', risk_preference: 'low' },
}

const francoDashboard: DashboardData = {
  user_id: 'franco',
  summary: {
    income: 1800000, expenses: 1100000, net_cash_flow: 700000, current_balance: 700000,
    savings_rate: 0.3889, financial_health_label: 'Excelente', currency: 'ARS', period: 'Mayo 2026',
  },
  cash_flow: [
    { date: '2026-05-01', income: 1800000, expenses: 0,      running_balance: 1800000 },
    { date: '2026-05-04', income: 0,       expenses: 130000, running_balance: 1670000 },
    { date: '2026-05-08', income: 0,       expenses: 135000, running_balance: 1535000 },
    { date: '2026-05-11', income: 0,       expenses: 140000, running_balance: 1395000 },
    { date: '2026-05-15', income: 0,       expenses: 140000, running_balance: 1255000 },
    { date: '2026-05-18', income: 0,       expenses: 135000, running_balance: 1120000 },
    { date: '2026-05-22', income: 0,       expenses: 140000, running_balance: 980000  },
    { date: '2026-05-25', income: 0,       expenses: 140000, running_balance: 840000  },
    { date: '2026-05-29', income: 0,       expenses: 140000, running_balance: 700000  },
  ],
  category_breakdown: [
    { category: 'Expensas y hogar',       amount: 275000, percentage: 25.00 },
    { category: 'Supermercados',          amount: 220000, percentage: 20.00 },
    { category: 'Salud y prepagas',       amount: 198000, percentage: 18.00 },
    { category: 'Viajes y ocio',          amount: 165000, percentage: 15.00 },
    { category: 'Restaurantes',           amount: 132000, percentage: 12.00 },
    { category: 'Servicios profesionales',amount: 110000, percentage: 10.00 },
  ],
  top_merchants: [
    { merchant: 'Swiss Medical',       amount: 198000, category: 'Salud',         transactions: 1  },
    { merchant: 'Expensas edificio',   amount: 200000, category: 'Hogar',         transactions: 1  },
    { merchant: 'Jumbo / Carrefour',   amount: 150000, category: 'Supermercados', transactions: 6  },
    { merchant: 'Despegar.com',        amount: 120000, category: 'Viajes',        transactions: 2  },
    { merchant: 'Restaurantes varios', amount: 132000, category: 'Gastronomía',   transactions: 14 },
  ],
  alerts: [
    { alert_id: 'franco_a1', type: 'retirement_planning', severity: 'medium', title: 'Oportunidad de planificación para el retiro', message: 'A ~12 años del retiro estimado, es el momento ideal para diversificar hacia instrumentos de largo plazo y maximizar el capital acumulado.', action: 'Ver opciones de inversión' },
    { alert_id: 'franco_a2', type: 'healthcare_review',   severity: 'low',    title: 'Gasto en salud: 18% del total', message: 'Tu prepaga representa $198.000 mensuales. Comparar planes alternativos podría liberar capital para inversión.', action: 'Revisar cobertura' },
  ],
  recommendation: {
    title: 'Maximizá tu capital para el retiro',
    description: 'Tenés $700.000 disponibles. A 12 años del retiro, una estrategia diversificada entre liquidez, rendimiento y largo plazo puede marcar una diferencia significativa.',
    product_ids: ['fixed_term_30d_ars', 'daily_yield_ars', 'liquid_balance_ars'],
    disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero.',
    cta: 'Simular mi estrategia',
  },
  educational_cards: [
    { card_id: 'franco_e1', title: 'Planificación para el retiro', content: 'A 12 años del retiro, cada peso invertido hoy tiene tiempo de multiplicarse. Diversificar entre instrumentos de corto, mediano y largo plazo reduce el riesgo y maximiza el rendimiento acumulado.', icon: '🏖️', category: 'retiro' },
    { card_id: 'franco_e2', title: 'Diversificación de portafolio', content: 'No poner todos los activos en el mismo instrumento reduce la exposición al riesgo. Una mezcla de liquidez, rendimiento diario y plazo fijo permite cubrir imprevistos sin sacrificar el largo plazo.', icon: '🎯', category: 'inversion' },
  ],
  simulator_defaults: { available_amount: 700000, time_horizon_days: 90, liquidity_need: 'low', risk_preference: 'medium' },
}

const cataDashboard: DashboardData = {
  user_id: 'cata',
  summary: {
    income: 650000, expenses: 590000, net_cash_flow: 60000, current_balance: 60000,
    savings_rate: 0.0923, financial_health_label: 'Estable', currency: 'ARS', period: 'Mayo 2026',
  },
  cash_flow: [
    { date: '2026-05-01', income: 650000, expenses: 0,     running_balance: 650000 },
    { date: '2026-05-04', income: 0,      expenses: 75000, running_balance: 575000 },
    { date: '2026-05-08', income: 0,      expenses: 75000, running_balance: 500000 },
    { date: '2026-05-11', income: 0,      expenses: 75000, running_balance: 425000 },
    { date: '2026-05-15', income: 0,      expenses: 75000, running_balance: 350000 },
    { date: '2026-05-18', income: 0,      expenses: 70000, running_balance: 280000 },
    { date: '2026-05-22', income: 0,      expenses: 80000, running_balance: 200000 },
    { date: '2026-05-25', income: 0,      expenses: 70000, running_balance: 130000 },
    { date: '2026-05-29', income: 0,      expenses: 70000, running_balance: 60000  },
  ],
  category_breakdown: [
    { category: 'Supermercados',          amount: 188800, percentage: 32.00 },
    { category: 'Educación',              amount: 129800, percentage: 22.00 },
    { category: 'Salud',                  amount: 106200, percentage: 18.00 },
    { category: 'Servicios',              amount: 88500,  percentage: 15.00 },
    { category: 'Transporte',             amount: 47200,  percentage: 8.00  },
    { category: 'Entretenimiento familiar',amount: 29500,  percentage: 5.00  },
  ],
  top_merchants: [
    { merchant: 'Cuota escolar',     amount: 129800, category: 'Educación',     transactions: 1 },
    { merchant: 'Carrefour / Disco', amount: 120000, category: 'Supermercados', transactions: 8 },
    { merchant: 'OSDE familiar',     amount: 106200, category: 'Salud',         transactions: 1 },
    { merchant: 'Expensas',          amount: 70000,  category: 'Servicios',     transactions: 1 },
    { merchant: 'YPF / Shell',       amount: 40000,  category: 'Transporte',    transactions: 5 },
  ],
  alerts: [
    { alert_id: 'cata_a1', type: 'education_cost_planning', severity: 'medium', title: 'Cuotas escolares: 22% del presupuesto', message: 'La educación es tu segundo gasto más alto. Planificar el ciclo lectivo con anticipación te ayuda a distribuir el impacto.', action: 'Ver planificación educativa' },
    { alert_id: 'cata_a2', type: 'savings_below_target',    severity: 'medium', title: 'Ahorro por debajo del objetivo familiar', message: 'Tu tasa de ahorro del 9.2% está por debajo del 15% recomendado para familias. Pequeños ajustes en supermercados pueden acercar ese número.', action: 'Ver oportunidades' },
  ],
  recommendation: {
    title: 'Protegé los gastos de tu familia',
    description: 'Tenés $60.000 disponibles. Priorizar un fondo de emergencia familiar te da tranquilidad ante imprevistos — desde un gasto médico hasta una reparación del hogar.',
    product_ids: ['liquid_balance_ars', 'daily_yield_ars'],
    disclaimer: 'Esta información es de carácter educativo. No constituye asesoramiento financiero.',
    cta: 'Simular fondo familiar',
  },
  educational_cards: [
    { card_id: 'cata_e1', title: 'El presupuesto familiar', content: 'Llevar un presupuesto familiar no significa privarse — significa decidir a dónde va cada peso antes de que se gaste solo. Con ingresos ajustados, cada peso ahorrado es una decisión activa.', icon: '🏠', category: 'presupuesto' },
    { card_id: 'cata_e2', title: 'Fondo educativo para tus hijos', content: 'Los costos educativos crecen anualmente por encima de la inflación. Separar un pequeño monto mensual en un instrumento de rendimiento diario puede cubrir la matrícula del próximo año sin sentir el impacto.', icon: '📚', category: 'educacion' },
  ],
  simulator_defaults: { available_amount: 60000, time_horizon_days: 30, liquidity_need: 'medium', risk_preference: 'low' },
}

export const mockDashboards: Record<string, DashboardData> = {
  cande:  candeDashboard,
  franco: francoDashboard,
  cata:   cataDashboard,
}

export const mockDashboard = candeDashboard
