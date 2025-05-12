const axios = require('axios')
const router = require('express').Router()
const rateLimit = require('express-rate-limit')

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // limit each IP to 60 requests per windowMs
})

// Public GitHub API endpoints
const GITHUB_API = 'https://api.github.com'

async function fetchPublicGitHubData(username) {
  try {
    // 1. Basic Profile Data (public endpoint)
    const { data: profile } = await axios.get(
      `${GITHUB_API}/users/${username}`,
      {
        timeout: 5000, // 5 second timeout
      }
    )

    // 2. Public Repositories (limited to 3 for performance)
    const { data: repos } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=3`,
      {
        timeout: 5000,
      }
    )

    // 3. Get languages from repos (public data)
    const languages = new Set()
    const repoDetails = []

    // Process up to 3 repositories to stay within rate limits
    for (const repo of repos.slice(0, 3)) {
      try {
        const { data: repoData } = await axios.get(
          `${GITHUB_API}/repos/${username}/${repo.name}/languages`,
          {
            timeout: 3000,
          }
        )

        Object.keys(repoData).forEach((lang) => languages.add(lang))
        repoDetails.push({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          languages: Object.keys(repoData),
        })
      } catch (repoError) {
        console.log(`Skipping languages for ${repo.name}: ${repoError.message}`)
      }
    }

    return {
      username: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      location: profile.location,
      website: profile.blog,
      stats: {
        repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
      },
      top_repos: repoDetails,
      languages: Array.from(languages).slice(0, 5), // Top 5 languages
    }
  } catch (error) {
    console.error('GitHub API error:', error.message)
    throw new Error('Failed to fetch public GitHub data')
  }
}

function generateBasicREADME(data) {
  return `
# ${data.name || data.username}

${data.bio ? `> ${data.bio}\n` : ''}

## 📊 GitHub Stats
- Public Repos: ${data.stats.repos}
- Followers: ${data.stats.followers}
- Following: ${data.stats.following}

## 🛠 Top Technologies
${data.languages.map((lang) => `- ${lang}`).join('\n')}

## 🚀 Recent Projects
${data.top_repos
  .map(
    (repo) => `
### [${repo.name}](${repo.url})
${repo.description || ''}
Stars: ${repo.stars} | Forks: ${repo.forks}
`
  )
  .join('\n')}

## 🌐 Connect
${data.website ? `- Website: ${data.website}\n` : ''}
- GitHub: https://github.com/${data.username}
`.trim()
}

router.post('/', apiLimiter, async (req, res) => {
  try {
    const { username } = req.body

    if (!username || username.length > 39) {
      return res.status(400).json({
        error: 'Valid GitHub username required (1-39 characters)',
      })
    }

    const profileData = await fetchPublicGitHubData(username)
    profileData.markdownContent = generateBasicREADME(profileData)

    res.json(profileData)
  } catch (error) {
    res.status(500).json({
      error: error.message,
      suggestion: 'Try again later or check if the username exists',
    })
  }
})

module.exports = router
