import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
} from '@mui/material'

const templates = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard GitHub profile with stats and pinned repos',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple profile with basic information',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Focus on technical skills and projects',
  },
]

export default function TemplateSelector({ profileData, setMarkdown }) {
  const [selectedTemplate, setSelectedTemplate] = useState('default')

  const generateREADME = () => {
    let md = ''

    if (selectedTemplate === 'default') {
      md = `# Hi there, I'm ${profileData.name || profileData.username}! 👋

${profileData.bio ? `> ${profileData.bio}\n` : ''}

## 🌍 About Me
- 🔭 I'm currently working ${
        profileData.company
          ? `at ${profileData.company}`
          : 'on exciting projects'
      }
- 🌱 I'm currently learning ${
        profileData.skills?.join(', ') || 'new technologies'
      }
- 📫 How to reach me: ${
        profileData.website || `[GitHub](${profileData.githubUrl})`
      }

## 🚀 Skills
${profileData.skills?.map((skill) => `- ${skill}`).join('\n')}

## 📊 GitHub Stats
![${
        profileData.username
      }'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${
        profileData.username
      }&show_icons=true&theme=radical)

## 🔝 Top Repositories
${profileData.pinnedRepos
  ?.slice(0, 3)
  .map(
    (repo) => `
### [${repo.name}](${repo.url})
${repo.description || ''}
`
  )
  .join('\n')}
`
    } else if (selectedTemplate === 'minimal') {
      md = `# ${profileData.name || profileData.username}

${profileData.bio ? `${profileData.bio}\n` : ''}

## Contact
[GitHub](${profileData.githubUrl})
${profileData.website ? `[Website](${profileData.website})` : ''}
`
    }

    setMarkdown(md)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select a Template
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map((template) => (
            <FormControlLabel
              key={template.id}
              value={template.id}
              control={<Radio />}
              label={
                <Box sx={{ ml: 1 }}>
                  <Typography>{template.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      <Button
        variant="contained"
        onClick={generateREADME}
        disabled={!profileData.username}
        fullWidth
      >
        Generate README
      </Button>
    </Box>
  )
}
