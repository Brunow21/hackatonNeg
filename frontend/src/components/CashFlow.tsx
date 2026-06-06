import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { CashFlowEntry } from '../api'

interface Props {
  data: CashFlowEntry[]
}

const fmtCompact = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(n)

const fmtFull = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

export default function CashFlow({ data }: Props) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="section-title">Flujo de Caja</div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4D8CF5" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#4D8CF5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222636" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#7B8198', fontSize: 11 }}
            tickFormatter={(v: string) => v.slice(5)}
            axisLine={{ stroke: '#222636' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#7B8198', fontSize: 11 }}
            tickFormatter={fmtCompact}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip
            contentStyle={{
              background: '#161925',
              border: '1px solid #222636',
              borderRadius: 8,
              color: '#E8ECF8',
              fontSize: 13,
            }}
            formatter={(value: number) => [fmtFull(value), 'Balance']}
            labelStyle={{ color: '#7B8198', marginBottom: 4 }}
          />
          <Area
            type="monotone"
            dataKey="running_balance"
            stroke="#4D8CF5"
            strokeWidth={2.5}
            fill="url(#balGrad)"
            dot={{ r: 3, fill: '#4D8CF5', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#4D8CF5' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
