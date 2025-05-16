const mongoose = require('mongoose')

const socialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
  alt: String,
})

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  bio: String,
  avatarUrl: String,
  location: String,
  website: String,
  company: String,
  githubUrl: String,
  followers: Number,
  following: Number,
  publicRepos: Number,
  topLanguages: [String],
  skills: mongoose.Schema.Types.Mixed,
  markdownContent: String,
  template: String,
  socialLinks: [socialLinkSchema],
  lastUpdated: { type: Date, default: Date.now },
})

profileSchema.index({ username: 1, template: 1 }, { unique: true })

module.exports = mongoose.model('Profile', profileSchema)
