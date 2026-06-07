import { useState, useEffect, useRef } from 'react'
import { dashboardApi, MOCK_AGENT_COACHES } from './api'
import type { DashboardData, AgentCoachResponse } from './api'
import Header from './components/Header'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import RevenueModel from './components/RevenueModel'
import Compliance from './components/Compliance'
import ProfileSelector from './components/ProfileSelector'
import AgentHero from './components/AgentHero'
import AgentChat from './components/AgentChat'
import EvidencePanel from './components/EvidencePanel'
import DidacticPath from './components/DidacticPath'
import FinancialDashboardSection from './components/FinancialDashboardSection'
import Endpoints from './components/Endpoints'

const PROFILE_LABELS: Record<string, string> = {
  cande:  'Cande · 20 años · Primera experiencia laboral',
  franco: 'Franco · 53 años · Ejecutivo senior',
  cata:   'Cata · Madre clase media',
  demo:   'Usuario demo',
}

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState('cande')
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [agentCoach, setAgentCoach] = useState<AgentCoachResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [agentLoading, setAgentLoading] = useState(true)
  const [switching, setSwitching] = useState(false)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (!isFirstLoad.current) setSwitching(true)
    setAgentLoading(true)

    const loadDashboard = dashboardApi
      .getDashboard(selectedUserId)
      .then(setDashboard)
      .catch(console.error)

    const loadCoach = dashboardApi
      .getCoach(selectedUserId)
      .then(setAgentCoach)
      .catch(e => {
        console.warn('[VirtualFinance] Coach fallback activado:', e)
        setAgentCoach(MOCK_AGENT_COACHES[selectedUserId] ?? MOCK_AGENT_COACHES['demo'])
      })
      .finally(() => setAgentLoading(false))

    Promise.all([loadDashboard, loadCoach]).finally(() => {
      setLoading(false)
      setSwitching(false)
      isFirstLoad.current = false
    })
  }, [selectedUserId])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Cargando datos financieros...</p>
      </div>
    )
  }

  if (!dashboard) return null

  return (
    <div>
      <Header />
      <Hero />

      <main className="main-content">
        <div className="container">

          <ValueProps />
          <RevenueModel />
          <Compliance />

          <div className="section-divider">
            <div className="section-divider-line" />
            <span className="section-divider-label">AI Financial Coach — demo en vivo</span>
            <div className="section-divider-line" />
          </div>

          <ProfileSelector selected={selectedUserId} onSelect={setSelectedUserId} />

          <section id="dashboard" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h2 className="section-heading">El agente analiza sus finanzas</h2>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(0,200,150,.12)',
                border: '1px solid rgba(0,200,150,.25)',
                borderRadius: 20,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-teal)',
                whiteSpace: 'nowrap',
              }}>
                Demo en vivo
              </span>
            </div>
            <p className="section-subtitle">
              {PROFILE_LABELS[selectedUserId] ?? selectedUserId} · Período: {dashboard.summary.period} ·{' '}
              El agente explica la situación financiera y sugiere el próximo paso
            </p>
          </section>

          <div style={{
            opacity: switching ? 0.4 : 1,
            transition: 'opacity .25s ease',
            pointerEvents: switching ? 'none' : 'auto',
          }}>
            <AgentHero coach={agentCoach} loading={agentLoading && !agentCoach} />
            <AgentChat coach={agentCoach} userId={selectedUserId} />
            <EvidencePanel coach={agentCoach} />

            <DidacticPath />

            <div className="section-divider" style={{ margin: '32px 0' }}>
              <div className="section-divider-line" />
              <span className="section-divider-label">Datos financieros del período</span>
              <div className="section-divider-line" />
            </div>

            <FinancialDashboardSection dashboard={dashboard} userId={selectedUserId} />

            <Endpoints />
          </div>

        </div>
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        lineHeight: 1.8,
      }}>
        <div className="container">
          <div style={{ marginBottom: 4 }}>
            <strong style={{ color: 'var(--text-secondary)' }}>VirtualFinance API</strong> v1.0.0
            &nbsp;·&nbsp; Infraestructura financiera B2B white-label
          </div>
          <div>
            Datos de carácter educativo. No constituyen asesoramiento financiero ni legal.
          </div>
        </div>
      </footer>
    </div>
  )
}
