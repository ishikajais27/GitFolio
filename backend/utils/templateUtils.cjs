// const applyTemplateReplacements = (template, data) => {
//   let result = template

//   // Replace simple placeholders
//   for (const [key, value] of Object.entries(data)) {
//     if (typeof value === 'string' || typeof value === 'number') {
//       result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
//     }
//   }

//   // Handle aboutMe section
//   result = result.replace(
//     /\{\{#if aboutMe\}\}(.*?)\{\{\/if\}\}/gs,
//     (match, content) => {
//       if (!data.aboutMe || !Array.isArray(data.aboutMe)) return ''
//       return data.aboutMe
//         .map((item) => content.replace('{{this}}', item))
//         .join('')
//     }
//   )

//   // Handle skills/tools section
//   result = result.replace(
//     /\{\{#if (skills|tools)\}\}(.*?)\{\{\/if\}\}/gs,
//     (match, field, content) => {
//       if (!data[field] || typeof data[field] !== 'object') return ''

//       if (field === 'skills') {
//         return Object.entries(data.skills)
//           .map(([skill, level]) =>
//             content.replace('{{@key}}', skill).replace('{{this}}', level)
//           )
//           .join('')
//       } else {
//         return data.tools
//           .map((tool) => content.replace('{{this.name}}', tool.name))
//           .join('')
//       }
//     }
//   )

//   // Handle socialLinks section
//   result = result.replace(
//     /\{\{#if socialLinks\}\}(.*?)\{\{\/if\}\}/gs,
//     (match, content) => {
//       if (!data.socialLinks || !Array.isArray(data.socialLinks)) return ''

//       return data.socialLinks
//         .map((link) => {
//           let linkContent = content
//           for (const [key, value] of Object.entries(link)) {
//             linkContent = linkContent.replace(
//               new RegExp(`\\{\\{this.${key}\\}\\}`, 'g'),
//               value
//             )
//           }
//           return linkContent
//         })
//         .join('')
//     }
//   )

//   return result
// }
// backend/utils/templateUtils.cjs
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
  result = result
    .replace(/\{\{username\}\}/g, data.username)
    .replace(/\{\{name\}\}/g, data.name)
    .replace(/\{\{bio\}\}/g, data.bio)
    .replace(/\{\{avatarUrl\}\}/g, data.avatarUrl)
    .replace(/\{\{location\}\}/g, data.location)
    .replace(/\{\{website\}\}/g, data.website)
    .replace(/\{\{company\}\}/g, data.company)
    .replace(/\{\{githubUrl\}\}/g, data.githubUrl)
    .replace(/\{\{followers\}\}/g, data.followers)
    .replace(/\{\{following\}\}/g, data.following)
    .replace(/\{\{publicRepos\}\}/g, data.publicRepos)

  // Social links
  if (data.socialLinks && data.socialLinks.length > 0) {
    const socialLinksMarkdown = data.socialLinks
      .map((link) => {
        return `[![${link.alt}](${link.icon})](${link.url})`
      })
      .join(' ')
    result = result.replace(/\{\{socialLinks\}\}/g, socialLinksMarkdown)
  } else {
    result = result.replace(/\{\{socialLinks\}\}/g, '')
  }

  // Top languages
  if (data.topLanguages && data.topLanguages.length > 0) {
    const languagesMarkdown = data.topLanguages
      .map((lang) => {
        return `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(
          lang
        )}-informational?style=flat&logo=${encodeURIComponent(
          lang.toLowerCase()
        )}&logoColor=white)`
      })
      .join(' ')
    result = result.replace(/\{\{topLanguages\}\}/g, languagesMarkdown)
  } else {
    result = result.replace(/\{\{topLanguages\}\}/g, '')
  }

  return result
}
