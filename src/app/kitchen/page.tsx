import Link from 'next/link'

export default function Kitchen() {
  return (
    <div className="kitchen">
      <div className="glow-background"></div>
      <div className="kitchen-container">
        <Link href="/cupboard" className="kitchen-button left">
          <div className="emoji-group">
            <span>🥃</span><span>🍴</span><span>☕</span>
          </div>
          <div className="label">Cupboard</div>
        </Link>

        <Link href="/recipe" className="kitchen-button right">
          <div className="label">Recipe Box</div>
          <div className="emoji-group">🗃️</div>
        </Link>
      </div>
    </div>
  )
}