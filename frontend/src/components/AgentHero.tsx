import type { AgentCoachResponse } from '../api'

interface Props {
  coach: AgentCoachResponse | null
  loading: boolean
}

const ACTION_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  daily_yield:       { label: 'Rendimiento Diario',    color: '#00c896', bg: 'rgba(0,200,150,.12)' },
  fixed_term:        { label: 'Plazo Fijo',             color: '#5c9cff', bg: 'rgba(92,156,255,.12)' },
  keep_liquid:       { label: 'Mantener Liquidez',      color: '#f5a623', bg: 'rgba(245,166,35,.12)' },
  reduce_expenses:   { label: 'Optimizar Gastos',       color: '#ff6b6b', bg: 'rgba(255,107,107,.12)' },
  insufficient_data: { label: 'Sin datos suficientes',  color: '#888',    bg: 'rgba(136,136,136,.12)' },
}

const CONFIDENCE_MAP: Record<string, { label: string; color: string }> = {
  high:   { label: 'Confianza alta',   color: '#00c896' },
  medium: { label: 'Confianza media',  color: '#f5a623' },
  low:    { label: 'Confianza baja',   color: '#ff6b6b' },
}

const LIQUIDITY_LABEL: Record<string, string> = { high: 'Alta', medium: 'Media', low: 'Baja' }

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const Skeleton = ({ w, h = 14 }: { w: number; h?: number }) => (
  <div style={{
    width: w, height: h, borderRadius: 8,
    background: 'linear-gradient(90deg, var(--border) 25%, var(--surface) 50%, var(--border) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  }} />
)

export default function AgentHero({ coach, loading }: Props) {
  if (loading && !coach) {
    return (
      <div style={{ padding: '8px 0 24px' }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 28,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Skeleton w={180} h={12} />
            <Skeleton w={320} h={28} />
            <Skeleton w={260} h={14} />
            <Skeleton w={220} h={14} />
            <Skeleton w={140} h={32} />
          </div>
        </div>
      </div>
    )
  }

  if (!coach) return null

  const move = coach.next_best_move
  const ctx = coach.context
  const actionCfg = ACTION_CONFIG[move.suggested_action] ?? ACTION_CONFIG['insufficient_data']
  const conf = CONFIDENCE_MAP[move.confidence] ?? { label: move.confidence, color: '#888' }

  return (
    <section style={{ padding: '8px 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #00c896 0%, #00a0c4 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', fontWeight: 800, color: '#fff',
        }}>
          A
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            AI Financial Coach
          </h2>
          <p style={{ margin: 0, fontSize: '0.77rem', color: 'var(--text-muted)' }}>
            Período: {ctx.period} · Análisis determinístico
          </p>
        </div>
        <span style={{
          marginLeft: 'auto', padding: '4px 12px', borderRadius: 20,
          fontSize: '0.72rem', fontWeight: 700,
          background: `${conf.color}20`, border: `1px solid ${conf.color}40`, color: conf.color,
        }}>
          {conf.label}
        </span>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${actionCfg.color}, ${actionCfg.color}60)` }} />

        <div style={{ padding: 28 }}>
          <p style={{
            margin: '0 0 16px', fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Tu mejor movimiento hoy
          </p>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '6px 16px', borderRadius: 24,
                  background: actionCfg.bg, border: `1px solid ${actionCfg.color}50`,
                  fontSize: '0.9rem', fontWeight: 700, color: actionCfg.color,
                }}>
                  {actionCfg.label}
                </span>
                {move.suggested_amount != null && (
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ${fmt(move.suggested_amount)}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: 12 }}>
                <p style={{
                  margin: '0 0 4px', fontSize: '0.7rem', fontWeight: 700,
                  color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  Por qué
                </p>
                <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  {move.why}
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <p style={{
                  margin: '0 0 4px', fontSize: '0.7rem', fontWeight: 700,
                  color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  Qué evitar
                </p>
                <p style={{ margin: 0, fontSize: '0.87rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                  {move.what_to_avoid}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {move.evidence.map((ev, i) => (
                  <span key={i} style={{
                    padding: '4px 10px', borderRadius: 20,
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    fontSize: '0.74rem', color: 'var(--text-secondary)',
                  }}>
                    {ev.label}: <strong style={{ color: 'var(--text-primary)' }}>{ev.value}</strong>
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('evidence-panel')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  padding: '8px 20px', background: 'transparent',
                  border: '1px solid var(--border)', borderRadius: 8,
                  fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget
                  b.style.borderColor = actionCfg.color
                  b.style.color = actionCfg.color
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget
                  b.style.borderColor = 'var(--border)'
                  b.style.color = 'var(--text-secondary)'
                }}
              >
                ¿Por qué veo esto? →
              </button>
            </div>

            <div style={{
              flex: '0 0 192px', background: 'var(--bg)',
              border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px',
            }}>
              <p style={{
                margin: '0 0 12px', fontSize: '0.7rem', fontWeight: 700,
                color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                Contexto del mes
              </p>
              {([
                ['Ingresos',     `$${fmt(ctx.income)}`],
                ['Gastos',       `$${fmt(ctx.expenses)}`],
                ['Disponible',   `$${fmt(ctx.saving_capacity)}`],
                ['Ratio gastos', `${(ctx.expense_ratio * 100).toFixed(1)}%`],
              ] as [string, string][]).map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
                  <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontSize: '0.77rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)' }}>Liquidez</span>
                  <span style={{ fontSize: '0.77rem', fontWeight: 700, color: actionCfg.color }}>
                    {LIQUIDITY_LABEL[ctx.liquidity_need] ?? ctx.liquidity_need}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', padding: '12px 28px',
          background: 'var(--bg)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6,
        }}>
          {coach.educational_tip}
        </div>
      </div>
    </section>
  )
}
