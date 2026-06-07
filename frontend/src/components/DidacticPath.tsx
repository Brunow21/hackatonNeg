const STEPS = [
  {
    number: '01',
    icon: '',
    title: 'El agente analiza los datos',
    desc: 'Con una sola llamada a la API, el agente procesa ingresos, gastos, patrones y saldo disponible. Sin acceso a datos personales sensibles.',
  },
  {
    number: '02',
    icon: '',
    title: 'Detecta patrones relevantes',
    desc: 'Identifica ratio de gastos, capacidad de ahorro, necesidad de liquidez y suscripciones recurrentes. Todo de forma determinística y auditable.',
  },
  {
    number: '03',
    icon: '',
    title: 'Genera una recomendación con evidencia',
    desc: 'Propone el próximo mejor movimiento financiero con justificación clara, monto sugerido y los datos que usó para decidir. Sin frases de asesoramiento directo.',
  },
  {
    number: '04',
    icon: '',
    title: 'Guía al usuario hacia el próximo paso',
    desc: 'El usuario ve la recomendación, puede preguntar por qué, explorar el chat educativo y actuar dentro de tu fintech — todo en el mismo flujo.',
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
