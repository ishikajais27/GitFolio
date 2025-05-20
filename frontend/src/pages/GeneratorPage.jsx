// import { useState } from 'react'
// import { Container, Grid } from '@mui/material'
// import GitHubParser from '../components/GitHubParser'
// import MarkdownPreview from '../components/MarkdownPreview'

// export default function GeneratorPage() {
//   const [markdown, setMarkdown] = useState('')
//   const [profileData, setProfileData] = useState(null)

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <GitHubParser
//             setMarkdown={setMarkdown}
//             setProfileData={setProfileData}
//           />
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <MarkdownPreview markdown={markdown} />
//         </Grid>
//       </Grid>
//     </Container>
//   )
// }
import { useState } from 'react'
import { Container, Grid } from '@mui/material'
import GitHubParser from '../components/GitHubParser'
import MarkdownPreview from '../components/MarkdownPreview'

export default function GeneratorPage() {
  const [markdown, setMarkdown] = useState('')
  const [profileData, setProfileData] = useState(null)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <GitHubParser
            setMarkdown={setMarkdown}
            setProfileData={setProfileData}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MarkdownPreview markdown={markdown} profileData={profileData} />
        </Grid>
      </Grid>
    </Container>
  )
}
