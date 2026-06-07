import { useState } from 'react'
import { DEMO_USER } from '../data/demoUser'

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const SPLIT = [
  {
    label: 'Reservar para gastos',
    amount: '$85.000',
    detail: 'ARS disponible',
    color: 'var(--accent-yellow)',
    bg: 'rgba(245,200,66,.08)',
    border: 'rgba(245,200,66,.25)',
  },
  {
    label: 'Rendimiento diario',
    amount: '$120.000',
    detail: 'ARS · acceso 24hs',
    color: 'var(--accent-teal)',
    bg: 'rgba(0,200,150,.08)',
    border: 'rgba(0,200,150,.25)',
  },
  {
    label: 'Revisar cambio',
    amount: '200 USDC',
    detail: 'según necesidad',
    color: 'var(--accent-blue)',
    bg: 'rgba(77,140,245,.08)',
    border: 'rgba(77,140,245,.25)',
  },
]

const CONTEXT_TAGS = [
  { text: `850 USDC desde Payoneer`, icon: '💸' },
  { text: `+${fmtARS(DEMO_USER.extra_income)} ingreso extra`, icon: '📥' },
  { text: `${fmtARS(DEMO_USER.upcoming_expenses)} gastos próximos`, icon: '📋' },
]

export default function CoachHero() {
  const [showWhy, setShowWhy] = useState(false)

  return (
    <section style={{ marginBottom: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg, #00C896 0%, #4D8CF5 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', fontWeight: 900, color: '#fff',
        }}>
          A
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Tu coach financiero
          </h2>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Analizamos tus ingresos, gastos y saldo disponible para ayudarte a decidir tu próximo movimiento.
          </p>
        </div>
      </div>

      {/* Main recommendation card */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #00C896, #4D8CF5)' }} />

        {/* Context strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 20px', flexWrap: 'wrap',
          background: 'rgba(0,200,150,.04)', borderBottom: '1px solid rgba(0,200,150,.12)',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginRight: 4 }}>Analizando:</span>
          {CONTEXT_TAGS.map((tag, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 10px', borderRadius: 20,
              background: 'rgba(0,200,150,.1)', border: '1px solid rgba(0,200,150,.2)',
              fontSize: '0.74rem', color: 'var(--accent-teal)', fontWeight: 600,
            }}>
              {tag.icon} {tag.text}
            </span>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 0' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10,
          }}>
            Tu mejor movimiento hoy
          </p>
          <p style={{
            fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 18,
          }}>
            Recibiste 850 USDC desde Payoneer y además detectamos un ingreso extra de{' '}
            <strong style={{ color: 'var(--text-primary)' }}>$95.000</strong>.
            Como tenés gastos próximos por{' '}
            <strong style={{ color: 'var(--text-primary)' }}>$85.000</strong>,
            una opción prudente sería mantener una parte disponible y separar otra parte en rendimiento diario.
          </p>

          {/* Split recommendation */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16,
          }}>
            {SPLIT.map((s, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 10,
                background: s.bg, border: `1px solid ${s.border}`,
              }}>
                <p style={{
                  fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '.05em', color: s.color, marginBottom: 6,
                }}>
                  {s.label}
                </p>
                <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {s.amount}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.detail}</p>
              </div>
            ))}
          </div>

          {/* What to avoid */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            padding: '10px 14px', marginBottom: 16,
            background: 'rgba(245,77,77,.05)', border: '1px solid rgba(245,77,77,.15)', borderRadius: 8,
          }}>
            <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>⚠️</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Qué evitar:</strong>{' '}
              No inmovilizar todo tu saldo si tenés gastos próximos esta semana.
            </p>
          </div>

          {/* Why expanded */}
          {showWhy && (
            <div style={{
              marginBottom: 16, padding: '14px 16px',
              background: 'rgba(77,140,245,.06)', border: '1px solid rgba(77,140,245,.2)',
              borderRadius: 10, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.7,
            }}>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>¿Por qué esta recomendación?</p>
              <p>El coach detectó tres señales simultáneas: un ingreso en USDC desde Payoneer (850 USDC), un ingreso extra en ARS ($95.000) y gastos próximos confirmados ($85.000). Con necesidad de liquidez alta, bloquear todo el capital no es conveniente. La distribución sugerida balancea cobertura de gastos + generación de rendimiento estimado + flexibilidad para el USDC.</p>
              <p style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Datos usados: saldo ARS, saldo USDC, gastos próximos, ingreso extra, productos disponibles, necesidad de liquidez.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 20 }}>
            <button
              onClick={() => setShowWhy(v => !v)}
              style={{
                padding: '9px 18px', background: 'transparent',
                color: 'var(--text-secondary)', border: '1px solid var(--border)',
                borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.color = 'var(--accent-teal)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {showWhy ? 'Cerrar explicación' : '¿Por qué veo esto?'}
            </button>
            <button
              onClick={() => { const el = document.getElementById('simulador'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                padding: '9px 18px', background: 'var(--accent-teal)',
                color: '#0B0D14', border: 'none', borderRadius: 8,
                fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                transition: 'opacity .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Simular otro monto
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
