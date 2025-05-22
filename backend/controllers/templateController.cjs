const {
  loadTemplates,
  applyTemplateReplacements,
} = require('../utils/templateUtils.cjs')

exports.getTemplates = (req, res) => {
  try {
    const templatesDir = path.join(__dirname, '../../templates')
    const files = fs.readdirSync(templatesDir)

    const templates = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const templateId = file.replace('.md', '')
        let name = templateId
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/-/g, ' ')

        // Add proper names for the new templates
        if (templateId === 'template3') name = 'Minimalist'
        if (templateId === 'template4') name = 'Detailed'

        return {
          id: templateId,
          name,
          previewUrl: `/templates/previews/${file.replace('.md', '.png')}`,
        }
      })

    res.json(templates)
  } catch (err) {
    res.status(500).json({ error: 'Unable to read templates' })
  }
}
exports.generateTemplate = (req, res) => {
  const { templateId } = req.params
  const profileData = req.body

  try {
    const templates = loadTemplates()
    if (!templates[templateId]) {
      return res.status(404).json({ error: 'Template not found' })
    }

    const markdown = applyTemplateReplacements(
      templates[templateId],
      profileData
    )
    res.send(markdown)
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate template',
      details: error.message,
    })
  }
}
