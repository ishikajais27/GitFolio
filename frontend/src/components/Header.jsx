// src/components/Header.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <header className="app-header">
      <nav className="header-nav">
        <ul>
          <li className={activeTab === 'home' ? 'active' : ''}>
            <Link to="/" onClick={() => setActiveTab('home')}>
              Home
            </Link>
          </li>
          <li className={activeTab === 'templates' ? 'active' : ''}>
            <Link to="/templates" onClick={() => setActiveTab('templates')}>
              Template Preview
            </Link>
          </li>
          <li className={activeTab === 'about' ? 'active' : ''}>
            <Link to="/about" onClick={() => setActiveTab('about')}>
              About Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
