export interface InvestmentStreak {
  productName: string
  investedAmount: number
  annualYieldRate: number
  currentStreakDays: number
  targetStreakDays: number
  currency: string
}

// MOCK — reemplazar con datos del backend cuando esté disponible
export const MOCK_INVESTMENT_STREAK: InvestmentStreak = {
  productName: 'Fondo Money Market',
  investedAmount: 200000,
  annualYieldRate: 0.72,
  currentStreakDays: 14,
  targetStreakDays: 30,
  currency: 'ARS',
}

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

const fmtDays = (n: number) => `${n} ${n === 1 ? 'día' : 'días'}`

interface MetricBlockProps {
  label: string
  value: string
  accent?: boolean
  highlight?: string
}

function MetricBlock({ label, value, accent, highlight }: MetricBlockProps) {
  return (
    <div className="streak-metric">
      <p className="streak-metric-label">{label}</p>
      <p
        className="streak-metric-value"
        style={accent ? { color: 'var(--accent-teal)' } : undefined}
      >
        {value}
      </p>
      {highlight && <p className="streak-metric-hint">{highlight}</p>}
    </div>
  )
}

interface Props {
  streak?: InvestmentStreak
}

export default function InvestmentStreakCard({ streak = MOCK_INVESTMENT_STREAK }: Props) {
  const {
    productName,
    investedAmount,
    annualYieldRate,
    currentStreakDays,
    targetStreakDays,
  } = streak

  const dailyYieldRate = annualYieldRate / 365
  const accumulatedReturn = investedAmount * dailyYieldRate * currentStreakDays
  const projectedReturnAtTarget = investedAmount * dailyYieldRate * targetStreakDays
  const remainingDays = targetStreakDays - currentStreakDays
  const additionalProjectedReturn = projectedReturnAtTarget - accumulatedReturn
  const progressPercentage = Math.min((currentStreakDays / targetStreakDays) * 100, 100)

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          🔥 Racha de Rendimiento
        </div>
        <span style={{
          padding: '4px 12px',
          background: 'rgba(0,200,150,.1)',
          border: '1px solid rgba(0,200,150,.25)',
          borderRadius: 20,
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--accent-teal)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {currentStreakDays} de {targetStreakDays} días
        </span>
      </div>

      <p className="section-subtitle" style={{ marginBottom: 16 }}>
        Tu plata lleva <strong style={{ color: 'var(--text-primary)' }}>{fmtDays(currentStreakDays)}</strong> trabajando en {productName}.
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Progreso hacia la meta</span>
        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
          {progressPercentage.toFixed(0)}%
        </span>
      </div>
      <div className="streak-progress">
        <div
          className="streak-progress-fill"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={currentStreakDays}
          aria-valuemin={0}
          aria-valuemax={targetStreakDays}
        />
      </div>

      {/* Metrics grid */}
      <div className="streak-grid">
        <MetricBlock
          label="Racha actual"
          value={fmtDays(currentStreakDays)}
        />
        <MetricBlock
          label="Monto invertido"
          value={fmtARS(investedAmount)}
        />
        <MetricBlock
          label="Generado hasta hoy"
          value={`+${fmtARS(accumulatedReturn)}`}
          accent
          highlight="estimado"
        />
        <MetricBlock
          label={`Proyección a ${targetStreakDays} días`}
          value={`+${fmtARS(projectedReturnAtTarget)}`}
          highlight="estimado"
        />
      </div>

      {/* Motivational callout */}
      <div className="streak-callout">
        <span style={{ fontSize: '1rem', marginRight: 8 }}>💸</span>
        <span style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Si mantenés esta racha{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{fmtDays(remainingDays)} más</strong>,
          podrías generar aproximadamente{' '}
          <strong style={{ color: 'var(--accent-teal)' }}>{fmtARS(additionalProjectedReturn)} adicionales</strong>.
        </span>
      </div>

      {/* Disclaimer */}
      <p style={{
        margin: 0,
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        lineHeight: 1.5,
        borderTop: '1px solid var(--border)',
        paddingTop: 12,
      }}>
        Los rendimientos son estimados y pueden variar según el producto financiero elegido.
        No constituyen asesoramiento financiero ni garantía de ganancia.
      </p>
    </div>
  )
}
