import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import axios from 'axios'

export default function LinkedInParser({ setMarkdown, setProfileData }) {
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!linkedinUrl) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        'http://localhost:5000/api/parser/linkedin',
        {
          url: linkedinUrl,
        }
      )

      setProfileData(response.data)
      generateMarkdown(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to parse LinkedIn profile'
      )
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateMarkdown = (data) => {
    const md = `# ${data.name || 'Your Name'}

## 👋 About Me
${data.summary || 'Add your professional summary here'}

## 🛠 Skills
${
  data.skills?.map((skill) => `- ${skill}`).join('\n') || 'Add your skills here'
}

## 💼 Experience
${
  data.experience
    ?.map(
      (exp) => `
### ${exp.title} at ${exp.company}
_${exp.duration}_  
${exp.description}`
    )
    .join('\n') || 'Add your experience'
}

## 🎓 Education
${
  data.education
    ?.map(
      (edu) => `
### ${edu.degree} at ${edu.institution}
_${edu.duration}_`
    )
    .join('\n') || 'Add your education'
}
    `
    setMarkdown(md)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Enter LinkedIn Profile URL
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="LinkedIn Profile URL"
          variant="outlined"
          fullWidth
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://www.linkedin.com/in/your-profile"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!linkedinUrl || isLoading}
          sx={{ minWidth: 120 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Parse Profile'}
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Example: https://www.linkedin.com/in/username
      </Typography>
    </Box>
  )
}
