import type { EducationalCard } from '../api'

interface Props {
  cards: EducationalCard[]
}

export default function EducationalCards({ cards }: Props) {
  return (
    <div className="educational-section">
      <div className="section-title" style={{ marginBottom: 16 }}>Tarjetas Educativas</div>
      <div className="grid-2">
        {cards.map((card, i) => (
          <div key={i} className="card edu-card" style={{ marginBottom: 0 }}>
            <div className="edu-icon">{card.icon}</div>
            <h3 className="edu-title">{card.title}</h3>
            <p className="edu-content">{card.content}</p>
            <span
              style={{
                display: 'inline-block',
                marginTop: 8,
                padding: '3px 10px',
                background: 'rgba(121,101,224,.12)',
                border: '1px solid rgba(121,101,224,.25)',
                borderRadius: 20,
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent-purple)',
                textTransform: 'capitalize',
              }}
            >
              {card.category.replace(/_/g, ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
