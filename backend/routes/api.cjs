const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile.cjs')

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 })
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Get profile by username
router.get('/:username', async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username })
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Save profile
router.post('/', async (req, res) => {
  try {
    const newProfile = new Profile(req.body)
    const profile = await newProfile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Delete profile
router.delete('/:username', async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username })
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' })
    }
    await profile.remove()
    res.json({ msg: 'Profile removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
