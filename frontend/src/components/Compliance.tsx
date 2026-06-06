const REGULATIONS = [
  {
    code: 'BCRA Com. A 7226',
    title: 'Transparencia de productos financieros',
    description:
      'Obliga a informar claramente costos, tasas y condiciones de los productos. VirtualFinance genera el desglose requerido automáticamente por usuario.',
    color: 'var(--accent-blue)',
  },
  {
    code: 'Ley 25.326',
    title: 'Protección de Datos Personales',
    description:
      'Regula el tratamiento de datos financieros. Nuestra arquitectura cumple los requisitos de almacenamiento, trazabilidad y consentimiento informado.',
    color: 'var(--accent-teal)',
  },
  {
    code: 'CNV RG 925/2023',
    title: 'Información al inversor',
    description:
      'Exige que las plataformas presenten información comprensible sobre los instrumentos. Nuestras tarjetas educativas cubren este requisito de forma nativa.',
    color: 'var(--accent-purple)',
  },
  {
    code: 'UIF Res. 156/2018',
    title: 'Prevención de lavado de activos',
    description:
      'Requiere monitoreo y reporte de operaciones inusuales. La trazabilidad transaccional de VirtualFinance facilita el cumplimiento de manera continua.',
    color: 'var(--accent-yellow)',
  },
]

export default function Compliance() {
  return (
    <section id="compliance" style={{ marginBottom: 48 }}>
      <div className="card">
        <div className="section-title">Cumplimiento Regulatorio</div>
        <p
          style={{
            color: 'var(--text-secondary)',
            marginBottom: 28,
            fontSize: '0.9rem',
            maxWidth: 680,
            lineHeight: 1.7,
          }}
        >
          Los reguladores argentinos exigen cada vez mayor transparencia sobre
          los datos financieros de los usuarios. VirtualFinance está diseñada
          para que tu fintech cumpla sin desarrollo adicional.
        </p>

        <div className="grid-2">
          {REGULATIONS.map((reg, i) => (
            <div
              key={i}
              className="compliance-item"
              style={{ borderLeft: `3px solid ${reg.color}` }}
            >
              <div className="compliance-code" style={{ color: reg.color }}>
                {reg.code}
              </div>
              <div className="compliance-title">{reg.title}</div>
              <div className="compliance-desc">{reg.description}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            padding: '14px 18px',
            background: 'rgba(0,200,150,.06)',
            border: '1px solid rgba(0,200,150,.2)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: 'var(--accent-teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
          <span>
            Este análisis es orientativo. Te recomendamos validar con tu equipo legal
            los requerimientos específicos aplicables a tu modelo de negocio y jurisdicción.
          </span>
        </div>
      </div>
    </section>
  )
}
