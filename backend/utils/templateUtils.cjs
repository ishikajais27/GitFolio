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

  // Basic replacements (unchanged)
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

  // Enhanced social links processing for new templates
  if (data.socialLinks?.length > 0) {
    // Check if template requires compact social links (template3)
    if (template.includes('{{socialLinksCompact}}')) {
      const socialMarkdown = data.socialLinks
        .map((link) => `[![${link.platform}](${link.icon})](${link.url})`)
        .join(' ')
      result = result.replace(/\{\{socialLinksCompact\}\}/g, socialMarkdown)
    }
    // Check if template requires vertical social links (template4)
    else if (template.includes('{{socialLinksVertical}}')) {
      const socialMarkdown = data.socialLinks
        .map((link) => `- [${link.platform}](${link.url})`)
        .join('\n')
      result = result.replace(/\{\{socialLinksVertical\}\}/g, socialMarkdown)
    }
    // Default social links (templates 1 and 2)
    else {
      const socialMarkdown = data.socialLinks
        .map(
          (link) =>
            `<a href="${link.url}" target="_blank"><img align="center" src="${link.icon}" alt="${link.alt}" height="30" width="40" /></a>`
        )
        .join('\n')
      result = result.replace(/\{\{socialLinks\}\}/g, socialMarkdown)
    }
  }

  // Enhanced languages processing for new templates
  if (data.topLanguages?.length > 0) {
    // Check if template requires progress bar style (template3)
    if (template.includes('{{languagesProgress}}')) {
      const totalRepos = data.publicRepos || 1
      const langsMarkdown = data.topLanguages
        .map((lang, index) => {
          const percentage = Math.round(
            (data.languageStats[lang] / totalRepos) * 100
          )
          return `${lang} ![${percentage}%](https://progress-bar.dev/${percentage}/?width=200)`
        })
        .join('\n\n')
      result = result.replace(/\{\{languagesProgress\}\}/g, langsMarkdown)
    }
    // Default languages display (templates 1, 2 and 4)
    else {
      const langsMarkdown = data.topLanguages
        .map(
          (lang) =>
            `![${lang}](https://img.shields.io/badge/${lang}-informational?style=flat&logo=${lang.toLowerCase()}&logoColor=white)`
        )
        .join('\n')
      result = result.replace(/\{\{topLanguages\}\}/g, langsMarkdown)
    }
  }

  return result
}
