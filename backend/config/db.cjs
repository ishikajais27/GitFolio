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
    const conn = await mongoose.connect('mongodb://localhost:27017/gitfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      retryReads: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error('Database connection error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
