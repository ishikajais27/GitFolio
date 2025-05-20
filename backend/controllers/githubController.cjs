// // const axios = require('axios')
// // const { formatSocialUrl, getSocialIcon } = require('../utils/socialUtils.cjs')
// // const {
// //   loadTemplates,
// //   applyTemplateReplacements,
// // } = require('../utils/templateUtils.cjs')
// // const Profile = require('../models/Profile.cjs')
// const axios = require('axios')
// const { formatSocialUrl, getSocialIcon } = require('../utils/socialUtils.cjs')
// const {
//   loadTemplates,
//   applyTemplateReplacements,
// } = require('../utils/templateUtils.cjs')
// const Profile = require('../models/Profile.cjs')

// const generateAboutMe = (userData) => {
//   const sentences = []

//   // Language expertise
//   if (userData.topLanguages.length > 0) {
//     const langs = userData.topLanguages.join(', ')
//     sentences.push(`${langs} developer`)
//   } else {
//     sentences.push('Passionate software developer')
//   }

//   // Location
//   sentences.push(
//     userData.location ? `based in ${userData.location}` : 'from Earth'
//   )

//   // Professional information
//   if (userData.company) {
//     sentences.push(`currently working at ${userData.company}`)
//   }

//   // Repositories information
//   if (userData.publicRepos > 0) {
//     sentences.push(`with ${userData.publicRepos} public repositories`)
//   } else if (userData.publicRepos === 0) {
//     sentences.push('actively exploring new technologies')
//   }

//   // Final composition
//   let aboutMe = sentences.join(', ')
//   aboutMe = aboutMe.charAt(0).toUpperCase() + aboutMe.slice(1) + '.'

//   return aboutMe
// }
// // exports.fetchGitHubData = async (username) => {
// //   const [userRes, reposRes] = await Promise.all([
// //     axios.get(`https://api.github.com/users/${username}`),
// //     axios.get(
// //       `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
// //     ),
// //   ])

// //   const user = userRes.data
// //   const repos = reposRes.data

// //   // Analyze languages
// //   const languages = {}
// //   repos.forEach((repo) => {
// //     if (repo.language) {
// //       languages[repo.language] = (languages[repo.language] || 0) + 1
// //     }
// //   })

// //   const topLanguages = Object.entries(languages)
// //     .sort((a, b) => b[1] - a[1])
// //     .slice(0, 5)
// //     .map(([lang]) => lang)

// //   return {
// //     username: user.login,
// //     name: user.name || user.login,
// //     bio: user.bio || '',
// //     headline: user.bio
// //       ? user.bio.split('.')[0]
// //       : `A passionate developer from ${user.location || 'Earth'}`,
// //     avatarUrl: user.avatar_url,
// //     location: user.location || '',
// //     website: user.blog || '',
// //     company: user.company || '',
// //     githubUrl: user.html_url,
// //     followers: user.followers,
// //     following: user.following,
// //     publicRepos: user.public_repos,
// //     education: user.company || 'Computer Science', // Default if not specified
// //     education_location: user.location || 'World',
// //     funFact: `I have ${user.public_repos} public repositories and ${user.followers} followers!`,
// //     topLanguages,
// //     skills: topLanguages.reduce((acc, lang) => {
// //       acc[lang.toLowerCase()] = 'Proficient'
// //       return acc
// //     }, {}),
// //   }
// // }
// exports.fetchGitHubData = async (username) => {
//   const [userRes, reposRes] = await Promise.all([
//     axios.get(`https://api.github.com/users/${username}`),
//     axios.get(
//       `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
//     ),
//   ])

//   const user = userRes.data
//   const repos = reposRes.data

//   // Language analysis
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

//   // Generate dynamic about me
//   const aboutMe = generateAboutMe({
//     topLanguages,
//     location: user.location,
//     company: user.company,
//     publicRepos: user.public_repos,
//   })

//   return {
//     username: user.login,
//     name: user.name || user.login,
//     bio: aboutMe, // Used for typing effect
//     aboutMe, // Used for about section
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
// exports.generateProfile = async (req, res) => {
//   try {
//     const { username, template = 'template1', socialLinks = {} } = req.body

//     if (!username) {
//       return res.status(400).json({ error: 'GitHub username is required' })
//     }

//     // Check cache first
//     let profile = await Profile.findOne({ username, template })

//     if (!profile) {
//       // Fetch fresh data
//       const profileData = await this.fetchGitHubData(username)

//       // Process social links
//       const processedSocialLinks = Object.entries(socialLinks)
//         .filter(([_, url]) => url?.trim())
//         .map(([platform, url]) => ({
//           platform,
//           url: formatSocialUrl(platform, url),
//           icon: getSocialIcon(platform),
//           alt: `${platform} logo`,
//         }))

//       // Load and apply template
//       const templates = loadTemplates()
//       if (!templates[template]) {
//         return res.status(400).json({ error: 'Template not found' })
//       }

//       const markdown = applyTemplateReplacements(templates[template], {
//         ...profileData,
//         socialLinks: processedSocialLinks,
//       })

//       // Save to database
//       profile = new Profile({
//         ...profileData,
//         markdownContent: markdown,
//         template,
//         socialLinks: processedSocialLinks,
//         lastUpdated: new Date(),
//       })

//       await profile.save()
//     }

//     res.json(profile)
//   } catch (error) {
//     console.error('Error generating profile:', error)
//     res.status(500).json({
//       error: error.message || 'Failed to generate profile',
//       suggestion: 'Please check the username and try again',
//     })
//   }
// }

// exports.downloadProfile = async (req, res) => {
//   try {
//     const { markdown } = req.body
//     if (!markdown) {
//       return res.status(400).json({ error: 'Markdown content is required' })
//     }

//     res.setHeader('Content-Type', 'text/markdown')
//     res.setHeader('Content-Disposition', 'attachment; filename=README.md')
//     res.send(markdown)
//   } catch (error) {
//     console.error('Error downloading profile:', error)
//     res.status(500).json({ error: 'Failed to download profile' })
//   }
// }
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
    const currentTemplateVersion = 2 // Increment this when you make template changes

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

// exports.generateProfile = async (req, res) => {
//   try {
//     const { username, template = 'template1', socialLinks = {} } = req.body

//     if (!username) {
//       return res.status(400).json({ error: 'GitHub username is required' })
//     }

//     // Check cache first
//     let profile = await Profile.findOne({ username, template })

//     if (!profile) {
//       // Fetch fresh data
//       const profileData = await this.fetchGitHubData(username)

//       // Process social links
//       const processedSocialLinks = Object.entries(socialLinks)
//         .filter(([_, url]) => url?.trim())
//         .map(([platform, url]) => ({
//           platform,
//           url: formatSocialUrl(platform, url),
//           icon: getSocialIcon(platform),
//           alt: `${platform} logo`,
//         }))

//       // Load and apply template
//       const templates = loadTemplates()
//       if (!templates[template]) {
//         return res.status(400).json({ error: 'Template not found' })
//       }

//       const markdown = applyTemplateReplacements(templates[template], {
//         ...profileData,
//         socialLinks: processedSocialLinks,
//       })

//       // Save to database
//       profile = new Profile({
//         ...profileData,
//         markdownContent: markdown,
//         template,
//         socialLinks: processedSocialLinks,
//         lastUpdated: new Date(),
//       })

//       await profile.save()
//     }

//     res.json(profile)
//   } catch (error) {
//     console.error('Error generating profile:', error)
//     res.status(500).json({
//       error: error.message || 'Failed to generate profile',
//       suggestion: 'Please check the username and try again',
//     })
//   }
// }

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
