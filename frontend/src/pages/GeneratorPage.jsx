import { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material'
import GitHubParser from '../components/GitHubParser'
import MarkdownPreview from '../components/MarkdownPreview'
import TemplateSelector from '../components/TemplateSelector'

export default function GeneratorPage() {
  const [markdown, setMarkdown] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [profileData, setProfileData] = useState({
    username: '',
    name: '',
    bio: '',
    location: '',
    githubUrl: '',
    skills: [],
    pinnedRepos: [],
  })

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        GitHub Profile README Generator
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="GitHub Profile" />
          <Tab label="Custom Template" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {activeTab === 0 ? (
            <GitHubParser
              setMarkdown={setMarkdown}
              setProfileData={setProfileData}
            />
          ) : (
            <TemplateSelector
              profileData={profileData}
              setMarkdown={setMarkdown}
            />
          )}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <MarkdownPreview markdown={markdown} profileData={profileData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
