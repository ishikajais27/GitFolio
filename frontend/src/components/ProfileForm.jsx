import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Chip,
  Stack,
  Typography,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function ProfileForm({
  profileData,
  setProfileData,
  setMarkdown,
}) {
  const [skillInput, setSkillInput] = useState('')
  const [expInput, setExpInput] = useState({
    title: '',
    company: '',
    duration: '',
    description: '',
  })

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()],
      })
      setSkillInput('')
    }
  }

  const handleAddExperience = () => {
    if (expInput.title.trim()) {
      setProfileData({
        ...profileData,
        experience: [...profileData.experience, expInput],
      })
      setExpInput({
        title: '',
        company: '',
        duration: '',
        description: '',
      })
    }
  }

  const generateMarkdown = () => {
    const md = `# ${profileData.name || 'Your Name'}

## 🛠 Skills
${
  profileData.skills.map((skill) => `- ${skill}`).join('\n') ||
  'Add your skills here'
}

## 💼 Experience
${
  profileData.experience
    .map(
      (exp) => `
### ${exp.title} at ${exp.company}
_${exp.duration}_  
${exp.description}`
    )
    .join('\n') || 'Add your experience'
}
    `
    setMarkdown(md)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>

      <TextField
        label="Your Name"
        fullWidth
        margin="normal"
        value={profileData.name}
        onChange={(e) =>
          setProfileData({ ...profileData, name: e.target.value })
        }
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Skills
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {profileData.skills.map((skill, index) => (
          <Chip key={index} label={skill} />
        ))}
      </Stack>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="Add Skill"
          fullWidth
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <Button
          variant="contained"
          onClick={handleAddSkill}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Experience
      </Typography>
      {profileData.experience.map((exp, index) => (
        <Box
          key={index}
          sx={{ mb: 2, p: 1, border: '1px solid #ddd', borderRadius: 1 }}
        >
          <Typography>
            <strong>{exp.title}</strong> at {exp.company}
          </Typography>
          <Typography variant="caption">{exp.duration}</Typography>
          <Typography>{exp.description}</Typography>
        </Box>
      ))}

      <TextField
        label="Job Title"
        fullWidth
        margin="normal"
        value={expInput.title}
        onChange={(e) => setExpInput({ ...expInput, title: e.target.value })}
      />
      <TextField
        label="Company"
        fullWidth
        margin="normal"
        value={expInput.company}
        onChange={(e) => setExpInput({ ...expInput, company: e.target.value })}
      />
      <TextField
        label="Duration"
        fullWidth
        margin="normal"
        value={expInput.duration}
        onChange={(e) => setExpInput({ ...expInput, duration: e.target.value })}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={expInput.description}
        onChange={(e) =>
          setExpInput({ ...expInput, description: e.target.value })
        }
      />
      <Button
        variant="contained"
        onClick={handleAddExperience}
        startIcon={<AddIcon />}
        sx={{ mt: 1 }}
      >
        Add Experience
      </Button>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={generateMarkdown}
        disabled={!profileData.name}
      >
        Generate README
      </Button>
    </Box>
  )
}
