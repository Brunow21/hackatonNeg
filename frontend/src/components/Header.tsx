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
        </nav>
      </div>
    </header>
  )
}
