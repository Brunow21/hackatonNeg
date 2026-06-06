export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-badge">Infraestructura Financiera B2B · White-label · Argentina</div>

        <h1 className="hero-title">
          La base de datos financiera<br />
          <span className="hero-gradient">que tu fintech necesita</span>
        </h1>

        <p className="hero-desc">
          Estructuramos y analizamos los datos de tus usuarios.
          Tu equipo cumple regulaciones, tus clientes entienden sus finanzas
          y tu empresa genera nuevas fuentes de ingresos — sin desarrollo interno.
        </p>

        <div className="hero-actions">
          <a href="#dashboard" className="btn-primary">Ver demo en vivo</a>
          <a href="#revenue" className="btn-secondary">Ver modelo de ingresos →</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-val">100%</span>
            <span className="stat-label">White-label</span>
          </div>
          <div className="stat">
            <span className="stat-val">BCRA</span>
            <span className="stat-label">Compatible</span>
          </div>
          <div className="stat">
            <span className="stat-val">0</span>
            <span className="stat-label">Setup externo</span>
          </div>
          <div className="stat">
            <span className="stat-val">11</span>
            <span className="stat-label">Endpoints listos</span>
          </div>
        </div>

        <div className="trust-badges">
          <span className="trust-badge">✓ BCRA compatible</span>
          <span className="trust-badge">✓ ISO 27001 ready</span>
          <span className="trust-badge">✓ Ley 25.326</span>
          <span className="trust-badge">✓ White-label</span>
          <span className="trust-badge">✓ Sin infraestructura externa</span>
        </div>
      </div>
    </section>
  )
}
