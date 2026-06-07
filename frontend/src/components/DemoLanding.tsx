interface Props {
  onStart: () => void
}

const FEATURE_CHIPS = [
  '850 USDC desde Payoneer',
  'Gastos próximos detectados',
  'Rendimiento diario',
  'Cambio de moneda',
  'Coach financiero con IA',
]

export default function DemoLanding({ onStart }: Props) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      background: `radial-gradient(ellipse at 50% -20%, rgba(0,200,150,.1) 0%, transparent 55%),
                   radial-gradient(ellipse at 80% 80%, rgba(77,140,245,.07) 0%, transparent 45%),
                   var(--bg-primary)`,
    }}>
      {/* Brand label */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 16px', borderRadius: 20, marginBottom: 32,
        background: 'rgba(0,200,150,.08)', border: '1px solid rgba(0,200,150,.2)',
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '.1em',
        color: 'var(--accent-teal)', textTransform: 'uppercase',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-teal)',
          animation: 'pulse-dot 2s ease-in-out infinite',
          display: 'inline-block',
        }} />
        Demo wallet · AI Financial Coach
      </div>

      {/* Main title */}
      <h1 style={{
        fontSize: 'clamp(2rem, 6vw, 3.6rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: 20,
        maxWidth: 600,
      }}>
        Tu plata,{' '}
        <span style={{
          background: 'linear-gradient(135deg, #00C896, #4D8CF5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          explicada simple
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        maxWidth: 480,
        margin: '0 auto 36px',
      }}>
        Un coach financiero que entiende tus ingresos, gastos y saldo disponible
        para ayudarte a tomar mejores decisiones dentro de tu wallet.
      </p>

      {/* CTA */}
      <button
        onClick={onStart}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '18px 40px',
          background: 'linear-gradient(135deg, #00C896, #4D8CF5)',
          color: '#fff', border: 'none', borderRadius: 50,
          fontSize: '1.05rem', fontWeight: 800, letterSpacing: '.03em',
          cursor: 'pointer', marginBottom: 14,
          boxShadow: '0 8px 32px rgba(0,200,150,.35)',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = '0 14px 44px rgba(0,200,150,.45)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,200,150,.35)'
        }}
      >
        VER MI COACH FINANCIERO
        <span style={{ fontSize: '1.1rem' }}>⚡</span>
      </button>

      <p style={{
        fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 36,
      }}>
        Demo con datos simulados de una usuaria freelancer que cobra del exterior.
      </p>

      {/* Feature chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 540 }}>
        {FEATURE_CHIPS.map((chip, i) => (
          <span key={i} style={{
            padding: '5px 12px',
            background: 'rgba(255,255,255,.04)',
            border: '1px solid var(--border)',
            borderRadius: 20, fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}
