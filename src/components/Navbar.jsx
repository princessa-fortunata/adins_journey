import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <a href="https://princessa-fortunata.github.io/adins_journey/#/" className="navbar-brand">
        <span className="brand-icon">✦</span>
        <span>New chapter unlocked!</span>
      </a>
      <button className="navbar-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`navbar-links${open ? ' open' : ''}`}>
        <a href="https://princessa-fortunata.github.io/adins_journey/#/" onClick={() => setOpen(false)}>Gallery</a>
        {isAdmin && (
          <>
            <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
