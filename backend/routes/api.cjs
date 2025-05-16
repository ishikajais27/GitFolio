// backend/routes/api.cjs
const express = require('express')
const router = express.Router()
const {
  getTemplates,
  generateTemplate,
} = require('../controllers/templateController.cjs')
const {
  generateProfile,
  downloadProfile,
} = require('../controllers/githubController.cjs')

// Template routes
router.get('/templates', getTemplates)
router.post('/templates/:templateId/generate', generateTemplate)

// GitHub profile routes
router.post('/github', generateProfile)
router.post('/github/download', downloadProfile)

module.exports = router
