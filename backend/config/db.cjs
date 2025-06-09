// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI || 'mongodb://localhost:27017/gitfolio',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     )
//     console.log('MongoDB Connected...')
//   } catch (err) {
//     console.error('Database connection error:', err.message)
//     process.exit(1)
//   }
// }

// module.exports = connectDB
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/gitfolio',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        maxPoolSize: 10, // Maintain up to 10 socket connections
        minPoolSize: 2, // Maintain at least 2 socket connections
        retryWrites: true, // Retry write operations on failure
        retryReads: true, // Retry read operations on failure
      }
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`)

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB')
    })

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from DB')
    })
  } catch (err) {
    console.error('Database connection error:', err.message)

    // Graceful shutdown in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Application terminating...')
      // Give time for logs to flush before exiting
      setTimeout(() => process.exit(1), 1000)
    } else {
      // More developer-friendly in development
      console.error(
        'Please check your database connection and restart the server'
      )
      process.exit(1)
    }
  }
}

// Close the Mongoose connection when the Node process ends
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Mongoose connection closed due to application termination')
  process.exit(0)
})

module.exports = connectDB
