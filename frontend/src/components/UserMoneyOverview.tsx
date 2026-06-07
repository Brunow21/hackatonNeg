import { DEMO_USER } from '../data/demoUser'
import CashFlow from './CashFlow'
import SpendingHabits from './SpendingHabits'
import TopMerchants from './TopMerchants'
import Alerts from './Alerts'

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const KPI_ITEMS = [
  { label: 'Ingresos del mes',   value: fmtARS(DEMO_USER.income_ars_equiv),   color: 'var(--accent-teal)',   icon: '📥' },
  { label: 'Gastos del mes',     value: fmtARS(DEMO_USER.expenses_ars),        color: 'var(--accent-red)',    icon: '📤' },
  { label: 'Capacidad de ahorro',value: fmtARS(DEMO_USER.saving_capacity_ars), color: 'var(--accent-blue)',   icon: '💰' },
  { label: 'Ingreso exterior',   value: `${DEMO_USER.last_exterior_income.amount} ${DEMO_USER.last_exterior_income.currency}`, color: 'var(--accent-purple)', icon: '🌍' },
]

export default function UserMoneyOverview() {
  const u = DEMO_USER

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Tu dinero este mes
        </h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {u.period} · Esta sección apoya al coach, no compite con él
        </p>
      </div>

      {/* KPI row */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {KPI_ITEMS.map((k, i) => (
          <div key={i} className="card kpi-card" style={{ borderTop: `3px solid ${k.color}`, marginBottom: 0 }}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
            <div className="kpi-trend">{u.period}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2">
        <CashFlow data={u.cashFlow} />
        <SpendingHabits data={u.categoryBreakdown} />
      </div>

      {/* Top merchants + Alerts */}
      <div className="grid-2">
        <TopMerchants data={u.topMerchants} />
        <Alerts alerts={u.alerts} />
      </div>
    </div>
  )
}
