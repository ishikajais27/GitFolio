const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/gitfolio',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error('Database connection error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
