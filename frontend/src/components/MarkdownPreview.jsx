import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import '../styles/MarkdownPreview.css'

export default function MarkdownPreview({ markdown, profileData }) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = async () => {
    if (!markdown) return

    setIsDownloading(true)
    try {
      const response = await fetch(
        'http://localhost:5000/api/github/download',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ markdown, profileData }),
        }
      )

      if (!response.ok) throw new Error('Download failed')

      const blob = new Blob([markdown], { type: 'text/markdown' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'README.md'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download error:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="preview-title">
          <div className="avatar">👁️</div>
          <h3>README Preview</h3>
        </div>
        <div className="preview-actions">
          <button
            onClick={handleCopy}
            disabled={!markdown}
            className="icon-button"
            title="Copy to clipboard"
          >
            ⎘
          </button>
          <button
            onClick={handleDownload}
            disabled={!markdown || isDownloading}
            className="download-button"
          >
            {isDownloading ? (
              <span className="small-spinner"></span>
            ) : (
              '↓ Download'
            )}
          </button>
        </div>
      </div>

      {copied && <div className="copied-message">✓ Copied to clipboard!</div>}

      <div className="markdown-content">
        {markdown ? (
          <ReactMarkdown>{markdown}</ReactMarkdown>
        ) : (
          <div className="empty-state">
            <div className="github-icon">🐙</div>
            <h4>Your README Preview</h4>
            <p>
              Enter your GitHub username and generate your profile to see the
              preview here.
            </p>
          </div>
        )}
      </div>

      <div className="preview-footer">
        <p>Made with ❤️ for developers</p>
      </div>
    </div>
  )
}
