const express = require('express')
const router = express.Router()
const {
  getTemplates,
  generateTemplate,
} = require('../controllers/templateController.cjs')
const { generateProfile } = require('../controllers/githubController.cjs')

// Template routes
router.get('/templates', getTemplates)
router.post('/templates/:templateId/generate', generateTemplate)

// GitHub profile routes
router.post('/github', generateProfile)

module.exports = router
