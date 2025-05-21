import { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ReactMarkdown from 'react-markdown'
import { downloadReadme } from '../utils/api'

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

      const blob = await downloadReadme(markdown)
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
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6">README Preview</Typography>
        <Box>
          <IconButton onClick={handleCopy} disabled={!markdown}>
            <ContentCopyIcon />
          </IconButton>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!markdown || isDownloading}
            size="small"
          >
            {isDownloading ? <CircularProgress size={20} /> : 'Download'}
          </Button>
        </Box>
      </Box>

      {copied && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Copied to clipboard!
        </Alert>
      )}

      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: 1,
          p: 2,
          minHeight: '500px',
          overflow: 'auto',
        }}
      >
        {markdown ? (
          <ReactMarkdown>{markdown}</ReactMarkdown>
        ) : (
          <Typography color="text.secondary">
            Your README preview will appear here...
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
