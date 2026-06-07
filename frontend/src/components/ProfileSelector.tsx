const PROFILES = [
  {
    user_id: 'cande',
    name: 'Cande',
    age: '20 años',
    role: 'Primera experiencia laboral',
    detail: 'Delivery, suscripciones y transporte dominan su gasto. Bajo ahorro, alta liquidez necesaria.',
    emoji: '👩',
    color: 'var(--accent-purple)',
    income: '$180.000',
    health: 'En riesgo',
  },
  {
    user_id: 'franco',
    name: 'Franco',
    age: '53 años',
    role: 'Ejecutivo senior',
    detail: 'Alto ingreso y tasa de ahorro del 39%. Foco en diversificación y planificación del retiro.',
    emoji: '👨‍💼',
    color: 'var(--accent-blue)',
    income: '$1.800.000',
    health: 'Excelente',
  },
  {
    user_id: 'cata',
    name: 'Cata',
    age: 'Madre · Clase media',
    role: 'Gastos familiares',
    detail: 'Educación y supermercados lideran el gasto. Busca proteger el presupuesto familiar.',
    emoji: '👩‍👧',
    color: 'var(--accent-teal)',
    income: '$650.000',
    health: 'Estable',
  },
]

interface Props {
  selected: string
  onSelect: (userId: string) => void
}

export default function ProfileSelector({ selected, onSelect }: Props) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>
          Seleccioná un perfil de usuario
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Cada perfil muestra cómo VirtualFinance adapta los insights según la edad y situación financiera del usuario.
        </p>
      </div>

      <div className="profiles-grid">
        {PROFILES.map((profile) => {
          const isActive = selected === profile.user_id
          return (
            <button
              key={profile.user_id}
              className={`profile-card${isActive ? ' profile-card--active' : ''}`}
              style={{
                borderColor: isActive ? profile.color : 'var(--border)',
                boxShadow: isActive ? `0 0 0 1px ${profile.color}, 0 4px 20px ${profile.color}30` : 'none',
              }}
              onClick={() => onSelect(profile.user_id)}
            >
              <div className="profile-card-avatar" style={{ background: `${profile.color}18` }}>
                {profile.emoji}
              </div>

              <div className="profile-card-body">
                <div className="profile-card-top">
                  <span className="profile-card-name">{profile.name}</span>
                  <span
                    className="profile-card-health"
                    style={{ color: profile.color, background: `${profile.color}15` }}
                  >
                    {profile.health}
                  </span>
                </div>

                <div className="profile-card-age">{profile.age} · {profile.role}</div>
                <div className="profile-card-detail">{profile.detail}</div>

                <div className="profile-card-income">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Ingreso mensual</span>
                  <span style={{ color: profile.color, fontWeight: 800, fontSize: '1rem' }}>
                    {profile.income}
                  </span>
                </div>
              </div>

              {isActive && (
                <div
                  className="profile-card-active-indicator"
                  style={{ background: profile.color }}
                />
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
