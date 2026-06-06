import { useState, useEffect } from 'react'
import { dashboardApi } from './api'
import type { DashboardData } from './api'
import Header from './components/Header'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import RevenueModel from './components/RevenueModel'
import Compliance from './components/Compliance'
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

export default function App() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardApi
      .getDashboard('demo')
      .then(setDashboard)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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

          {/* ── Propuesta de valor ─────────────────── */}
          <ValueProps />

          {/* ── Modelo de ingresos ─────────────────── */}
          <RevenueModel />

          {/* ── Cumplimiento regulatorio ───────────── */}
          <Compliance />

          {/* ── Divisor de sección ─────────────────── */}
          <div className="section-divider">
            <div className="section-divider-line" />
            <span className="section-divider-label">Dashboard embebible — demo en vivo</span>
            <div className="section-divider-line" />
          </div>

          {/* ── Encabezado del dashboard ───────────── */}
          <section id="dashboard" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h2 className="section-heading">Así ven tus clientes sus finanzas</h2>
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
              Dashboard embebible · Período: {dashboard.summary.period} ·{' '}
              El usuario ve sus finanzas, tu fintech ve oportunidades de negocio
            </p>
          </section>

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

          <Simulator defaults={dashboard.simulator_defaults} />

          <EducationalCards cards={dashboard.educational_cards} />

          {/* ── Cómo funciona ──────────────────────── */}
          <DidacticPath />

          {/* ── Endpoints con valor de negocio ─────── */}
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
