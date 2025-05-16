const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.cjs')
const apiRouter = require('./routes/api.cjs')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
connectDB() // Using the imported connectDB function

// Routes
app.use('/api', apiRouter)

// Health check endpoint
app.get('/health', (req, res) => {
  res
    .status(200)
    .json({ status: 'OK', dbState: mongoose.connection.readyState })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  // Optionally exit the process
  // process.exit(1)
})
