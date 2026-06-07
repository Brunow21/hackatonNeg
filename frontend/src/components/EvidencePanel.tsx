import type { AgentCoachResponse } from '../api'

interface Props {
  coach: AgentCoachResponse | null
}

const LIQUIDITY_LABEL: Record<string, string> = { high: 'Alta', medium: 'Media', low: 'Baja' }

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

export default function EvidencePanel({ coach }: Props) {
  if (!coach) return null

  const { context: ctx, next_best_move: move } = coach

  const metrics: { label: string; value: string; source: string }[] = [
    { label: 'Ingresos del período',        value: `$${fmt(ctx.income)}`,                          source: 'summary' },
    { label: 'Gastos del período',           value: `$${fmt(ctx.expenses)}`,                        source: 'summary' },
    { label: 'Saldo actual',                value: `$${fmt(ctx.current_balance)}`,                 source: 'summary' },
    { label: 'Capacidad de ahorro',         value: `$${fmt(ctx.saving_capacity)}`,                 source: 'context' },
    { label: 'Ratio de gastos',             value: `${(ctx.expense_ratio * 100).toFixed(2)}%`,    source: 'context' },
    { label: 'Saldo proyectado (fin mes)',   value: `$${fmt(ctx.projected_eom_balance)}`,           source: 'context' },
    { label: 'Necesidad de liquidez',       value: LIQUIDITY_LABEL[ctx.liquidity_need] ?? ctx.liquidity_need, source: 'context' },
    { label: 'Suscripciones mensuales',     value: `$${fmt(ctx.subscriptions_amount)}`,            source: 'context' },
  ]

  return (
    <div id="evidence-panel" className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Datos usados para esta respuesta</div>
      <p style={{ margin: '0 0 20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        El agente usó solo estos datos para generar la recomendación. Sin acceso a datos personales ni historial de transacciones crudo.
      </p>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        {metrics.map(m => (
          <div key={m.label} style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)' }}>{m.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</p>
            </div>
            <span style={{
              padding: '2px 8px',
              background: 'rgba(0,200,150,.08)', border: '1px solid rgba(0,200,150,.2)',
              borderRadius: 12, fontSize: '0.68rem', color: 'var(--accent-teal)',
              fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {m.source}
            </span>
          </div>
        ))}
      </div>

      {move.evidence.length > 0 && (
        <>
          <p style={{ margin: '0 0 12px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Evidencia específica de la recomendación
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {move.evidence.map((ev, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', background: 'var(--bg)',
                border: '1px solid var(--border)', borderRadius: 8,
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', flex: 1 }}>{ev.label}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ev.value}</span>
                <span style={{
                  padding: '2px 8px', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 12,
                  fontSize: '0.68rem', color: 'var(--text-muted)',
                }}>
                  {ev.source}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{
        padding: '10px 14px',
        background: 'rgba(0,200,150,.05)', border: '1px solid rgba(0,200,150,.15)',
        borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6,
      }}>
        {coach.safety_disclaimer}
      </div>
    </div>
  )
}
