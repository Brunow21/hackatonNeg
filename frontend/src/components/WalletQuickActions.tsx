const ACTIONS = [
  { icon: '↓',  label: 'Recibir dinero',  desc: 'Del exterior o local' },
  { icon: '⇄',  label: 'Cambiar moneda',  desc: 'ARS · USDC · USD'     },
  { icon: '📈', label: 'Ver rendimiento', desc: 'Fondo Money Market'    },
  { icon: '⊡',  label: 'Pagar servicios', desc: 'Luz, gas, telefonía'  },
  { icon: '▤',  label: 'Usar tarjeta',    desc: 'Internacional'         },
  { icon: '≡',  label: 'Movimientos',     desc: 'Historial del mes'     },
]

export default function WalletQuickActions() {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 16 }}>Acciones rápidas</div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
      }}>
        {ACTIONS.map((a, i) => (
          <button
            key={i}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 8, padding: '16px 8px',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', color: 'var(--text-secondary)',
              cursor: 'pointer', transition: 'border-color .15s, color .15s, background .15s',
              textAlign: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)'
              e.currentTarget.style.color = 'var(--accent-teal)'
              e.currentTarget.style.background = 'rgba(0,200,150,.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'var(--bg-primary)'
            }}
          >
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{a.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700 }}>{a.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{a.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <p style={{ margin: '14px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Demo visual · Las acciones son ilustrativas
      </p>
    </div>
  )
}
