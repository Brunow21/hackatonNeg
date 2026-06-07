export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <span>VirtualFinance</span>
          <span className="logo-tag">API</span>
        </div>
        <nav className="nav">
          <a href="#valueprops">Propuesta</a>
          <a href="#dashboard">Demo</a>
          <a href="#revenue">Ingresos</a>
          <a href="#compliance">Regulatorio</a>
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            API Docs →
          </a>
          <a
            href="/belo-preview"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              background: 'linear-gradient(135deg, #00d084, #16a34a)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.82rem',
              borderRadius: 999,
              border: 'none',
              boxShadow: '0 0 20px rgba(0,208,132,0.35)',
              cursor: 'pointer',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              transition: 'opacity .2s, transform .15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.88'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            PROBAR EN BELO
          </a>
        </nav>
      </div>
    </header>
  )
}
