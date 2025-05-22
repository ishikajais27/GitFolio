import { useState, useEffect } from 'react'
import { FaSearch, FaExpand, FaTimes } from 'react-icons/fa'
import '../styles/TemplatePreview.css'
import img1 from '../assets/Proffesional.png'
import img2 from '../assets/Creative.png'
import img3 from '../assets/Minimalist.png'
import img4 from '../assets/Detailed.png'

const templates = [
  {
    id: 'template1',
    name: 'Professional',
    image: img1,
    description: 'Clean and professional layout for a polished GitHub profile',
  },
  {
    id: 'template2',
    name: 'Creative',
    image: img2,
    description: 'Stand out with a unique and creative presentation style',
  },
  {
    id: 'template3',
    name: 'Minimalist',
    image: img3,
    description: 'Simple and elegant design focusing on what matters most',
  },
  {
    id: 'template4',
    name: 'Detailed',
    image: img4,
    description: 'Comprehensive layout showcasing all your achievements',
  },
]

export default function TemplatePreview() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateCards(true)
  }, [])

  const openModal = (image) => {
    setSelectedImage(image)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div className="template-preview">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="template-header">
        <h1>Template Gallery</h1>
        <div className="header-divider">
          <span className="divider-gem"></span>
        </div>
        <p>Preview our available templates before generating your README</p>
      </div>

      <div className={`template-grid ${animateCards ? 'animate-in' : ''}`}>
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="template-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-content">
              <h3>{template.name}</h3>
              <p className="template-description">{template.description}</p>

              <div className="template-image-container">
                <img
                  src={template.image || '/placeholder.svg'}
                  alt={`${template.name} template preview`}
                  className="template-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <button
                    className="preview-button"
                    onClick={() => openModal(template.image)}
                    aria-label="Preview template"
                  >
                    <FaExpand />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal for full-size image preview */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={closeModal}
              aria-label="Close preview"
            >
              <FaTimes />
            </button>
            <div className="modal-image-container">
              <img
                src={selectedImage || '/placeholder.svg'}
                alt="Full size template preview"
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
