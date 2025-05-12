const express = require('express')
const router = express.Router()
const axios = require('axios')
const qs = require('querystring')

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'your_client_id'
const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET || 'your_client_secret'
const GITHUB_CALLBACK_URL =
  process.env.GITHUB_CALLBACK_URL ||
  'http://localhost:5000/api/auth/github/callback'

// Redirect to GitHub's OAuth page
router.get('/github', (req, res) => {
  const params = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_CALLBACK_URL,
    scope: 'user repo', // Request access to user data and repos
    state: req.query.redirect || '/', // Optional: where to redirect after auth
  })

  res.redirect(`https://github.com/login/oauth/authorize?${params}`)
})

// Handle callback from GitHub
router.get('/github/callback', async (req, res) => {
  try {
    const { code, state } = req.query

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_CALLBACK_URL,
      },
      {
        headers: { Accept: 'application/json' },
      }
    )

    const { access_token, token_type } = tokenResponse.data

    // Get user data with the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `${token_type} ${access_token}` },
    })

    // Store the token securely (in session or database)
    req.session.githubToken = access_token
    req.session.githubUser = userResponse.data

    // Redirect to frontend with token (in production, use secure HTTP-only cookies)
    res.redirect(`${state}?token=${encodeURIComponent(access_token)}`)
  } catch (error) {
    console.error('OAuth Error:', error.message)
    res.redirect('/?error=github_auth_failed')
  }
})

module.exports = router
