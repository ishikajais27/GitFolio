import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import { Button, Box, Typography, Paper } from '@mui/material'
import { saveAs } from 'file-saver'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'

export default function MarkdownPreview({ markdown, profileData }) {
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    saveAs(blob, 'README.md')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">README Preview</Typography>

        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleCopy}
            disabled={!markdown}
            sx={{ mr: 1 }}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!markdown}
          >
            Download
          </Button>
        </Box>
      </Box>

      <Box
        className="markdown-body"
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          minHeight: '60vh',
          overflow: 'auto',
        }}
      >
        {markdown ? (
          <ReactMarkdown>{markdown}</ReactMarkdown>
        ) : (
          <Typography
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            Enter a GitHub username to generate a profile README
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
