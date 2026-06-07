import { useState, useRef, useEffect } from 'react'
import { martina, BELO_CHAT_RESPONSES } from '../data/beloDemoData'

interface Props {
  onClose: () => void
}

type Screen = 'wallet' | 'coach'

interface Message {
  role: 'user' | 'agent'
  text: string
}

const fmtARS = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)

function getBeloResponse(input: string): string {
  const lc = input.toLowerCase()
  if (/usdc|payoneer|exterior|cobr/.test(lc)) return BELO_CHAT_RESPONSES.usdc
  if (/convert|cambiar|pesos/.test(lc)) return BELO_CHAT_RESPONSES.convertir
  if (/disponible|liquid|dejar|mantener/.test(lc)) return BELO_CHAT_RESPONSES.disponible
  if (/rendimiento|diario/.test(lc)) return BELO_CHAT_RESPONSES.rendimiento
  if (/servicio|pagar|suscri/.test(lc)) return BELO_CHAT_RESPONSES.servicios
  if (/brasil|pix|viaj/.test(lc)) return BELO_CHAT_RESPONSES.brasil
  if (/tarjeta|card|internac/.test(lc)) return BELO_CHAT_RESPONSES.tarjeta
  return BELO_CHAT_RESPONSES.default
}

const SUGGESTED_CHIPS = [
  '¿Qué hago con los USDC que recibí?',
  '¿Cuánto debería convertir a pesos?',
  '¿Cuánta plata debería dejar disponible?',
  '¿Me conviene usar rendimiento diario?',
  '¿Puedo pagar mis servicios con este saldo?',
  '¿Qué pasa si viajo a Brasil?',
  '¿Uso tarjeta o convierto moneda?',
]

const CURRENCIES: { key: string; amount: number }[] = [
  { key: 'ARS',  amount: martina.balances.ARS  },
  { key: 'USDC', amount: martina.balances.USDC },
  { key: 'USD',  amount: martina.balances.USD  },
  { key: 'EUR',  amount: martina.balances.EUR  },
  { key: 'BRL',  amount: martina.balances.BRL  },
]

const QUICK_ACTIONS = [
  { icon: '↓',  label: 'Recibir'   },
  { icon: '⇄',  label: 'Cambiar'   },
  { icon: '💳', label: 'Tarjeta'   },
  { icon: '📋', label: 'Servicios' },
  { icon: '🇧🇷', label: 'Pix'      },
]

const SPLIT = [
  { label: 'Reservar para gastos próximos', value: '$85.000 ARS',  color: '#f5a623' },
  { label: 'Mantener disponible',           value: '$70.000 ARS',  color: '#4d8cf5' },
  { label: 'Rendimiento diario sugerido',   value: '$120.000 ARS', color: '#00c896' },
  { label: 'Revisar conversión',            value: '200 USDC',     color: '#7965e0' },
  { label: 'Mantener en USDC',              value: '650 USDC',     color: '#7965e0' },
]

const EVIDENCE = [
  { label: 'Ingreso exterior',      value: '850 USDC desde Payoneer', source: 'context' },
  { label: 'Ingreso extra',         value: '$95.000',                  source: 'context' },
  { label: 'Gastos próximos',       value: '$85.000',                  source: 'context' },
  { label: 'Capacidad de ahorro',   value: '$280.000',                 source: 'context' },
  { label: 'Necesidad de liquidez', value: 'Alta',                     source: 'context' },
  { label: 'Monedas disponibles',   value: 'ARS, USDC, USD',           source: 'balance' },
  { label: 'Producto disponible',   value: 'Rendimiento diario',       source: 'wallet'  },
  { label: 'Acción disponible',     value: 'Cambiar moneda',           source: 'wallet'  },
  { label: 'Acción disponible',     value: 'Pagar servicios',          source: 'wallet'  },
  { label: 'Acción disponible',     value: 'Pix Brasil',               source: 'wallet'  },
]

const PLAN_STEPS = [
  'Reservar $85.000 para gastos próximos.',
  'Convertir a pesos solo lo necesario para pagos cercanos.',
  'Mantener una parte disponible en la wallet.',
  'Separar $120.000 en rendimiento diario.',
  'Revisar nuevamente cuando entre el próximo pago del exterior.',
]

const INSIGHT_CARDS = [
  {
    icon: '🌎',
    title: 'Ingreso del exterior detectado',
    text: 'Tu último cobro fue desde Payoneer. Podés usar el saldo, cambiar una parte o reservarlo para gastos futuros.',
    cta: 'Ver opciones',
    color: '#00c896',
  },
  {
    icon: '⇄',
    title: 'No hace falta convertir todo',
    text: 'Convertí solo lo que necesitás para gastos próximos y mantené el resto disponible.',
    cta: 'Simular conversión',
    color: '#4d8cf5',
  },
  {
    icon: '📈',
    title: 'Saldo que puede seguir trabajando',
    text: 'El rendimiento diario puede servir para dinero que querés mantener disponible.',
    cta: 'Ver rendimiento',
    color: '#00c896',
  },
  {
    icon: '💳',
    title: 'Gastos online o de viaje',
    text: 'Si tenés gastos internacionales, podés revisar si conviene usar saldo en moneda extranjera con tarjeta.',
    cta: 'Ver tarjeta',
    color: '#7965e0',
  },
  {
    icon: '🇧🇷',
    title: '¿Viajás a Brasil?',
    text: 'Podés reservar parte de tu saldo para pagos con Pix.',
    cta: 'Preparar viaje',
    color: '#f5a623',
  },
  {
    icon: '📋',
    title: 'Pagos próximos',
    text: 'Antes de mover saldo, reservá lo necesario para servicios y suscripciones.',
    cta: 'Reservar saldo',
    color: '#f5904d',
  },
]

export default function BeloPreview({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>('wallet')
  const [messages, setMessages] = useState<Message[]>([{
    role: 'agent',
    text: 'Martina, como recibiste 850 USDC y tenés gastos próximos por $85.000, conviene priorizar liquidez. Podrías convertir solo la parte que necesitás para gastos en pesos, dejar una parte disponible y separar otra parte en rendimiento diario. No hace falta mover todo de una vez.',
  }])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const [simAmount, setSimAmount]       = useState(300)
  const [simCurrency, setSimCurrency]   = useState<'ARS' | 'USDC' | 'USD'>('USDC')
  const [simNeed, setSimNeed]           = useState<'baja' | 'media' | 'alta'>('alta')
  const [simGoal, setSimGoal]           = useState('pagar gastos')
  const bottomRef  = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    const q = text.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'agent', text: getBeloResponse(q) }])
      setTyping(false)
    }, 900 + Math.min(q.length * 8, 600))
  }

  const scrollToChat = () => {
    const el = overlayRef.current?.querySelector('#belo-chat')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const getSimResult = (): string => {
    if (simCurrency === 'USDC') {
      return `Si separás ${simAmount} USDC, podrías convertir solo la parte necesaria para tus gastos en pesos y mantener el resto disponible o en rendimiento, según los productos activos de la wallet.`
    }
    if (simCurrency === 'USD') {
      return `Con ${simAmount} USD disponibles, una opción prudente sería convertir solo lo necesario para gastos próximos y mantener el resto en moneda extranjera si no lo necesitás pronto.`
    }
    return `Con ${fmtARS(simAmount)} disponibles y necesidad ${simNeed}, conviene ${simNeed === 'alta' ? 'mantener ese saldo disponible' : 'separar una parte en rendimiento diario'} antes de tomar otras decisiones.`
  }

  // ─── Shared styles ────────────────────────────────────────────────────────
  const sectionLabel = (text: string) => (
    <p style={{
      margin: '0 0 12px',
      fontSize: '0.7rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      color: 'var(--text-muted)',
    }}>{text}</p>
  )

  const card = (children: React.ReactNode, extraStyle?: React.CSSProperties) => (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      ...extraStyle,
    }}>
      {children}
    </div>
  )

  // ─── Wallet screen ─────────────────────────────────────────────────────────
  const WalletScreen = (
    <>
      {/* Balance card */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1f35 0%, #0f1420 100%)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 12,
      }}>
        <div style={{ padding: '28px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Wallet internacional · demo</p>
              <h2 style={{ margin: '3px 0 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Hola, {martina.name} 👋
              </h2>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 800, color: '#fff',
            }}>M</div>
          </div>
          <p style={{ margin: '0 0 2px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>Saldo total estimado</p>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {fmtARS(martina.totalBalanceARS)}
          </p>
        </div>

        {/* Currency chips */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          {sectionLabel('Tus monedas')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CURRENCIES.map(c => (
              <div key={c.key} style={{
                padding: '6px 14px',
                background: c.amount > 0 ? 'rgba(0,200,150,.08)' : 'rgba(255,255,255,.03)',
                border: `1px solid ${c.amount > 0 ? 'rgba(0,200,150,.3)' : 'var(--border)'}`,
                borderRadius: 20,
              }}>
                <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 700, color: c.amount > 0 ? 'var(--accent-teal)' : 'var(--text-muted)', textTransform: 'uppercase' }}>{c.key}</p>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: c.amount > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {c.key === 'ARS' ? fmtARS(c.amount) : String(c.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          {sectionLabel('Acciones rápidas')}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            {QUICK_ACTIONS.map(a => (
              <div key={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>{a.icon}</div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coach entry card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0,200,150,.07) 0%, rgba(77,140,245,.07) 100%)',
        border: '1px solid rgba(0,200,150,.3)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            background: 'linear-gradient(135deg, #00c896, #4d8cf5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>🧠</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Coach financiero
              </h3>
              <span style={{
                padding: '2px 8px', borderRadius: 10,
                background: 'rgba(0,200,150,.15)', border: '1px solid rgba(0,200,150,.3)',
                fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-teal)',
              }}>Nuevo</span>
            </div>
            <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Entendé qué hacer con tus ingresos del exterior, tu saldo disponible y tus próximos gastos.
            </p>
            <button
              onClick={() => setScreen('coach')}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #00c896, #4d8cf5)',
                border: 'none', borderRadius: 12,
                fontSize: '0.88rem', fontWeight: 700, color: '#fff',
                cursor: 'pointer',
              }}
            >
              Entrar al coach →
            </button>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 8 }}>
        Preview para hackathon · Así podría verse integrado en una wallet internacional
      </p>
    </>
  )

  // ─── Coach screen ──────────────────────────────────────────────────────────
  const CoachScreen = (
    <>
      {/* Back button */}
      <button
        onClick={() => setScreen('wallet')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none',
          fontSize: '0.82rem', color: 'var(--text-muted)',
          cursor: 'pointer', marginBottom: 16, padding: 0,
        }}
      >
        ← Volver a la wallet
      </button>

      {/* Coach header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #00c896, #4d8cf5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem',
          }}>🧠</div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Tu coach financiero
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          Analizamos tus ingresos, saldos y gastos próximos para ayudarte a decidir tu próximo movimiento.
        </p>
      </div>

      {/* Best move */}
      {card(<>
        {sectionLabel('Tu mejor movimiento hoy')}
        <div style={{
          padding: 14,
          background: 'rgba(0,200,150,.05)',
          border: '1px solid rgba(0,200,150,.2)',
          borderRadius: 12, marginBottom: 14,
        }}>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Recibiste{' '}
            <strong style={{ color: 'var(--text-primary)' }}>850 USDC</strong> desde Payoneer
            {' '}y detectamos un ingreso extra de{' '}
            <strong style={{ color: 'var(--text-primary)' }}>$95.000</strong>.
            Como tenés gastos próximos por{' '}
            <strong style={{ color: '#f5a623' }}>$85.000</strong>,
            {' '}una opción prudente sería mantener una parte disponible,
            convertir solo lo necesario a pesos y separar otra parte en rendimiento diario.
          </p>
        </div>

        {/* Split */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {SPLIT.map((s, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{s.label}</span>
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Avoid */}
        <div style={{
          padding: '10px 14px',
          background: 'rgba(245,77,77,.06)',
          border: '1px solid rgba(245,77,77,.2)',
          borderRadius: 10, marginBottom: 14,
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-red)' }}>Qué evitar · </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            No conviertas ni inmovilices todo tu saldo si todavía tenés gastos próximos.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: '¿Por qué veo esto?',  action: undefined   },
            { label: 'Simular otro monto',   action: undefined   },
            { label: 'Preguntarle al coach', action: scrollToChat },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                padding: '7px 14px',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 20,
                fontSize: '0.78rem', fontWeight: 600,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >{label}</button>
          ))}
        </div>
      </>)}

      {/* Evidence */}
      {card(<>
        {sectionLabel('Datos usados por el coach')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {EVIDENCE.map((e, i) => (
            <div key={i} style={{
              padding: '10px 12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
            }}>
              <p style={{ margin: '0 0 2px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{e.label}</p>
              <p style={{ margin: '0 0 2px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{e.value}</p>
              <p style={{ margin: 0, fontSize: '0.62rem', fontWeight: 700, color: 'var(--accent-teal)' }}>{e.source}</p>
            </div>
          ))}
        </div>
      </>)}

      {/* Chat */}
      {card(<>
        <div id="belo-chat" />
        {sectionLabel('Preguntale a tu coach')}
        <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Consultá sobre tus ingresos, monedas disponibles, gastos próximos o saldo.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {SUGGESTED_CHIPS.map((chip, i) => (
            <button
              key={i}
              onClick={() => send(chip)}
              disabled={typing}
              style={{
                padding: '5px 11px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                cursor: typing ? 'not-allowed' : 'pointer',
                opacity: typing ? 0.5 : 1,
              }}
            >{chip}</button>
          ))}
        </div>

        {/* Bubbles */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 12, padding: 12,
          minHeight: 160, maxHeight: 340,
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 10,
          marginBottom: 10,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%', padding: '9px 13px',
                borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: m.role === 'user' ? 'var(--accent-teal)' : 'var(--bg-card)',
                border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                color: m.role === 'user' ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.84rem', lineHeight: 1.6,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '9px 14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '14px 14px 14px 4px',
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.78rem', color: 'var(--text-muted)',
              }}>
                <span>Analizando tus datos</span>
                {[0, 1, 2].map(i => (
                  <span key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
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
              flex: 1, padding: '9px 13px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontSize: '0.84rem', outline: 'none',
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={typing || !input.trim()}
            style={{
              padding: '9px 18px',
              background: 'var(--accent-teal)',
              border: 'none', borderRadius: 10,
              color: '#fff', fontSize: '0.84rem', fontWeight: 600,
              cursor: typing || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: typing || !input.trim() ? 0.5 : 1,
            }}
          >Enviar</button>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Información educativa. No constituye asesoramiento financiero.
        </p>
      </>)}

      {/* Weekly plan */}
      {card(<>
        {sectionLabel('Plan para esta semana')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PLAN_STEPS.map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 14px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-blue))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.68rem', fontWeight: 800, color: '#fff',
              }}>{i + 1}</span>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{step}</span>
            </div>
          ))}
        </div>
      </>)}

      {/* Simulator */}
      {card(<>
        {sectionLabel('Simulá qué hacer con tu saldo')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
                Monto
              </label>
              <input
                type="number"
                value={simAmount}
                onChange={e => setSimAmount(Number(e.target.value))}
                style={{
                  width: '100%', padding: '8px 12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
                Moneda
              </label>
              <select
                value={simCurrency}
                onChange={e => setSimCurrency(e.target.value as 'ARS' | 'USDC' | 'USD')}
                className="select"
                style={{ padding: '8px 12px', fontSize: '0.84rem' }}
              >
                <option>ARS</option>
                <option>USDC</option>
                <option>USD</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
              ¿Necesitás usarlo pronto?
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['baja', 'media', 'alta'] as const).map(o => (
                <button
                  key={o}
                  onClick={() => setSimNeed(o)}
                  style={{
                    flex: 1, padding: '7px',
                    background: simNeed === o ? 'rgba(0,200,150,.12)' : 'var(--bg-secondary)',
                    border: `1px solid ${simNeed === o ? 'rgba(0,200,150,.35)' : 'var(--border)'}`,
                    borderRadius: 8,
                    fontSize: '0.78rem', fontWeight: 600,
                    color: simNeed === o ? 'var(--accent-teal)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >{o}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
              Objetivo
            </label>
            <select
              value={simGoal}
              onChange={e => setSimGoal(e.target.value)}
              className="select"
              style={{ padding: '8px 12px', fontSize: '0.84rem' }}
            >
              {['pagar gastos', 'ahorrar', 'viajar', 'servicios', 'rendimiento'].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          padding: '14px 16px',
          background: 'rgba(0,200,150,.06)',
          border: '1px solid rgba(0,200,150,.2)',
          borderRadius: 12,
          fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65,
        }}>
          {getSimResult()}
        </div>
      </>)}

      {/* Insight cards */}
      {card(<>
        {sectionLabel('Insights del coach')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {INSIGHT_CARDS.map((c, i) => (
            <div key={i} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderTop: `3px solid ${c.color}`,
              borderRadius: 12, padding: '14px',
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: 8 }}>{c.icon}</div>
              <p style={{ margin: '0 0 6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</p>
              <p style={{ margin: '0 0 12px', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{c.text}</p>
              <button style={{
                padding: '5px 12px',
                background: 'transparent',
                border: `1px solid ${c.color}50`,
                borderRadius: 20,
                fontSize: '0.74rem', fontWeight: 600,
                color: c.color, cursor: 'pointer',
              }}>{c.cta}</button>
            </div>
          ))}
        </div>
      </>)}

      <p style={{
        textAlign: 'center', fontSize: '0.72rem',
        color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 4,
      }}>
        Preview para hackathon · Simulación de cómo podría verse integrado en una wallet internacional.<br />
        No es una integración oficial. Datos educativos, no asesoramiento financiero.
      </p>
    </>
  )

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-primary)',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(11,13,20,.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px', height: 52,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 12,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 20,
            background: 'rgba(121,101,224,.15)',
            border: '1px solid rgba(121,101,224,.3)',
            fontSize: '0.7rem', fontWeight: 700,
            color: 'var(--accent-purple)',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            Simulación tipo belo
          </span>
          <span style={{
            fontSize: '0.78rem', color: 'var(--text-muted)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            Así podría verse el AI Financial Coach dentro de una wallet internacional.
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            padding: '6px 16px',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            borderRadius: 20,
            fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer', flexShrink: 0,
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent-purple)'
            e.currentTarget.style.color = 'var(--accent-purple)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-light)'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          Volver a WealthLens
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px 64px',
      }}>
        <div style={{ width: '100%', maxWidth: 520 }}>
          {screen === 'wallet' ? WalletScreen : CoachScreen}
        </div>
      </div>
    </div>
  )
}
