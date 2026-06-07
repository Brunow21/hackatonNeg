import { useState, useRef, useEffect } from 'react'
import { getCoachResponse } from '../data/demoUser'

interface Message {
  role: 'user' | 'coach'
  text: string
}

const SUGGESTED = [
  '¿Qué hago con los USDC que recibí?',
  '¿Cuánta plata debería dejar disponible?',
  '¿Me conviene cambiar a pesos ahora?',
  '¿Qué hago con mi ingreso extra?',
  '¿Rendimiento diario o plazo fijo?',
  '¿Qué gasto me está afectando más?',
]

const INITIAL_MSG: Message = {
  role: 'coach',
  text: 'Hola Martina, analizé tus datos de mayo. Recibiste 850 USDC desde Payoneer y detectamos un ingreso extra de $95.000. Tenés gastos próximos de $85.000. ¿Sobre qué querés explorar primero?',
}

export default function CoachChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim() || typing) return
    const question = text.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: question }])
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'coach', text: getCoachResponse(question) }])
      setTyping(false)
    }, 900 + Math.min(question.length * 8, 700))
  }

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Preguntale a tu coach</div>
      <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Consultá sobre tus ingresos, gastos, monedas disponibles o próximos pasos.
      </p>

      {/* Suggested chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {SUGGESTED.map((q, i) => (
          <button
            key={i}
            onClick={() => send(q)}
            disabled={typing}
            style={{
              padding: '6px 13px', background: 'var(--bg-primary)',
              border: '1px solid var(--border)', borderRadius: 20,
              fontSize: '0.76rem', color: 'var(--text-secondary)',
              cursor: typing ? 'not-allowed' : 'pointer',
              opacity: typing ? 0.5 : 1, transition: 'border-color .15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!typing) e.currentTarget.style.borderColor = 'var(--accent-teal)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div style={{
        background: 'var(--bg-primary)', border: '1px solid var(--border)',
        borderRadius: 12, padding: 16,
        minHeight: 220, maxHeight: 400, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '84%', padding: '10px 14px', lineHeight: 1.65, fontSize: '0.85rem',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'var(--accent-teal)' : 'var(--bg-card)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              color: m.role === 'user' ? '#fff' : 'var(--text-secondary)',
            }}>
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 16px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '16px 16px 16px 4px',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginRight: 6 }}>Analizando tus datos</span>
              {[0, 1, 2].map(j => (
                <span key={j} className="typing-dot" style={{ animationDelay: `${j * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            borderRadius: 8, color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none',
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={typing || !input.trim()}
          style={{
            padding: '10px 20px', background: 'var(--accent-teal)',
            border: 'none', borderRadius: 8, color: '#fff',
            fontSize: '0.85rem', fontWeight: 600,
            cursor: typing || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: typing || !input.trim() ? 0.5 : 1, transition: 'opacity .15s',
          }}
        >
          Enviar
        </button>
      </div>

      <p style={{ margin: '10px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Información educativa. No constituye asesoramiento financiero.
      </p>
    </div>
  )
}
