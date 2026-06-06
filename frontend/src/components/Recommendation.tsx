import type { Recommendation as RecommendationType } from '../api'

interface Props {
  data: RecommendationType
}

export default function Recommendation({ data }: Props) {
  return (
    <div className="card recommendation-card">
      <div className="recommendation-header">
        <div>
          <div className="section-title">{data.title}</div>
          <p className="recommendation-desc">{data.description}</p>
        </div>
        <a href="#simulator" className="btn-primary" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {data.cta}
        </a>
      </div>
      <div className="product-tags">
        {data.product_ids.map((id, i) => (
          <span key={i} className="product-tag">
            {id.replace(/_/g, ' ')}
          </span>
        ))}
      </div>
      <p className="disclaimer">{data.disclaimer}</p>
    </div>
  )
}
