import type { Metadata } from 'next'
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Offensive security researcher, OSCP aspirant, and bug bounty hunter. Based in the internet.',
}

const socialLinks = [
  {
    id: 'about-github',
    href: 'https://github.com/ihthisham',
    icon: Github,
    label: 'GitHub',
    sub: '@ihthisham',
  },
  {
    id: 'about-linkedin',
    href: 'https://linkedin.com/in/ihthisham',
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect',
  },
  {
    id: 'about-email',
    href: 'mailto:ihthisham@proton.me',
    icon: Mail,
    label: 'Email',
    sub: 'ProtonMail',
  },
  {
    id: 'about-twitter',
    href: 'https://twitter.com/ihthisham',
    icon: Twitter,
    label: 'Twitter/X',
    sub: '@ihthisham',
  },
]

export default function AboutPage() {
  return (
    <div className="about-container">
      {/* Terminal-style header */}
      <div
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.75rem',
          color: '#4A4A4A',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: '#FF0000' }}>→</span>
        <span>whoami</span>
      </div>

      {/* Name */}
      <h1 className="about-name">ihthisham</h1>
      <p className="about-title">
        Offensive Security Researcher • OSCP Aspirant • Bug Bounty Hunter
      </p>

      {/* Bio */}
      <div className="about-bio">
        <p>
          I&apos;m a self-taught security researcher focused on{' '}
          <strong>penetration testing</strong> and{' '}
          <strong>vulnerability research</strong>. Currently preparing for the{' '}
          <strong>OSCP certification</strong> while documenting everything I learn
          through writeups and tutorials.
        </p>
        <br />
        <p>
          This hub is where I publish CTF walkthroughs, security tool deep-dives,
          and OSCP prep notes. The goal:{' '}
          <strong>learn by teaching</strong>.
        </p>
        <br />
        <p>
          When I&apos;m not breaking things, I&apos;m building tools, participating in bug
          bounty programs, and contributing to the infosec community.
        </p>
      </div>

      {/* Currently */}
      <div
        style={{
          background: 'rgba(255,0,0,0.04)',
          border: '1px solid rgba(255,0,0,0.15)',
          borderRadius: '8px',
          padding: '16px 20px',
          marginBottom: '40px',
          fontFamily: 'Space Mono, monospace',
        }}
      >
        <p style={{ fontSize: '0.65rem', color: '#FF0000', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Currently
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            '📚 Studying for OSCP (PWK labs)',
            '🔍 Active on HackTheBox & TryHackMe',
            '✍️ Writing security research articles',
            '🐛 Bug bounty hunting on HackerOne',
          ].map((item) => (
            <li key={item} style={{ fontSize: '0.85rem', color: '#808080' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <h2
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          color: '#4A4A4A',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        Connect
      </h2>
      <div className="social-links">
        {socialLinks.map(({ id, href, icon: Icon, label, sub }) => (
          <a
            key={id}
            id={id}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="social-link"
          >
            <Icon size={18} />
            <div>
              <p style={{ color: '#FFFFFF', fontSize: '0.875rem', lineHeight: 1.2 }}>
                {label}
              </p>
              <p style={{ fontSize: '0.72rem', color: '#4A4A4A', marginTop: '2px' }}>
                {sub}
              </p>
            </div>
            <ExternalLink
              size={12}
              style={{ marginLeft: 'auto', color: '#2F2F2F' }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
