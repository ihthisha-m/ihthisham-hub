import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a
            href="https://github.com/ihthisham"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            id="footer-github"
          >
            <Github size={15} />
            GitHub
          </a>
          <span className="footer-divider">•</span>
          <a
            href="https://linkedin.com/in/ihthisham"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            id="footer-linkedin"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <span className="footer-divider">•</span>
          <a
            href="mailto:ihthisham@proton.me"
            className="footer-link"
            id="footer-email"
          >
            <Mail size={15} />
            Email
          </a>
        </div>
        <p className="footer-copy">
          © {year} ihthisham — All rights reserved
        </p>
      </div>
    </footer>
  )
}
