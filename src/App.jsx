import { useState } from 'react'
import './App.css'

const tabs = ['скоро', 'скоро', 'скоро']

function Hamburger({ open, onClick }) {
  return (
    <button className={`hamburger ${open ? 'open' : ''}`} onClick={onClick} aria-label="меню">
      <span /><span /><span />
    </button>
  )
}

function HomePage() {
  return (
    <main className="home">
      <img src="/potok.jpg" alt="potok" className="home-image" />
      <h1 className="home-title">СКОРО</h1>
    </main>
  )
}

function SoonPage() {
  return (
    <main className="soon-page">
      <h1 className="soon-h1">СКОРО</h1>
      <h2 className="soon-h2">скоро</h2>
      <p className="soon-p">скоро</p>
      <div className="soon-divider" />
      <h2 className="soon-h2">скоро</h2>
      <p className="soon-p">скоро скоро скоро</p>
      <p className="soon-p">скоро</p>
      <div className="soon-divider" />
      <h2 className="soon-h2">скоро</h2>
      <p className="soon-p">скоро</p>
      <p className="soon-p">скоро скоро</p>
      <p className="soon-p">скоро</p>
    </main>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTab = (i) => {
    setActiveTab(i)
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => { setActiveTab(null); setMenuOpen(false) }}>
          <img src="/potok.jpg" alt="logo" className="logo-img" />
          <span className="logo-text">Бесконечные потоки</span>
        </div>
        <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`nav-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => handleTab(i)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {activeTab === null ? <HomePage /> : <SoonPage />}

      <footer className="footer">
        <span>© скоро</span>
      </footer>
    </div>
  )
}
