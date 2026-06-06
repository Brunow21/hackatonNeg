import type { TopMerchant } from '../api'

interface Props {
  data: TopMerchant[]
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

export default function TopMerchants({ data }: Props) {
  const maxAmount = Math.max(...data.map((m) => m.amount))

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="section-title">Principales Comercios</div>
      <div className="merchants-list">
        {data.map((merchant, i) => (
          <div key={i} className="merchant-item">
            <div className="merchant-rank">{i + 1}</div>
            <div className="merchant-info">
              <div className="merchant-name">{merchant.merchant}</div>
              <div className="merchant-meta">
                {merchant.category} · {merchant.transactions} transacciones
              </div>
              <div className="merchant-bar">
                <div
                  className="merchant-bar-fill"
                  style={{ width: `${(merchant.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
            <div className="merchant-amount">{fmt(merchant.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
