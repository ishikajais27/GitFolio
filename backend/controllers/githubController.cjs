const axios = require('axios')
const { formatSocialUrl, getSocialIcon } = require('../utils/socialUtils.cjs')
const {
  loadTemplates,
  applyTemplateReplacements,
} = require('../utils/templateUtils.cjs')
const Profile = require('../models/Profile.cjs')

const generateDynamicContent = (userData) => {
  // Generate about me section
  const aboutMeSentences = []

  if (userData.topLanguages.length > 0) {
    aboutMeSentences.push(`A ${userData.topLanguages.join(', ')} developer`)
  } else {
    aboutMeSentences.push('A passionate software developer')
  }

  if (userData.location) {
    aboutMeSentences.push(`based in ${userData.location}`)
  }

  if (userData.company) {
    aboutMeSentences.push(`currently working at ${userData.company}`)
  }

  if (userData.publicRepos > 0) {
    aboutMeSentences.push(`with ${userData.publicRepos} public repositories`)
  }

  const aboutMe = aboutMeSentences.join(', ') + '.'

  // Generate headline
  const headline =
    userData.bio ||
    `Software Engineer | ${userData.topLanguages[0] || 'Full Stack'} Developer`

  return {
    ...userData,
    aboutMe,
    headline,
    aboutMeIntro: `This is ME, ${userData.name}, a ${
      userData.company ? 'professional' : 'budding'
    } developer.`,
    professionalDescription: `A ${
      userData.topLanguages.length > 0 ? userData.topLanguages[0] : 'Full Stack'
    } Developer and Open Source enthusiast.`,
    tagline: 'Learning while HOPING & HUSTLING!!!',
    currentWork: userData.company
      ? `projects at ${userData.company}`
      : 'personal projects',
    currentLearning: `${
      userData.topLanguages.length > 0 ? userData.topLanguages[0] : 'JavaScript'
    } and related technologies`,
    collaborationInterest: 'Open Source projects',
    helpInterest: 'anything related to what I do',
    expertiseTopics: userData.topLanguages.join(', ') || 'web development',
    funFact: `I have ${userData.publicRepos} public repositories and ${userData.followers} followers!`,
  }
}

exports.fetchGitHubData = async (username) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100`),
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

    const baseData = {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || '',
      avatarUrl: user.avatar_url,
      location: user.location || '',
      website: user.blog || '',
      company: user.company || '',
      githubUrl: user.html_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      topLanguages,
    }

    return generateDynamicContent(baseData)
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    throw new Error('Failed to fetch GitHub data')
  }
}

exports.generateProfile = async (req, res) => {
  try {
    const {
      username,
      template = 'template1',
      socialLinks = {},
      forceRefresh = false,
    } = req.body

    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required' })
    }

    // Check cache first, but respect forceRefresh flag
    let profile = await Profile.findOne({ username, template })

    // Add version tracking to invalidate old cached profiles
    const currentTemplateVersion = 4 // Increment this when you make template changes

    if (
      !profile ||
      forceRefresh ||
      profile.templateVersion !== currentTemplateVersion
    ) {
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

      // Update or create profile in database
      const profileDataToSave = {
        ...profileData,
        markdownContent: markdown,
        template,
        socialLinks: processedSocialLinks,
        lastUpdated: new Date(),
        templateVersion: currentTemplateVersion, // Store version with profile
      }

      if (profile) {
        // Update existing profile
        profile = await Profile.findOneAndUpdate(
          { username, template },
          profileDataToSave,
          { new: true }
        )
      } else {
        // Create new profile
        profile = new Profile(profileDataToSave)
        await profile.save()
      }
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
