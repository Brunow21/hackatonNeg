import { DEMO_USER } from '../data/demoUser'

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const EVIDENCE = [
  { label: 'Ingreso exterior',        value: '850 USDC desde Payoneer',           tag: 'movimiento' },
  { label: 'Ingreso extra detectado', value: fmtARS(DEMO_USER.extra_income),       tag: 'análisis'   },
  { label: 'Gastos próximos',         value: fmtARS(DEMO_USER.upcoming_expenses),  tag: 'contexto'   },
  { label: 'Capacidad de ahorro',     value: fmtARS(DEMO_USER.saving_capacity_ars),tag: 'contexto'   },
  { label: 'Necesidad de liquidez',   value: 'Alta',                               tag: 'perfil'     },
  { label: 'Saldo ARS disponible',    value: fmtARS(DEMO_USER.balances.ars),       tag: 'saldo'      },
  { label: 'Producto disponible',     value: 'Rendimiento diario',                 tag: 'producto'   },
  { label: 'Monedas disponibles',     value: 'ARS · USDC · USD',                   tag: 'saldo'      },
]

const TAG_COLORS: Record<string, { color: string; bg: string }> = {
  movimiento: { color: 'var(--accent-teal)',   bg: 'rgba(0,200,150,.1)'   },
  análisis:   { color: 'var(--accent-blue)',   bg: 'rgba(77,140,245,.1)'  },
  contexto:   { color: 'var(--accent-yellow)', bg: 'rgba(245,200,66,.1)'  },
  perfil:     { color: 'var(--accent-purple)', bg: 'rgba(121,101,224,.1)' },
  saldo:      { color: 'var(--accent-teal)',   bg: 'rgba(0,200,150,.07)'  },
  producto:   { color: 'var(--accent-blue)',   bg: 'rgba(77,140,245,.07)' },
}

export default function CoachEvidencePanel() {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Datos usados por el coach</div>
      <p style={{ margin: '0 0 20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        El coach usó únicamente estos datos para responder. Sin acceso a información personal ni historial crudo de transacciones.
      </p>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        {EVIDENCE.map((ev, i) => {
          const tc = TAG_COLORS[ev.tag] ?? TAG_COLORS.contexto
          return (
            <div key={i} style={{
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '12px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
            }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.73rem', color: 'var(--text-muted)' }}>{ev.label}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ev.value}</p>
              </div>
              <span style={{
                padding: '2px 8px', borderRadius: 12, fontSize: '0.67rem',
                fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                color: tc.color, background: tc.bg,
                border: `1px solid ${tc.color}30`,
              }}>
                {ev.tag}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{
        padding: '10px 14px',
        background: 'rgba(0,200,150,.05)', border: '1px solid rgba(0,200,150,.15)',
        borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6,
      }}>
        Los rendimientos son estimados y pueden variar según el producto financiero elegido.
        Esta información es de carácter educativo. No constituye asesoramiento financiero personalizado.
      </div>
    </div>
  )
}
