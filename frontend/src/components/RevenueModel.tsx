const FLOW = [
  { icon: '👤', label: 'Usuario conectado',   desc: 'Tu cliente vincula su cuenta a la app' },
  { icon: '🗄️', label: 'Datos estructurados', desc: 'VirtualFinance organiza y analiza la información' },
  { icon: '💡', label: 'Insights claros',      desc: 'El usuario entiende su situación financiera real' },
  { icon: '🎯', label: 'Decisión informada',   desc: 'Elige productos adaptados a su perfil' },
  { icon: '💰', label: 'Ingreso para tu fintech', desc: 'Tu empresa cobra comisión o spread' },
]

const METRICS = [
  { val: '+37%', label: 'Adopción de productos financieros', color: 'var(--accent-teal)' },
  { val: '-28%', label: 'Churn de usuarios activos',         color: 'var(--accent-blue)' },
  { val: '2.4×', label: 'Ticket promedio por usuario',       color: 'var(--accent-purple)' },
]

export default function RevenueModel() {
  return (
    <section id="revenue" style={{ marginBottom: 48 }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-teal)',
              marginBottom: 10,
            }}
          >
            Modelo de negocio
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 10 }}>
            Cómo VirtualFinance genera ingresos para tu empresa
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: 580,
              margin: '0 auto',
              fontSize: '0.9rem',
              lineHeight: 1.7,
            }}
          >
            Usuarios que entienden sus finanzas tienen mayor propensión a contratar
            productos adicionales. Nosotros cerramos esa brecha de comprensión.
          </p>
        </div>

        <div className="revenue-flow">
          {FLOW.map((step, i) => (
            <div key={i} className="revenue-flow-item">
              <div className="revenue-flow-step">
                <div className="revenue-flow-icon">{step.icon}</div>
                <div className="revenue-flow-label">{step.label}</div>
                <div className="revenue-flow-desc">{step.desc}</div>
              </div>
              {i < FLOW.length - 1 && (
                <div className="revenue-flow-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <div className="revenue-metrics">
          {METRICS.map((m, i) => (
            <div key={i} className="revenue-metric">
              <span className="revenue-metric-val" style={{ color: m.color }}>
                {m.val}
              </span>
              <span className="revenue-metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          * Métricas proyectadas basadas en benchmarks de la industria fintech LATAM.
        </p>
      </div>
    </section>
  )
}
