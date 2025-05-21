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
