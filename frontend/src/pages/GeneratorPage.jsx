// import { useState } from 'react'
// import GitHubParser from '../components/GitHubParser'
// import MarkdownPreview from '../components/MarkdownPreview'
// import '../styles/GeneratorPage.css'

// export default function GeneratorPage() {
//   const [markdown, setMarkdown] = useState('')
//   const [profileData, setProfileData] = useState(null)

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
//           />
//         </div>
//         <div className="preview-column">
//           <MarkdownPreview markdown={markdown} profileData={profileData} />
//         </div>
//       </div>
//     </div>
//   )
// }

// src/pages/GeneratorPage.jsx
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
