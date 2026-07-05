import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-display text-7xl font-bold text-gold-gradient mb-4">404</p>
      <h1 className="text-2xl font-semibold mb-3">This page has gone off-grid</h1>
      <p className="text-white/50 mb-8 max-w-md">The page you\u2019re looking for doesn\u2019t exist or has been moved.</p>
      <Link to="/" className="btn-gold rounded-full px-8 py-3 font-semibold">Back to Home</Link>
    </div>
  )
}
