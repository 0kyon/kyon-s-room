import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="container">
        <Link href="/myroom" className="door-button">
          <div className="label">My Room</div>
          <div className="emoji">🤐</div>
        </Link>

        <Link href="/livingroom" className="door-button center">
          <div className="label">Living Room</div>
          <div className="emoji">🗣️</div>
        </Link>

        <Link href="/kitchen" className="door-button">
          <div className="label">Kitchen</div>
          <div className="emoji">🍲</div>
        </Link>
      </div>
      <div className="welcome">Welcome!</div>
    </div>
  )
}