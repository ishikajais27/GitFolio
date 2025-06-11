const { createServer } = require('http')
const app = require('../backend/server.cjs')

module.exports = (req, res) => {
  app(req, res)
}
