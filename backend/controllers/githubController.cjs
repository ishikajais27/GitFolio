// backend/controllers/githubController.cjs
const axios = require('axios')
const { formatSocialUrl, getSocialIcon } = require('../utils/socialUtils.cjs')
const {
  loadTemplates,
  applyTemplateReplacements,
} = require('../utils/templateUtils.cjs')
const Profile = require('../models/Profile.cjs')

exports.fetchGitHubData = async (username) => {
  const [userRes, reposRes] = await Promise.all([
    axios.get(`https://api.github.com/users/${username}`),
    axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    ),
  ])

  const user = userRes.data
  const repos = reposRes.data

  // Analyze languages
  const languages = {}
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  })

  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)

  return {
    username: user.login,
    name: user.name || user.login,
    bio: user.bio || '',
    headline: user.bio
      ? user.bio.split('.')[0]
      : `A passionate developer from ${user.location || 'Earth'}`,
    avatarUrl: user.avatar_url,
    location: user.location || '',
    website: user.blog || '',
    company: user.company || '',
    githubUrl: user.html_url,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    education: user.company || 'Computer Science', // Default if not specified
    education_location: user.location || 'World',
    funFact: `I have ${user.public_repos} public repositories and ${user.followers} followers!`,
    topLanguages,
    skills: topLanguages.reduce((acc, lang) => {
      acc[lang.toLowerCase()] = 'Proficient'
      return acc
    }, {}),
  }
}
// exports.fetchGitHubData = async (username) => {
//   const [userRes, reposRes] = await Promise.all([
//     axios.get(`https://api.github.com/users/${username}`),
//     axios.get(
//       `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
//     ),
//   ])

//   const user = userRes.data
//   const repos = reposRes.data

//   // Analyze languages
//   const languages = {}
//   repos.forEach((repo) => {
//     if (repo.language) {
//       languages[repo.language] = (languages[repo.language] || 0) + 1
//     }
//   })

//   const topLanguages = Object.entries(languages)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)
//     .map(([lang]) => lang)

//   return {
//     username: user.login,
//     name: user.name || user.login,
//     bio: user.bio || '',
//     avatarUrl: user.avatar_url,
//     location: user.location || '',
//     website: user.blog || '',
//     company: user.company || '',
//     githubUrl: user.html_url,
//     followers: user.followers,
//     following: user.following,
//     publicRepos: user.public_repos,
//     topLanguages,
//     skills: topLanguages.reduce((acc, lang) => {
//       acc[lang.toLowerCase()] = 'Proficient'
//       return acc
//     }, {}),
//   }
// }

exports.generateProfile = async (req, res) => {
  try {
    const { username, template = 'template1', socialLinks = {} } = req.body

    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required' })
    }

    // Check cache first
    let profile = await Profile.findOne({ username, template })

    if (!profile) {
      // Fetch fresh data
      const profileData = await this.fetchGitHubData(username)

      // Process social links
      const processedSocialLinks = Object.entries(socialLinks)
        .filter(([_, url]) => url?.trim())
        .map(([platform, url]) => ({
          platform,
          url: formatSocialUrl(platform, url),
          icon: getSocialIcon(platform),
          alt: `${platform} logo`,
        }))

      // Load and apply template
      const templates = loadTemplates()
      if (!templates[template]) {
        return res.status(400).json({ error: 'Template not found' })
      }

      const markdown = applyTemplateReplacements(templates[template], {
        ...profileData,
        socialLinks: processedSocialLinks,
      })

      // Save to database
      profile = new Profile({
        ...profileData,
        markdownContent: markdown,
        template,
        socialLinks: processedSocialLinks,
        lastUpdated: new Date(),
      })

      await profile.save()
    }

    res.json(profile)
  } catch (error) {
    console.error('Error generating profile:', error)
    res.status(500).json({
      error: error.message || 'Failed to generate profile',
      suggestion: 'Please check the username and try again',
    })
  }
}

exports.downloadProfile = async (req, res) => {
  try {
    const { markdown } = req.body
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' })
    }

    res.setHeader('Content-Type', 'text/markdown')
    res.setHeader('Content-Disposition', 'attachment; filename=README.md')
    res.send(markdown)
  } catch (error) {
    console.error('Error downloading profile:', error)
    res.status(500).json({ error: 'Failed to download profile' })
  }
}
