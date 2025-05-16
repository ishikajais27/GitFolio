// backend/utils/socialUtils.cjs
const socialIcons = {
  linkedin:
    'https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white',
  twitter:
    'https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=Twitter&logoColor=white',
  instagram:
    'https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white',
  youtube:
    'https://img.shields.io/badge/-YouTube-FF0000?style=flat-square&logo=YouTube&logoColor=white',
  leetcode:
    'https://img.shields.io/badge/-LeetCode-FFA116?style=flat-square&logo=LeetCode&logoColor=black',
  hackerrank:
    'https://img.shields.io/badge/-HackerRank-2EC866?style=flat-square&logo=HackerRank&logoColor=white',
  email:
    'https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=Gmail&logoColor=white',
  website:
    'https://img.shields.io/badge/-Website-4285F4?style=flat-square&logo=Google-Chrome&logoColor=white',
}

exports.formatSocialUrl = (platform, url) => {
  if (!url) return ''

  const lowerUrl = url.toLowerCase()

  if (platform === 'linkedin' && !lowerUrl.includes('linkedin.com')) {
    return `https://www.linkedin.com/in/${url}`
  }
  if (platform === 'twitter' && !lowerUrl.includes('twitter.com')) {
    return `https://twitter.com/${url}`
  }
  if (platform === 'instagram' && !lowerUrl.includes('instagram.com')) {
    return `https://instagram.com/${url}`
  }
  if (platform === 'email' && !lowerUrl.includes('mailto:')) {
    return `mailto:${url}`
  }
  if (platform === 'website' && !lowerUrl.startsWith('http')) {
    return `https://${url}`
  }

  return url
}

exports.getSocialIcon = (platform) => {
  return socialIcons[platform] || ''
}
