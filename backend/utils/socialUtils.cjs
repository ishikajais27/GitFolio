const socialIcons = {
  github: 'https://cdn-icons-png.flaticon.com/512/733/733553.png',
  linkedin: 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png',
  twitter: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
  instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
  youtube: 'https://cdn-icons-png.flaticon.com/512/733/733646.png',
  leetcode:
    'https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png',
  hackerrank:
    'https://cdn.iconscout.com/icon/free/png-256/free-hackerrank-3628233-3031065.png',
  email: 'https://cdn-icons-png.flaticon.com/512/561/561127.png',
  website: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
}

const formatSocialUrl = (platform, value) => {
  if (!value) return ''

  if (value.startsWith('http')) return value

  switch (platform) {
    case 'linkedin':
      return value.includes('/')
        ? `https://linkedin.com/in/${value}`
        : `https://linkedin.com/in/${value}`
    case 'twitter':
      return `https://twitter.com/${value}`
    case 'instagram':
      return `https://instagram.com/${value}`
    case 'youtube':
      return value.startsWith('UC')
        ? `https://youtube.com/channel/${value}`
        : `https://youtube.com/${value}`
    case 'email':
      return `mailto:${value}`
    default:
      return `https://${platform}.com/${value}`
  }
}

const getSocialIcon = (platform) => {
  return socialIcons[platform] || socialIcons.website
}

module.exports = {
  formatSocialUrl,
  getSocialIcon,
}
