// Wrapper to ensure proper serverless function export
const app = require('./server.cjs')

// Export for Vercel
module.exports = app
