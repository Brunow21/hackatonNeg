import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { CategoryBreakdown } from '../api'

interface Props {
  data: CategoryBreakdown[]
}

const COLORS = ['#4D8CF5', '#00C896', '#7965E0', '#F5C842', '#F5904D', '#F54D4D']

const fmtFull = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

export default function SpendingHabits({ data }: Props) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="section-title">Distribución de Gastos</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            dataKey="percentage"
            nameKey="category"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#161925',
              border: '1px solid #222636',
              borderRadius: 8,
              color: '#E8ECF8',
              fontSize: 13,
            }}
            formatter={(value: number, _name: string, props: any) => [
              `${value.toFixed(1)}% · ${fmtFull(props.payload.amount)}`,
              props.payload.category,
            ]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span style={{ color: '#7B8198', fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
