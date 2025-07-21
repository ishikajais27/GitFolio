import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import GeneratorPage from './pages/GeneratorPage'
import TemplatePreview from './pages/TemplatePreview'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<GeneratorPage />} />
          <Route path="/templates" element={<TemplatePreview />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
