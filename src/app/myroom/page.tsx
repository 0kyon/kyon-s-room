import Link from 'next/link'

export default function MyRoom() {
  return (
    <div className="myroom">
      <div className="glow-background"></div>
      <div className="myroom-container">
        <Link href="/diary" className="myroom-button left">
          <span className="emoji">📓</span>
          <span>Diary</span>
        </Link>

        <Link href="/murmur" className="myroom-button right">
          <span>murmur</span>
          <span className="emoji">💭</span>
        </Link>
      </div>
    </div>
  )
}