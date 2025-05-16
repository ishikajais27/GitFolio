const fs = require('fs')
const path = require('path')

const loadTemplates = () => {
  const templatesDir = path.join(__dirname, '../templates')
  const templates = {}

  fs.readdirSync(templatesDir).forEach((file) => {
    if (file.endsWith('.md')) {
      const templateId = file.replace('.md', '')
      templates[templateId] = fs.readFileSync(
        path.join(templatesDir, file),
        'utf8'
      )
    }
  })

  return templates
}

const applyTemplateReplacements = (template, data) => {
  let result = template

  // Replace simple placeholders
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value)
    }
  }

  // Handle conditional blocks
  result = result.replace(
    /\{\{#if (.*?)\}\}(.*?)\{\{\/if\}\}/gs,
    (match, condition, content) => {
      const conditionMet =
        data[condition.trim()] &&
        (Array.isArray(data[condition.trim()])
          ? data[condition.trim()].length > 0
          : true)
      return conditionMet ? content : ''
    }
  )

  // Handle loops
  result = result.replace(
    /\{\{#each (.*?)\}\}(.*?)\{\{\/each\}\}/gs,
    (match, arrayName, content) => {
      if (!data[arrayName] || !Array.isArray(data[arrayName])) return ''
      return data[arrayName]
        .map((item) => {
          let itemContent = content
          for (const [key, value] of Object.entries(item)) {
            itemContent = itemContent.replace(
              new RegExp(`{{${key}}}`, 'g'),
              value
            )
          }
          return itemContent
        })
        .join('')
    }
  )

  return result
}

module.exports = {
  loadTemplates,
  applyTemplateReplacements,
}
