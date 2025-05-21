import { useState } from 'react'
import '../styles/GitHubParser.css'

const socialPlatforms = [
  { id: 'linkedin', label: 'LinkedIn', placeholder: 'username or profile URL' },
  { id: 'twitter', label: 'Twitter', placeholder: 'username' },
  { id: 'instagram', label: 'Instagram', placeholder: 'username' },
  { id: 'youtube', label: 'YouTube', placeholder: 'channel ID or URL' },
  { id: 'leetcode', label: 'LeetCode', placeholder: 'username' },
  { id: 'hackerrank', label: 'HackerRank', placeholder: 'username' },
  { id: 'email', label: 'Email', placeholder: 'your@email.com' },
  { id: 'website', label: 'Website', placeholder: 'https://yourwebsite.com' },
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
        <div className="stars-icon">⭐</div>
        <h2>Best Profile Generator</h2>
      </div>
      <p className="parser-subtitle">
        Create your perfect GitHub Profile ReadMe in the best possible way
      </p>

      <form onSubmit={handleSubmit} className="parser-form">
        <div className="form-group">
          <label htmlFor="username">GitHub Username</label>
          <div className="input-with-icon">
            <span className="input-icon">👤</span>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="template">Template Style</label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="template1">Professional</option>
            <option value="template2">Creative</option>
          </select>
        </div>

        <button
          type="button"
          className="toggle-social-links"
          onClick={() => setShowSocialLinks(!showSocialLinks)}
        >
          {showSocialLinks ? '▼ Hide Social Links' : '▶ Add Social Links'}
        </button>

        {showSocialLinks && (
          <div className="social-links-container">
            <h4>Add your social media links (optional)</h4>
            <div className="social-links-grid">
              {socialPlatforms.map((platform) => (
                <div className="form-group" key={platform.id}>
                  <label htmlFor={platform.id}>{platform.label}</label>
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
                  />
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
              <span className="bolt-icon">⚡</span> Generate README
            </>
          )}
        </button>

        {error && <div className="error-message">⚠️ {error}</div>}
      </form>

      <div className="parser-footer">
        <p>Support us by sharing with your friends!</p>
      </div>
    </div>
  )
}
