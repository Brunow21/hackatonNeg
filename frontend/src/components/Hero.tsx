export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-badge">AI Financial Coach · B2B White-label · Argentina</div>

        <h1 className="hero-title">
          El agente financiero que<br />
          <span className="hero-gradient">entiende los datos de tus usuarios</span>
        </h1>

        <p className="hero-desc">
          Explicaciones simples, transparencia total, próximos pasos seguros —
          dentro de tu fintech. Sin desarrollo interno, sin infraestructura externa.
        </p>

        <div className="hero-actions">
          <a href="#dashboard" className="btn-primary">Ver demo del agente</a>
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
            <span className="stat-val">14</span>
            <span className="stat-label">Endpoints listos</span>
          </div>
        </div>

        <div className="trust-badges">
          <span className="trust-badge">✓ Análisis determinístico</span>
          <span className="trust-badge">✓ Sin PII expuesta a la LLM</span>
          <span className="trust-badge">✓ Guardrails regulatorios</span>
          <span className="trust-badge">✓ BCRA compatible</span>
          <span className="trust-badge">✓ Ley 25.326</span>
        </div>
      </div>
    </section>
  )
}
