import { useState } from 'react'
import { dashboardApi } from '../api'
import type { SimulatorInput, SimulatorOutput, SimulatorDefaults } from '../api'

interface Props {
  defaults: SimulatorDefaults
  userId: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

export default function Simulator({ defaults, userId }: Props) {
  const [input, setInput] = useState<SimulatorInput>({
    available_amount: defaults.available_amount,
    liquidity_need: defaults.liquidity_need as SimulatorInput['liquidity_need'],
    time_horizon_days: defaults.time_horizon_days,
    risk_preference: defaults.risk_preference as SimulatorInput['risk_preference'],
  })
  const [result, setResult] = useState<SimulatorOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = async () => {
    setLoading(true)
    setError(null)
    try {
      const output = await dashboardApi.simulate(userId, input)
      setResult(output)
    } catch {
      setError('No se pudo conectar al backend. Iniciá el servidor con uvicorn para usar el simulador.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" id="simulator">
      <div className="section-title">Simulador de Inversiones</div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
        Explorá cómo distribuir tu capital según tu necesidad de liquidez y horizonte de inversión.
      </p>

      <div className="simulator-form">
        <div className="form-group">
          <label>Monto disponible: {fmt(input.available_amount)}</label>
          <input
            type="range"
            className="slider"
            min={10000}
            max={1000000}
            step={10000}
            value={input.available_amount}
            onChange={(e) =>
              setInput((p) => ({ ...p, available_amount: Number(e.target.value) }))
            }
          />
        </div>

        <div className="form-group">
          <label>Horizonte de inversión: {input.time_horizon_days} días</label>
          <input
            type="range"
            className="slider"
            min={7}
            max={365}
            step={7}
            value={input.time_horizon_days}
            onChange={(e) =>
              setInput((p) => ({ ...p, time_horizon_days: Number(e.target.value) }))
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Necesidad de liquidez</label>
            <select
              className="select"
              value={input.liquidity_need}
              onChange={(e) =>
                setInput((p) => ({
                  ...p,
                  liquidity_need: e.target.value as SimulatorInput['liquidity_need'],
                }))
              }
            >
              <option value="high">Alta — Necesito acceso rápido</option>
              <option value="medium">Media — Puedo esperar algunos días</option>
              <option value="low">Baja — Prefiero mayor rendimiento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tolerancia al riesgo</label>
            <select
              className="select"
              value={input.risk_preference}
              onChange={(e) =>
                setInput((p) => ({
                  ...p,
                  risk_preference: e.target.value as SimulatorInput['risk_preference'],
                }))
              }
            >
              <option value="low">Conservador</option>
              <option value="medium">Moderado</option>
              <option value="high">Agresivo</option>
            </select>
          </div>
        </div>

        <button className="btn-primary" onClick={handleSimulate} disabled={loading}>
          {loading ? 'Calculando...' : 'Simular distribución'}
        </button>
      </div>

      {error && <div className="simulator-error">{error}</div>}

      {result && (
        <div className="simulator-result">
          <h3 style={{ color: 'var(--accent-teal)', marginBottom: 6, fontSize: '1rem' }}>
            Rendimiento total estimado en {result.time_horizon_days} días
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 20 }}>
            {fmt(result.total_simulated_yield)}
          </p>

          <div className="product-comparison">
            {result.product_comparison.map((p, i) => (
              <div key={i} className="product-item">
                <div className="product-name">{p.name}</div>
                <div className="product-details">
                  <span>
                    Asignado:{' '}
                    <strong style={{ color: 'var(--accent-blue)' }}>
                      {fmt(p.allocated_amount)}
                    </strong>
                  </span>
                  <span>
                    Tasa anual:{' '}
                    <strong style={{ color: 'var(--accent-teal)' }}>
                      {(p.annual_rate * 100).toFixed(0)}%
                    </strong>
                  </span>
                  <span>
                    Rendimiento est.:{' '}
                    <strong style={{ color: 'var(--accent-purple)' }}>
                      {fmt(p.simulated_yield)}
                    </strong>
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>Liquidez: {p.liquidity}</span>
                </div>
              </div>
            ))}
          </div>

          {result.educational_cards.length > 0 && (
            <div
              style={{
                marginTop: 20,
                padding: '14px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}
            >
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                💡 DATO EDUCATIVO
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {result.educational_cards[1]?.content}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
