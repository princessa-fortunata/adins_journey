import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EnvelopePage.css'

const AUDIO_URL = 'https://res.cloudinary.com/dafbe77t/video/upload/v1793197394/Project-Pop-SnapYT.App.mp3'

// Reff "Kamu sangat berarti istimewa di hati" ~57s
const REFF_START = 57

export default function EnvelopePage() {
  const [opened, setOpened] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    if (opened) return
    setOpened(true)

    const audio = new Audio(AUDIO_URL)
    audio.currentTime = REFF_START
    audio.play().catch(() => {})

    setTimeout(() => navigate('/gallery'), 1800)
  }

  return (
    <div className="envelope-bg">
      <p className="envelope-hint">{opened ? '✉️ Membuka kenangan...' : 'Special Memories for You'}</p>
      <div className={`envelope ${opened ? 'open' : ''}`} onClick={handleOpen}>
        <div className="envelope-flap" />
        <div className="envelope-body">
          <div className="envelope-letter">
            <span>💌</span>
            <p>Cessa Memories</p>
          </div>
        </div>
      </div>
    </div>
  )
}
