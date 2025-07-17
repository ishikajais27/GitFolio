const API_BASE = import.meta.env.VITE_API_BASE

export const fetchGitHubProfile = async (
  username,
  template,
  socialLinks = {}
) => {
  try {
    const response = await fetch(`${API_BASE}/api/github`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, template, socialLinks }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error ||
          errorData.message ||
          `Request failed with status ${response.status}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(
      error.message || 'Failed to fetch GitHub profile. Please try again.'
    )
  }
}

export const downloadReadme = async (markdown) => {
  try {
    const response = await fetch(`${API_BASE}/api/github/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate download')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download Error:', error)
    throw error
  }
}
