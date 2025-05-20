// const fs = require('fs')
// const path = require('path')

// exports.loadTemplates = () => {
//   const templatesDir = path.join(__dirname, '../templates')
//   const files = fs.readdirSync(templatesDir)

//   const templates = {}
//   files.forEach((file) => {
//     if (file.endsWith('.md')) {
//       const templateName = file.replace('.md', '')
//       templates[templateName] = fs.readFileSync(
//         path.join(templatesDir, file),
//         'utf8'
//       )
//     }
//   })
//   return templates
// }

// // exports.applyTemplateReplacements = (template, data) => {
// //   let result = template

// //   // Basic replacements
// //   result = result
// //     .replace(/\{\{username\}\}/g, data.username)
// //     .replace(/\{\{name\}\}/g, data.name)
// //     .replace(/\{\{bio\}\}/g, data.bio)
// //     .replace(/\{\{avatarUrl\}\}/g, data.avatarUrl)
// //     .replace(/\{\{location\}\}/g, data.location)
// //     .replace(/\{\{website\}\}/g, data.website)
// //     .replace(/\{\{company\}\}/g, data.company)
// //     .replace(/\{\{githubUrl\}\}/g, data.githubUrl)
// //     .replace(/\{\{followers\}\}/g, data.followers)
// //     .replace(/\{\{following\}\}/g, data.following)
// //     .replace(/\{\{publicRepos\}\}/g, data.publicRepos)

// //   // Social links
// //   if (data.socialLinks && data.socialLinks.length > 0) {
// //     const socialLinksMarkdown = data.socialLinks
// //       .map((link) => {
// //         return `[![${link.alt}](${link.icon})](${link.url})`
// //       })
// //       .join(' ')
// //     result = result.replace(/\{\{socialLinks\}\}/g, socialLinksMarkdown)
// //   } else {
// //     result = result.replace(/\{\{socialLinks\}\}/g, '')
// //   }

// //   // Top languages
// //   if (data.topLanguages && data.topLanguages.length > 0) {
// //     const languagesMarkdown = data.topLanguages
// //       .map((lang) => {
// //         return `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(
// //           lang
// //         )}-informational?style=flat&logo=${encodeURIComponent(
// //           lang.toLowerCase()
// //         )}&logoColor=white)`
// //       })
// //       .join(' ')
// //     result = result.replace(/\{\{topLanguages\}\}/g, languagesMarkdown)
// //   } else {
// //     result = result.replace(/\{\{topLanguages\}\}/g, '')
// //   }

// //   return result
// // }
// exports.applyTemplateReplacements = (template, data) => {
//   let result = template
//     .replace(/\{\{username\}\}/g, data.username)
//     .replace(/\{\{name\}\}/g, data.name)
//     .replace(/\{\{bio\}\}/g, data.bio)
//     .replace(/\{\{aboutMe\}\}/g, data.aboutMe)
//     .replace(/\{\{avatarUrl\}\}/g, data.avatarUrl)
//     .replace(/\{\{location\}\}/g, data.location)
//     .replace(/\{\{website\}\}/g, data.website)
//     .replace(/\{\{company\}\}/g, data.company)
//     .replace(/\{\{githubUrl\}\}/g, data.githubUrl)
//     .replace(/\{\{followers\}\}/g, data.followers)
//     .replace(/\{\{following\}\}/g, data.following)
//     .replace(/\{\{publicRepos\}\}/g, data.publicRepos)

//   // Social links processing
//   if (data.socialLinks?.length > 0) {
//     const socialMarkdown = data.socialLinks
//       .map((link) => `[![${link.alt}](${link.icon})](${link.url})`)
//       .join(' ')
//     result = result.replace(/\{\{socialLinks\}\}/g, socialMarkdown)
//   }

//   // Top languages processing
//   if (data.topLanguages?.length > 0) {
//     const langsMarkdown = data.topLanguages
//       .map(
//         (lang) =>
//           `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(
//             lang
//           )}-informational?style=flat&logo=${encodeURIComponent(
//             lang.toLowerCase()
//           )}&logoColor=white)`
//       )
//       .join(' ')
//     result = result.replace(/\{\{topLanguages\}\}/g, langsMarkdown)
//   }

//   return result
// }
const fs = require('fs')
const path = require('path')

exports.loadTemplates = () => {
  const templatesDir = path.join(__dirname, '../templates')
  const files = fs.readdirSync(templatesDir)

  const templates = {}
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const templateName = file.replace('.md', '')
      templates[templateName] = fs.readFileSync(
        path.join(templatesDir, file),
        'utf8'
      )
    }
  })
  return templates
}

exports.applyTemplateReplacements = (template, data) => {
  let result = template

  // Basic replacements
  const basicReplacements = [
    'username',
    'name',
    'bio',
    'aboutMe',
    'avatarUrl',
    'location',
    'website',
    'company',
    'githubUrl',
    'followers',
    'following',
    'publicRepos',
    'headline',
    'aboutMeIntro',
    'professionalDescription',
    'tagline',
    'currentWork',
    'currentLearning',
    'collaborationInterest',
    'helpInterest',
    'expertiseTopics',
    'funFact',
  ]

  basicReplacements.forEach((key) => {
    if (data[key]) {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), data[key])
    }
  })

  // Social links processing
  if (data.socialLinks?.length > 0) {
    const socialMarkdown = data.socialLinks
      .map(
        (link) =>
          `<a href="${link.url}" target="_blank"><img align="center" src="${link.icon}" alt="${link.alt}" height="30" width="40" /></a>`
      )
      .join('\n')
    result = result.replace(/\{\{socialLinks\}\}/g, socialMarkdown)
  }

  // Top languages processing
  if (data.topLanguages?.length > 0) {
    const langsMarkdown = data.topLanguages
      .map(
        (lang) =>
          `![${lang}](https://img.shields.io/badge/${lang}-informational?style=flat&logo=${lang.toLowerCase()}&logoColor=white)`
      )
      .join('\n')
    result = result.replace(/\{\{topLanguages\}\}/g, langsMarkdown)
  }

  return result
}
