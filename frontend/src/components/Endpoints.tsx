const CATEGORIES = [
  {
    label: 'Datos',
    color: 'var(--accent-purple)',
    bg: 'rgba(121,101,224,.08)',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/financial-data',
        value: 'Cargá transacciones y construí el perfil financiero del usuario',
        business: 'Activo de datos reutilizable para todos los endpoints siguientes',
      },
    ],
  },
  {
    label: 'Insights',
    color: 'var(--accent-blue)',
    bg: 'rgba(77,140,245,.08)',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/users/{id}/dashboard',
        value: 'Dashboard completo listo para embeber en tu app',
        business: 'Una sola llamada devuelve todo — ahorrás tiempo de integración',
      },
      {
        method: 'GET',
        path: '/v1/users/{id}/summary',
        value: 'KPIs financieros: ingresos, gastos, tasa de ahorro',
        business: 'Métricas clave que el usuario nunca vio organizadas',
      },
      {
        method: 'GET',
        path: '/v1/users/{id}/cash-flow',
        value: 'Evolución del saldo en el tiempo',
        business: 'Detectás patrones de gasto para ofrecer productos en el momento justo',
      },
      {
        method: 'GET',
        path: '/v1/users/{id}/category-breakdown',
        value: 'En qué gasta el usuario y cuánto por categoría',
        business: 'Base para personalizar ofertas de cashback y beneficios',
      },
      {
        method: 'GET',
        path: '/v1/users/{id}/top-merchants',
        value: 'Comercios con mayor volumen de gasto',
        business: 'Oportunidades de acuerdos comerciales y descuentos dirigidos',
      },
    ],
  },
  {
    label: 'Engagement',
    color: 'var(--accent-yellow)',
    bg: 'rgba(245,200,66,.08)',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/users/{id}/alerts',
        value: 'Alertas inteligentes personalizadas por perfil',
        business: 'Aumentan el tiempo en la app y la frecuencia de apertura',
      },
      {
        method: 'GET',
        path: '/v1/users/{id}/recommendation',
        value: 'Recomendación de productos según el perfil financiero',
        business: 'El momento de venta correcto, con el producto correcto',
      },
    ],
  },
  {
    label: 'Monetización',
    color: 'var(--accent-teal)',
    bg: 'rgba(0,200,150,.08)',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/users/{id}/simulate',
        value: 'Simulador educativo interactivo de distribución de fondos',
        business: 'Reduce la fricción de decisión y acelera la conversión a productos',
      },
    ],
  },
]

const METHOD_COLORS: Record<string, string> = {
  GET:  'var(--accent-teal)',
  POST: 'var(--accent-blue)',
}

export default function Endpoints() {
  return (
    <div className="card" id="endpoints">
      <div className="section-title">Qué obtenés con cada endpoint</div>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: 28,
          fontSize: '0.875rem',
          lineHeight: 1.7,
        }}
      >
        Cada llamada a la API entrega un activo de negocio concreto.
        Documentación técnica completa en{' '}
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-blue)' }}
        >
          localhost:8000/docs
        </a>
        .
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {CATEGORIES.map((cat, ci) => (
          <div key={ci}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                background: cat.bg,
                border: `1px solid ${cat.color}40`,
                borderRadius: 20,
                fontSize: '0.75rem',
                fontWeight: 800,
                color: cat.color,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                marginBottom: 12,
              }}
            >
              {cat.label}
            </div>

            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
              }}
            >
              {cat.endpoints.map((ep, ei) => (
                <div
                  key={ei}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 260px 1fr',
                    gap: 16,
                    padding: '14px 16px',
                    borderBottom:
                      ei < cat.endpoints.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'start',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = 'transparent')
                  }
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '.04em',
                      color: METHOD_COLORS[ep.method] ?? 'white',
                      background: `${METHOD_COLORS[ep.method] ?? '#fff'}22`,
                      textAlign: 'center',
                    }}
                  >
                    {ep.method}
                  </span>

                  <div>
                    <code
                      style={{
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        display: 'block',
                        marginBottom: 4,
                      }}
                    >
                      {ep.path}
                    </code>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {ep.value}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      paddingLeft: 12,
                      borderLeft: `2px solid ${cat.color}40`,
                    }}
                  >
                    {ep.business}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
