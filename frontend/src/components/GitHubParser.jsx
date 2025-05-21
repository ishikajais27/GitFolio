import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Collapse,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="e.g. torvalds"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Template</InputLabel>
            <Select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              label="Template"
            >
              <MenuItem value="template1">Professional</MenuItem>
              <MenuItem value="template2">Creative</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={showSocialLinks ? <RemoveIcon /> : <AddIcon />}
          onClick={() => setShowSocialLinks(!showSocialLinks)}
          size="small"
        >
          {showSocialLinks ? 'Hide Social Links' : 'Add Social Links'}
        </Button>

        <Collapse in={showSocialLinks}>
          <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Add your social media links (optional)
            </Typography>
            <Grid container spacing={2}>
              {socialPlatforms.map((platform) => (
                <Grid item xs={12} sm={6} key={platform.id}>
                  <TextField
                    label={platform.label}
                    value={socialLinks[platform.id] || ''}
                    onChange={(e) =>
                      setSocialLinks((prev) => ({
                        ...prev,
                        [platform.id]: e.target.value,
                      }))
                    }
                    fullWidth
                    size="small"
                    placeholder={platform.placeholder}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Collapse>
      </Box>

      <Button
        type="submit"
        variant="contained"
        disabled={!username || isLoading}
        sx={{ mt: 2 }}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : 'Generate README'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  )
}
