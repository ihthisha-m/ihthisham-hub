'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Override vscDarkPlus background to match our theme
const customStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#0A0A0A',
    margin: 0,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: '#0A0A0A',
  },
}

interface CodeBlockProps {
  children?: string
  language?: string
  filename?: string
  className?: string
}

export default function CodeBlock({ children, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  // Support syntax from markdown: ```python → language-python
  const lang = language ?? className?.replace('language-', '') ?? 'text'
  const code = String(children ?? '').replace(/\n$/, '')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block" id={`code-block-${lang}`}>
      <div className="code-header">
        <span className="code-filename">
          <span className="code-lang-dot" />
          {filename ?? lang}
        </span>
        <button
          className="code-copy"
          onClick={handleCopy}
          id="code-copy-btn"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} style={{ display: 'inline', marginRight: 4 }} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} style={{ display: 'inline', marginRight: 4 }} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={lang}
        style={customStyle as Record<string, React.CSSProperties>}
        showLineNumbers
        lineNumberStyle={{ color: '#2F2F2F', fontSize: '12px', userSelect: 'none' }}
        customStyle={{ margin: 0, padding: '16px', fontSize: '13px', lineHeight: '1.6' }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>

      {/* Toast */}
      {copied && (
        <div className="toast">
          <Check size={14} style={{ color: '#FF0000' }} />
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}
