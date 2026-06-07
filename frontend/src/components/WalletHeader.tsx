import { DEMO_USER } from '../data/demoUser'

interface Props {
  onReset: () => void
}

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const CURRENCIES = [
  { code: 'ARS',  label: 'Pesos',  display: (u: typeof DEMO_USER) => `$${fmtARS(u.balances.ars)}` },
  { code: 'USDC', label: 'USDC',   display: (u: typeof DEMO_USER) => `${u.balances.usdc} USDC` },
  { code: 'USD',  label: 'Dólares',display: (u: typeof DEMO_USER) => `USD ${u.balances.usd}` },
  { code: 'EUR',  label: 'Euros',  display: () => 'EUR —' },
  { code: 'BRL',  label: 'Reais',  display: () => 'BRL —' },
]

const QUICK_ACTIONS = [
  { label: 'Recibir',   icon: '↓' },
  { label: 'Cambiar',   icon: '⇄' },
  { label: 'Tarjeta',   icon: '▤' },
  { label: 'Servicios', icon: '⊡' },
]

export default function WalletHeader({ onReset }: Props) {
  const u = DEMO_USER

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: 'linear-gradient(135deg, #00C896, #4D8CF5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 900, color: '#fff', flexShrink: 0,
            }}>
              W
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              demo wallet
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onReset}
              style={{
                padding: '5px 12px', background: 'transparent',
                border: '1px solid var(--border)', borderRadius: 8,
                fontSize: '0.74rem', color: 'var(--text-muted)', cursor: 'pointer',
                transition: 'color .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              ← Reiniciar demo
            </button>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7965E0, #4D8CF5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.88rem', fontWeight: 700, color: '#fff',
            }}>
              M
            </div>
          </div>
        </div>

        {/* Balance section */}
        <div style={{ padding: '0 20px 12px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
            Hola, {u.name} 👋
          </p>
          <p style={{
            fontSize: '2.1rem', fontWeight: 800, lineHeight: 1,
            color: 'var(--text-primary)', marginBottom: 2,
          }}>
            ${fmtARS(u.balances.total_ars_equiv)}
          </p>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 14 }}>
            Saldo total · equivalente ARS
          </p>

          {/* Currency chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            {CURRENCIES.map((c, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '6px 12px', background: 'var(--bg-primary)',
                border: '1px solid var(--border)', borderRadius: 10,
                cursor: 'pointer', transition: 'border-color .15s', gap: 1,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <span style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '.06em' }}>
                  {c.code}
                </span>
                <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {c.display(u)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions tab bar */}
        <div style={{
          display: 'flex', borderTop: '1px solid var(--border)',
        }}>
          {QUICK_ACTIONS.map((a, i) => (
            <button key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 3, padding: '10px 4px',
              background: 'transparent', border: 'none',
              color: 'var(--text-secondary)', fontSize: '0.7rem',
              fontWeight: 600, cursor: 'pointer',
              transition: 'color .15s, background .15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-teal)'; e.currentTarget.style.background = 'rgba(0,200,150,.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
