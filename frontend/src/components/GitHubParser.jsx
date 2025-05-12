import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
  Avatar,
  Chip,
} from '@mui/material'

export default function GitHubParser({ setMarkdown, setProfileData }) {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [previewData, setPreviewData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setProfileData(data)
      setMarkdown(data.markdownContent)
      setPreviewData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="e.g. torvalds"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!username || isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Generate README'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>

        {previewData && (
          <Box
            sx={{
              flex: 1,
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={previewData.avatar_url}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">
                  {previewData.name || previewData.username}
                </Typography>
                <Typography color="text.secondary">
                  {previewData.bio || 'GitHub Developer'}
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Activity:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip label={`${previewData.stats.repos} Repos`} size="small" />
              <Chip
                label={`${previewData.stats.commits} Commits`}
                size="small"
              />
              <Chip label={`${previewData.stats.prs} PRs`} size="small" />
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Top Tech:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {previewData.languages.slice(0, 5).map((lang) => (
                <Chip key={lang} label={lang} size="small" />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
