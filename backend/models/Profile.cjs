const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  bio: String,
  location: String,
  website: String,
  company: String,
  avatarUrl: String,
  githubUrl: {
    type: String,
    required: true,
  },
  twitterUsername: String,
  followers: Number,
  following: Number,
  publicRepos: Number,
  topLanguages: [String],
  pinnedRepos: [
    {
      name: String,
      description: String,
      url: String,
      stars: Number,
      forks: Number,
    },
  ],
  contributions: {
    lastYear: Number,
    streak: Number,
  },
  markdownContent: String,
  template: {
    type: String,
    default: 'default',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Profile', ProfileSchema)
