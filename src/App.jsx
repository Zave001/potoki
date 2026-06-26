import { useState } from 'react'
import './App.css'

const tabs = ['скоро', 'скоро', 'скоро']

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

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => setActiveTab(null)}>
          <img src="/potok.jpg" alt="logo" className="logo-img" />
          <span className="logo-text">Бесконечные потоки</span>
        </div>
        <nav className="nav">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`nav-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
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
