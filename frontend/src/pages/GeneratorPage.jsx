import { useState } from 'react'
import GitHubParser from '../components/GitHubParser'
import MarkdownPreview from '../components/MarkdownPreview'
import '../styles/GeneratorPage.css'

export default function GeneratorPage() {
  const [markdown, setMarkdown] = useState('')
  const [profileData, setProfileData] = useState(null)

  return (
    <div className="generator-page">
      <div className="page-header">
        <h1>GitHub Profile Generator</h1>
        <p className="page-subtitle">
          Create your perfect GitHub Profile ReadMe in the best possible way.
          Lots of features and tools included, all for free!
        </p>
      </div>

      <div className="generator-grid">
        <div className="parser-column">
          <GitHubParser
            setMarkdown={setMarkdown}
            setProfileData={setProfileData}
          />
        </div>
        <div className="preview-column">
          <MarkdownPreview markdown={markdown} profileData={profileData} />
        </div>
      </div>
    </div>
  )
}
// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import GitHubParser from '../components/GitHubParser'
// import MarkdownPreview from '../components/MarkdownPreview'
// import '../styles/GeneratorPage.css'

// export default function GeneratorPage() {
//   const [markdown, setMarkdown] = useState('')
//   const [profileData, setProfileData] = useState(null)
//   const [searchParams] = useSearchParams()
//   const [initialTemplate, setInitialTemplate] = useState('template1')

//   useEffect(() => {
//     const templateParam = searchParams.get('template')
//     if (templateParam === 'professional') {
//       setInitialTemplate('template1')
//     } else if (templateParam === 'creative') {
//       setInitialTemplate('template2')
//     }
//   }, [searchParams])

//   return (
//     <div className="generator-page">
//       <div className="page-header">
//         <h1>GitHub Profile Generator</h1>
//         <p className="page-subtitle">
//           Create your perfect GitHub Profile ReadMe in the best possible way.
//           Lots of features and tools included, all for free!
//         </p>
//       </div>

//       <div className="generator-grid">
//         <div className="parser-column">
//           <GitHubParser
//             setMarkdown={setMarkdown}
//             setProfileData={setProfileData}
//             initialTemplate={initialTemplate}
//           />
//         </div>
//         <div className="preview-column">
//           <MarkdownPreview markdown={markdown} profileData={profileData} />
//         </div>
//       </div>
//     </div>
//   )
// }
