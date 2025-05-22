'use client'

// src/components/Header.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaImages, FaUser } from 'react-icons/fa'
import '../styles/Header.css'

export default function Header() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('home')

  // Update active tab based on current path
  useEffect(() => {
    const path = location.pathname
    if (path === '/') setActiveTab('home')
    else if (path === '/templates') setActiveTab('templates')
    else if (path === '/about') setActiveTab('about')
  }, [location])

  return (
    <header className="app-header">
      <div className="header-background"></div>
      <nav className="header-nav">
        <ul>
          <li className={activeTab === 'home' ? 'active' : ''}>
            <Link to="/" onClick={() => setActiveTab('home')}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className={activeTab === 'templates' ? 'active' : ''}>
            <Link to="/templates" onClick={() => setActiveTab('templates')}>
              <FaImages className="nav-icon" />
              <span>Template Preview</span>
            </Link>
          </li>
          <li className={activeTab === 'about' ? 'active' : ''}>
            <Link to="/about" onClick={() => setActiveTab('about')}>
              <FaUser className="nav-icon" />
              <span>About Me</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
