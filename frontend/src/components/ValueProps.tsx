const PROPS = [
  {
    icon: '🗄️',
    color: 'var(--accent-blue)',
    title: 'Base de datos estructurada',
    description:
      'Dejás de tener datos dispersos entre sistemas. VirtualFinance organiza la información financiera de tus usuarios en un modelo unificado, consultable y auditable desde el día uno.',
    points: [
      'Modelo de datos estandarizado',
      'Historial transaccional ordenado',
      'Listo para auditorías regulatorias',
    ],
  },
  {
    icon: '⚖️',
    color: 'var(--accent-teal)',
    title: 'Cumplimiento regulatorio',
    description:
      'Los reguladores exigen mayor transparencia sobre los datos financieros de los usuarios. Nuestra API genera la trazabilidad y los reportes que necesitás para cumplir sin esfuerzo adicional.',
    points: [
      'Transparencia de datos BCRA',
      'Trazabilidad de transacciones',
      'Reportes automáticos por usuario',
    ],
  },
  {
    icon: '📈',
    color: 'var(--accent-purple)',
    title: 'Nuevas fuentes de ingresos',
    description:
      'Usuarios que entienden sus finanzas adoptan más productos. Eso se traduce en mayor engagement, conversión a productos financieros y más comisiones para tu empresa.',
    points: [
      'Mayor conversión a productos',
      'Aumento del ticket promedio',
      'Reducción de churn',
    ],
  },
]

export default function ValueProps() {
  return (
    <section id="valueprops" style={{ marginBottom: 48 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: 10,
          }}
        >
          Propuesta de valor
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 12 }}>
          ¿Por qué VirtualFinance?
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            maxWidth: 540,
            margin: '0 auto',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          Tres razones por las que las fintechs eligen nuestra infraestructura de datos
          en lugar de construirla internamente.
        </p>
      </div>

      <div className="grid-3">
        {PROPS.map((prop, i) => (
          <div
            key={i}
            className="card"
            style={{ borderTop: `3px solid ${prop.color}`, marginBottom: 0 }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>{prop.icon}</div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: 10,
                color: prop.color,
              }}
            >
              {prop.title}
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: 18,
              }}
            >
              {prop.description}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {prop.points.map((point, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ color: prop.color, fontWeight: 800, fontSize: '0.9rem' }}>✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
