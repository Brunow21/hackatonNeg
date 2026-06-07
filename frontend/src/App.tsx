import { useState, useEffect, useRef } from 'react'
import { dashboardApi } from './api'
import type { DashboardData } from './api'
import Header from './components/Header'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import RevenueModel from './components/RevenueModel'
import Compliance from './components/Compliance'
import ProfileSelector from './components/ProfileSelector'
import KPICards from './components/KPICards'
import CashFlow from './components/CashFlow'
import SpendingHabits from './components/SpendingHabits'
import TopMerchants from './components/TopMerchants'
import Alerts from './components/Alerts'
import Recommendation from './components/Recommendation'
import Simulator from './components/Simulator'
import EducationalCards from './components/EducationalCards'
import DidacticPath from './components/DidacticPath'
import Endpoints from './components/Endpoints'

const PROFILE_LABELS: Record<string, string> = {
  cande:  'Cande · 20 años · Primera experiencia laboral',
  franco: 'Franco · 53 años · Ejecutivo senior',
  cata:   'Cata · Madre clase media',
}

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState('cande')
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (!isFirstLoad.current) setSwitching(true)

    dashboardApi
      .getDashboard(selectedUserId)
      .then(setDashboard)
      .catch(console.error)
      .finally(() => {
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
            <span className="section-divider-label">Dashboard embebible — demo en vivo</span>
            <div className="section-divider-line" />
          </div>

          {/* ── Selector de perfiles ───────────────── */}
          <ProfileSelector selected={selectedUserId} onSelect={setSelectedUserId} />

          {/* ── Encabezado del perfil activo ────────── */}
          <section id="dashboard" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h2 className="section-heading">Así ve sus finanzas</h2>
              <span
                style={{
                  padding: '4px 12px',
                  background: 'rgba(0,200,150,.12)',
                  border: '1px solid rgba(0,200,150,.25)',
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                  whiteSpace: 'nowrap',
                }}
              >
                Demo en vivo
              </span>
            </div>
            <p className="section-subtitle">
              {PROFILE_LABELS[selectedUserId]} · Período: {dashboard.summary.period} ·{' '}
              El usuario ve sus finanzas, tu fintech ve oportunidades de negocio
            </p>
          </section>

          {/* ── Contenido del dashboard (se dimea al cambiar) */}
          <div
            style={{
              opacity: switching ? 0.4 : 1,
              transition: 'opacity .25s ease',
              pointerEvents: switching ? 'none' : 'auto',
            }}
          >
            <KPICards summary={dashboard.summary} />

            <div style={{ marginBottom: 24 }}>
              <div className="grid-2">
                <CashFlow data={dashboard.cash_flow} />
                <SpendingHabits data={dashboard.category_breakdown} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="grid-2">
                <TopMerchants data={dashboard.top_merchants} />
                <Alerts alerts={dashboard.alerts} />
              </div>
            </div>

            <Recommendation data={dashboard.recommendation} />

            <Simulator defaults={dashboard.simulator_defaults} userId={selectedUserId} />

            <EducationalCards cards={dashboard.educational_cards} />
          </div>

          <DidacticPath />
          <Endpoints />

        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '28px 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          lineHeight: 1.8,
        }}
      >
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
