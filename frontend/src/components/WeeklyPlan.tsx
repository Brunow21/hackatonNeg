const STEPS = [
  {
    num: 1,
    title: 'Reservar $85.000 para gastos próximos',
    desc: 'Adobe, Netflix y celular se debitan esta semana. Dejá ese monto disponible en ARS antes de mover el resto.',
    tag: 'Esta semana',
    tagColor: 'var(--accent-yellow)',
  },
  {
    num: 2,
    title: 'Mantener saldo ARS disponible',
    desc: 'Más allá de los gastos próximos, conviene tener un colchón adicional en ARS para imprevistos.',
    tag: 'Siempre',
    tagColor: 'var(--accent-teal)',
  },
  {
    num: 3,
    title: 'Separar $120.000 en rendimiento diario',
    desc: 'El excedente disponible puede generar rendimiento estimado mientras lo necesitás. Podés retirarlo en 24hs.',
    tag: 'Esta semana',
    tagColor: 'var(--accent-teal)',
  },
  {
    num: 4,
    title: 'Evaluar convertir 200 USDC si necesitás pesos',
    desc: 'No conviene convertir todo. Convertí solo lo que necesites en el corto plazo y mantené el resto en USDC.',
    tag: 'Opcional',
    tagColor: 'var(--accent-blue)',
  },
  {
    num: 5,
    title: 'Revisar cuando entre el próximo pago del exterior',
    desc: 'Tu coach va a actualizar la recomendación con cada nuevo ingreso que entre desde Payoneer u otras fuentes.',
    tag: 'Próximos días',
    tagColor: 'var(--accent-purple)',
  },
]

export default function WeeklyPlan() {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>🎯 Plan para esta semana</div>
      <p style={{ margin: '0 0 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Pasos concretos basados en tus datos actuales.
      </p>

      <div>
        {STEPS.map((step, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '14px 0',
            borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #4D8CF5, #7965E0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 800, color: '#fff',
            }}>
              {step.num}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {step.title}
                </span>
                <span style={{
                  padding: '2px 8px', borderRadius: 12, fontSize: '0.67rem',
                  fontWeight: 700, flexShrink: 0, marginTop: 1,
                  color: step.tagColor, background: `${step.tagColor}18`,
                  border: `1px solid ${step.tagColor}30`,
                }}>
                  {step.tag}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
