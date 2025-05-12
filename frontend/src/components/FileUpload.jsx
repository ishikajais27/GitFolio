import { useDropzone } from 'react-dropzone'
import { Button, Box, Typography, CircularProgress, Alert } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import axios from 'axios'
import { useState } from 'react'
export default function FileUpload({ setMarkdown, setProfileData }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 1,
    onDrop: async ([file]) => {
      setIsLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('resume', file)

      try {
        const response = await axios.post(
          'http://localhost:5000/api/parser/resume',
          formData
        )
        setProfileData(response.data)
        generateMarkdown(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to parse resume')
        console.error('Upload error:', err)
      } finally {
        setIsLoading(false)
      }
    },
  })

  const generateMarkdown = (data) => {
    const md = `# ${data.name || 'Your Name'}

## Professional Summary
${data.summary || 'Add your professional summary here'}

## Core Skills
${
  data.skills?.map((skill) => `- ${skill}`).join('\n') || 'Add your skills here'
}

## Work Experience
${
  data.experience
    ?.map(
      (exp) => `
### ${exp.title}  
${exp.company ? `at ${exp.company}` : ''}  
_${exp.duration}_  
${exp.description}`
    )
    .join('\n') || 'Add your experience'
}

## Education
${
  data.education
    ?.map(
      (edu) => `
### ${edu.degree}  
${edu.institution}  
_${edu.duration}_`
    )
    .join('\n') || 'Add your education'
}
    `
    setMarkdown(md)
  }

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 1,
          p: 4,
          textAlign: 'center',
          mb: 2,
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon
          fontSize="large"
          color={isDragActive ? 'primary' : 'action'}
        />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {isDragActive
            ? 'Drop your resume here'
            : 'Drag & drop your resume (PDF/DOCX), or click to select'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Supported formats: PDF, DOCX
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Parsing your resume...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  )
}
