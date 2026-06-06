import type { Alert } from '../api'

interface Props {
  alerts: Alert[]
}

const severityConfig: Record<string, { color: string; bg: string; label: string }> = {
  high:   { color: 'var(--accent-red)',    bg: 'rgba(245,77,77,.08)',   label: 'Alta'  },
  medium: { color: 'var(--accent-yellow)', bg: 'rgba(245,200,66,.08)',  label: 'Media' },
  low:    { color: 'var(--accent-blue)',   bg: 'rgba(77,140,245,.08)',  label: 'Baja'  },
}

export default function Alerts({ alerts }: Props) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="section-title">Alertas Inteligentes</div>
      <div className="alerts-list">
        {alerts.map((alert, i) => {
          const cfg = severityConfig[alert.severity] ?? severityConfig.low
          return (
            <div
              key={i}
              className="alert-item"
              style={{ borderLeft: `3px solid ${cfg.color}`, background: cfg.bg }}
            >
              <div className="alert-header">
                <span className="alert-title">{alert.title}</span>
                <span className={`badge badge-${alert.severity}`}>{cfg.label}</span>
              </div>
              <p className="alert-message">{alert.message}</p>
              <button
                className="alert-action"
                style={{ color: cfg.color }}
                onClick={() => {}}
              >
                {alert.action} →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
