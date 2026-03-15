export default function SkeletonLoader() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line short" />
      <div className="skeleton-line title" style={{ marginBottom: '16px' }} />
      <div className="skeleton-line long" />
      <div className="skeleton-line medium" />
      <div style={{ marginTop: '16px' }}>
        <div className="skeleton-line short" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="bento-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  )
}
