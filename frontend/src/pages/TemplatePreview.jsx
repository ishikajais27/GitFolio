// src/pages/TemplatePreview.jsx
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
  },
  {
    id: 'template2',
    name: 'Creative',
    image: img2,
  },
  {
    id: 'template3',
    name: 'Minimalist',
    image: img3,
  },
  {
    id: 'template4',
    name: 'Detailed',
    image: img4,
  },
]

export default function TemplatePreview() {
  return (
    <div className="template-preview">
      <h1>Template Gallery</h1>
      <p>Preview our available templates before generating your README</p>

      <div className="template-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <h3>{template.name}</h3>
            <div className="template-image-container">
              <img
                src={template.image}
                alt={`${template.name} template preview`}
                className="template-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
