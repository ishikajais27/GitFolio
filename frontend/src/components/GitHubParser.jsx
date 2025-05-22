'use client'

import { useState } from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCode,
  FaEnvelope,
  FaGlobe,
  FaChevronDown,
  FaChevronRight,
  FaBolt,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { SiLeetcode, SiHackerrank } from 'react-icons/si'
import '../styles/GitHubParser.css'

const socialPlatforms = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'username or profile URL',
    icon: <FaLinkedin />,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    placeholder: 'username',
    icon: <FaTwitter />,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    placeholder: 'username',
    icon: <FaInstagram />,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    placeholder: 'channel ID or URL',
    icon: <FaYoutube />,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    placeholder: 'username',
    icon: <SiLeetcode />,
  },
  {
    id: 'hackerrank',
    label: 'HackerRank',
    placeholder: 'username',
    icon: <SiHackerrank />,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    icon: <FaEnvelope />,
  },
  {
    id: 'website',
    label: 'Website',
    placeholder: 'https://yourwebsite.com',
    icon: <FaGlobe />,
  },
]

export default function GitHubParser({ setMarkdown, setProfileData }) {
  const [username, setUsername] = useState('')
  const [template, setTemplate] = useState('template1')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [socialLinks, setSocialLinks] = useState({})
  const [showSocialLinks, setShowSocialLinks] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          template,
          socialLinks: Object.fromEntries(
            Object.entries(socialLinks).filter(
              ([_, value]) => value && value.trim() !== ''
            )
          ),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }

      setProfileData(data)
      setMarkdown(data.markdownContent)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="parser-container">
      <div className="parser-header">
        <div className="stars-icon">
          <span className="star-pulse">⭐</span>
        </div>
        <h2>Best Profile Generator</h2>
      </div>
      <p className="parser-subtitle">
        Create your perfect GitHub Profile ReadMe in the best possible way
      </p>

      <form onSubmit={handleSubmit} className="parser-form">
        <div className="form-group">
          <label htmlFor="username">
            <FaGithub className="label-icon" /> GitHub Username
          </label>
          <div className="input-wrapper">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds"
              required
              className="enhanced-input"
            />
            <div className="input-focus-indicator"></div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="template">
            <FaCode className="label-icon" /> Template Style
          </label>
          <div className="select-wrapper">
            <select
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="enhanced-select"
            >
              <option value="template1">Professional</option>
              <option value="template2">Creative</option>
              <option value="template3">Minimalist</option>
              <option value="template4">Detailed</option>
            </select>
            <div className="select-arrow">▼</div>
            <div className="input-focus-indicator"></div>
          </div>
        </div>

        <button
          type="button"
          className="toggle-social-links"
          onClick={() => setShowSocialLinks(!showSocialLinks)}
        >
          {showSocialLinks ? (
            <FaChevronDown className="toggle-icon" />
          ) : (
            <FaChevronRight className="toggle-icon" />
          )}
          {showSocialLinks ? 'Hide Social Links' : 'Add Social Links'}
        </button>

        {showSocialLinks && (
          <div className="social-links-container">
            <h4>
              <span className="social-header-icon">🔗</span>
              Add your social media links (optional)
            </h4>
            <div className="social-links-grid">
              {socialPlatforms.map((platform) => (
                <div className="form-group social-form-group" key={platform.id}>
                  <label htmlFor={platform.id}>
                    <span className="social-icon">{platform.icon}</span>
                    {platform.label}
                  </label>
                  <div className="input-wrapper">
                    <input
                      id={platform.id}
                      type="text"
                      value={socialLinks[platform.id] || ''}
                      onChange={(e) =>
                        setSocialLinks((prev) => ({
                          ...prev,
                          [platform.id]: e.target.value,
                        }))
                      }
                      placeholder={platform.placeholder}
                      className="enhanced-input social-input"
                    />
                    <div className="input-focus-indicator"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="generate-button"
          disabled={!username || isLoading}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <FaBolt className="bolt-icon" /> Generate README
            </>
          )}
        </button>

        {error && (
          <div className="error-message">
            <FaExclamationTriangle className="error-icon" /> {error}
          </div>
        )}
      </form>

      <div className="parser-footer">
        <p>
          Support us by sharing with your friends!{' '}
          <span className="heart-icon">❤️</span>
        </p>
      </div>
    </div>
  )
}
