const express = require('express')
const connectDB = require('./config/db.cjs')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Rate limiting for all API routes
const limiter = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Database connection
connectDB()

// Routes
app.use('/api/profiles', require('./routes/api.cjs'))
app.use('/api/github', require('./routes/githubParser.cjs')) // Changed endpoint

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something broke!',
    tip: 'The GitHub API may be rate-limited. Try again in a few minutes.',
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
