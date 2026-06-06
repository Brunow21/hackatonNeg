import type { Summary } from '../api'

interface Props {
  summary: Summary
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

export default function KPICards({ summary }: Props) {
  const cards = [
    {
      label: 'Ingresos',
      value: fmt(summary.income),
      icon: '📥',
      color: 'var(--accent-teal)',
      trend: 'Período: ' + summary.period,
    },
    {
      label: 'Gastos totales',
      value: fmt(summary.expenses),
      icon: '📤',
      color: 'var(--accent-red)',
      trend: `${(100 - summary.savings_rate * 100).toFixed(1)}% del ingreso`,
    },
    {
      label: 'Balance neto',
      value: fmt(summary.current_balance),
      icon: '💰',
      color: 'var(--accent-blue)',
      trend: `Flujo neto: ${fmt(summary.net_cash_flow)}`,
    },
    {
      label: 'Tasa de ahorro',
      value: `${(summary.savings_rate * 100).toFixed(2)}%`,
      icon: '📊',
      color: 'var(--accent-purple)',
      trend: `Estado: ${summary.financial_health_label}`,
    },
  ]

  return (
    <div className="grid-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="card kpi-card"
          style={{ borderTop: `3px solid ${card.color}`, marginBottom: 0 }}
        >
          <div className="kpi-icon">{card.icon}</div>
          <div className="kpi-label">{card.label}</div>
          <div className="kpi-value" style={{ color: card.color }}>
            {card.value}
          </div>
          <div className="kpi-trend">{card.trend}</div>
        </div>
      ))}
    </div>
  )
}
