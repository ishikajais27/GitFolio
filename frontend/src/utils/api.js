export const fetchGitHubProfile = async (username) => {
  try {
    const response = await fetch('http://localhost:5173/api/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })

    const text = await response.text()
    console.log('Raw response:', text) // Debug log

    if (!response.ok) {
      // Handle HTML errors
      if (text.startsWith('<!DOCTYPE')) {
        throw new Error('Server returned HTML error page')
      }
      const errorData = JSON.parse(text)
      throw new Error(errorData.error || 'Request failed')
    }

    return JSON.parse(text)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
