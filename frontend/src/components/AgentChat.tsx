import { useState, useRef, useEffect } from 'react'
import type { AgentCoachResponse } from '../api'

interface Props {
  coach: AgentCoachResponse | null
  userId: string
}

interface Message {
  role: 'user' | 'agent'
  text: string
}

const SUGGESTED = [
  '¿Qué hago con mi ingreso este mes?',
  '¿Plazo fijo o rendimiento diario?',
  '¿Cuánta plata líquida necesito?',
  '¿Por qué veo esta recomendación?',
  '¿Cuándo es el mejor momento para separar?',
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

function getChatResponse(input: string, coach: AgentCoachResponse): string {
  const lc = input.toLowerCase()
  const { context: ctx, next_best_move: move } = coach

  if (/ingreso|qué hago|que hago|extra|excedente/.test(lc)) {
    if (ctx.saving_capacity <= 0) {
      return `Según tus datos de ${ctx.period}, tus ingresos ($${fmt(ctx.income)}) apenas cubren tus gastos ($${fmt(ctx.expenses)}). Antes de pensar en mover dinero, conviene revisar si hay gastos que podrías reducir o diferir.`
    }
    return `${coach.income_insight} Tu excedente disponible este mes es $${fmt(ctx.saving_capacity)} (ingresos $${fmt(ctx.income)} menos gastos $${fmt(ctx.expenses)}). Una opción prudente sería no dejar ese saldo en cero — siempre guardá un colchón para imprevistos antes de mover el resto.`
  }

  if (/plazo fijo|rendimiento|diario|producto/.test(lc)) {
    if (ctx.liquidity_need === 'high') {
      return `Con necesidad de liquidez alta, un plazo fijo no sería la primera opción — bloquea el dinero por 30 días o más. Tu saldo proyectado a fin de mes es $${fmt(ctx.projected_eom_balance)}, lo que sugiere mantener disponibilidad. Podrías explorar rendimiento diario si está disponible, ya que permite retirar en 24hs.`
    }
    if (ctx.liquidity_need === 'low') {
      return `Dado que tu necesidad de liquidez es baja y tenés un excedente de $${fmt(ctx.saving_capacity)}, una opción prudente sería explorar plazo fijo para una parte del excedente. ${move.why}`
    }
    return `Con liquidez media, el rendimiento diario puede ser un buen balance: acceso rápido al capital y algún rendimiento. ${move.why} Recordá que esto es informativo, no asesoramiento financiero.`
  }

  if (/l[ií]quida|disponible|efectivo|cash/.test(lc)) {
    const subNote = ctx.subscriptions_amount > 0
      ? ` ${coach.subscription_insight}`
      : ''
    return `${coach.liquidity_insight}${subNote} Una opción prudente sería mantener al menos $${fmt(ctx.projected_eom_balance)} como mínimo líquido para cubrir los gastos proyectados del período.`
  }

  if (/por qu[eé]|porque|recomendaci[oó]n|veo esto/.test(lc)) {
    const evidenceText = move.evidence.map(ev => `${ev.label}: ${ev.value}`).join(', ')
    return `Esta recomendación se basa en tus datos de ${ctx.period}. ${move.why} Evidencia usada: ${evidenceText}. Podés ver el panel de datos completo más abajo.`
  }

  if (/cu[aá]ndo|momento|separar|payday|cobro/.test(lc)) {
    return `${coach.income_insight} El mejor momento para separar un excedente es inmediatamente después de que ingrese el ingreso principal — antes de que los gastos lo absorban. Con tu perfil, una opción prudente sería automatizar esa separación los primeros días del período.`
  }

  return `Podés preguntarme sobre: tu excedente del mes, la diferencia entre plazo fijo y rendimiento diario, cuánta plata mantener disponible, por qué ves esta recomendación, o cuándo es el mejor momento para separar fondos. ¿Qué querés explorar?`
}

export default function AgentChat({ coach }: Props) {
  const initialMsg = (c: AgentCoachResponse | null): Message => ({
    role: 'agent',
    text: c
      ? `Hola, soy tu coach financiero. Analicé tus datos de ${c.context.period} y tengo información sobre tu situación. ¿Querés explorar algo en particular?`
      : 'Hola, soy tu coach financiero. Estoy procesando tus datos...',
  })

  const [messages, setMessages] = useState<Message[]>([initialMsg(coach)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevCoachRef = useRef(coach)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (prevCoachRef.current !== coach) {
      prevCoachRef.current = coach
      setMessages([initialMsg(coach)])
      setInput('')
      setTyping(false)
    }
  }, [coach])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    const question = text.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: question }])
    setTyping(true)
    const delay = 800 + Math.min(question.length * 10, 600)
    setTimeout(() => {
      const response = coach
        ? getChatResponse(question, coach)
        : 'Todavía estoy cargando tus datos. Intentá en un momento.'
      setMessages(prev => [...prev, { role: 'agent', text: response }])
      setTyping(false)
    }, delay)
  }

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Preguntale a tu coach</div>
      <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Respuestas basadas en tus datos financieros del período actual.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {SUGGESTED.map((q, i) => (
          <button
            key={i}
            onClick={() => send(q)}
            disabled={typing}
            style={{
              padding: '6px 14px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              cursor: typing ? 'not-allowed' : 'pointer',
              opacity: typing ? 0.5 : 1,
              transition: 'border-color .15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!typing) e.currentTarget.style.borderColor = 'var(--accent-teal)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            {q}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
        minHeight: 200,
        maxHeight: 380,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '82%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'var(--accent-teal)' : 'var(--surface)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              color: m.role === 'user' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: 1.65,
            }}>
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px 16px 16px 4px',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} className="typing-dot" style={{
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(input) }}
          placeholder="Escribí tu pregunta..."
          disabled={typing}
          style={{
            flex: 1, padding: '10px 14px',
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 8, color: 'var(--text-primary)',
            fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={typing || !input.trim()}
          style={{
            padding: '10px 20px',
            background: 'var(--accent-teal)',
            border: 'none', borderRadius: 8,
            color: '#fff', fontSize: '0.85rem', fontWeight: 600,
            cursor: typing || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: typing || !input.trim() ? 0.5 : 1,
            transition: 'opacity .15s',
          }}
        >
          Enviar
        </button>
      </div>

      <p style={{ margin: '10px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Información educativa. No constituye asesoramiento financiero. Los datos provienen del análisis del período actual.
      </p>
    </div>
  )
}
