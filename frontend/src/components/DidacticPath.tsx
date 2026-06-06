const STEPS = [
  {
    number: '01',
    icon: '🔌',
    title: 'Conectás tu app',
    desc: 'Una sola llamada a la API con los datos financieros de tu usuario. Sin migraciones, sin setup complejo, sin infraestructura externa.',
  },
  {
    number: '02',
    icon: '🗄️',
    title: 'Estructuramos los datos',
    desc: 'Organizamos transacciones, categorizamos gastos y construimos el perfil financiero completo. Tu base de datos se vuelve un activo estratégico.',
  },
  {
    number: '03',
    icon: '💡',
    title: 'Tus usuarios ven insights',
    desc: 'El dashboard embebible muestra a tus clientes su situación financiera de forma clara. Conceptos complejos, lenguaje simple.',
  },
  {
    number: '04',
    icon: '📈',
    title: 'Tu fintech crece',
    desc: 'Usuarios más informados contratan más productos. Generás nuevas fuentes de ingresos y cumplís con las regulaciones — sin esfuerzo adicional.',
  },
]

export default function DidacticPath() {
  return (
    <div className="card">
      <div className="section-title">Cómo funciona para tu negocio</div>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: 28,
          fontSize: '0.9rem',
          lineHeight: 1.7,
        }}
      >
        Integrás VirtualFinance una sola vez. Obtenés infraestructura financiera lista
        para escalar, cumplir y monetizar.
      </p>
      <div className="didactic-steps">
        {STEPS.map((step, i) => (
          <div key={i} className="didactic-step">
            <div className="step-number">{step.number}</div>
            <div className="step-body">
              <div className="step-icon">{step.icon}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
