import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaStar,
  FaRocket,
  FaMagic,
  FaLightbulb,
} from 'react-icons/fa'
import '../styles/AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="about-header">
        <h1>
          About <span className="highlight">Gitfolio</span>
        </h1>
        <div className="divider">
          <span className="divider-gem"></span>
        </div>
      </div>

      <div className="about-content">
        <div className="creator-card">
          <div className="card-glow"></div>
          <div className="creator-info">
            <div className="avatar-container">
              <div className="avatar-circle">
                <span>I</span>
              </div>
              <div className="avatar-shadow"></div>
            </div>

            <h2 className="animated-title">👋 Meet the Creator</h2>
            <p className="creator-intro">
              Hi! I'm <span className="highlight pulse">Ishika</span>, a KIIT
              engineering student passionate about solving real-world problems
              through code.
            </p>

            <div className="mission-section">
              <h3>
                <FaCode className="icon icon-rotate" /> Why Gitfolio?
              </h3>
              <p>
                Crafting GitHub profiles manually felt like reinventing the
                wheel, so I built Gitfolio—a full-stack tool using Node.js,
                Express, React, and MongoDB. It automates portfolio creation, so
                you can focus on what matters: building cool stuff.
              </p>
            </div>

            <div className="connect-section">
              <h3 className="connect-title">🌟 Let's Connect!</h3>
              <div className="social-links">
                <a
                  href="https://mailto:ishikajais09876@gmail.com"
                  className="social-link"
                >
                  <div className="social-icon-container">
                    <FaEnvelope className="icon" />
                  </div>
                  <span>Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/ishika-jaiswal-96b3b4284/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <div className="social-icon-container">
                    <FaLinkedin className="icon" />
                  </div>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/ishikajais27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <div className="social-icon-container">
                    <FaGithub className="icon" />
                  </div>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="project-mission">
          <h2 className="mission-title">Our Mission</h2>
          <div className="mission-underline"></div>
          <p className="mission-intro">
            To empower developers of all levels to create impressive GitHub
            profile READMEs without needing to be markdown experts. We believe
            in:
          </p>
          <ul className="mission-points">
            <li className="mission-item">
              <div className="mission-icon">
                <FaStar className="icon-mission" />
              </div>
              <div className="mission-text">
                <span className="highlight">Simplicity</span> - Easy-to-use
                interface
              </div>
            </li>
            <li className="mission-item">
              <div className="mission-icon">
                <FaRocket className="icon-mission" />
              </div>
              <div className="mission-text">
                <span className="highlight">Efficiency</span> - Save hours of
                manual work
              </div>
            </li>
            <li className="mission-item">
              <div className="mission-icon">
                <FaMagic className="icon-mission" />
              </div>
              <div className="mission-text">
                <span className="highlight">Creativity</span> - Beautiful
                templates to choose from
              </div>
            </li>
            <li className="mission-item">
              <div className="mission-icon">
                <FaLightbulb className="icon-mission" />
              </div>
              <div className="mission-text">
                <span className="highlight">Growth</span> - Help developers
                showcase their best work
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
