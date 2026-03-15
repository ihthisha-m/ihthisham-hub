interface TagProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function Tag({ children, active, onClick }: TagProps) {
  return (
    <span
      className={`tag ${active ? 'active' : ''}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      #{String(children).replace(/^#/, '')}
    </span>
  )
}
