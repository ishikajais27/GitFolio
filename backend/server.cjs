// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const connectDB = require('./config/db.cjs')
// const apiRouter = require('./routes/api.cjs')
// const app = express()

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Database connection
// connectDB() // Using the imported connectDB function

// // Routes
// app.use('/api', apiRouter)

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res
//     .status(200)
//     .json({ status: 'OK', dbState: mongoose.connection.readyState })
// })

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({
//     error: 'Something went wrong!',
//     message: err.message,
//   })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err)
//   // Optionally exit the process
//   // process.exit(1)
// })

// module.exports = app
const express = require('express')
const app = express()

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Your existing routes and middleware
require('./config/db.cjs')()
app.use(express.json())
app.use('/api', require('./routes/api.cjs'))

// Serverless export
module.exports = app
