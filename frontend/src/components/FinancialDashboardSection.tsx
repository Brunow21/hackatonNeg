import type { DashboardData } from '../api'
import KPICards from './KPICards'
import CashFlow from './CashFlow'
import SpendingHabits from './SpendingHabits'
import TopMerchants from './TopMerchants'
import Alerts from './Alerts'
import Recommendation from './Recommendation'
import Simulator from './Simulator'
import EducationalCards from './EducationalCards'

interface Props {
  dashboard: DashboardData
  userId: string
}

export default function FinancialDashboardSection({ dashboard, userId }: Props) {
  return (
    <div>
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
      <Simulator defaults={dashboard.simulator_defaults} userId={userId} />
      <EducationalCards cards={dashboard.educational_cards} />
    </div>
  )
}
