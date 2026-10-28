import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EnvelopePage.css'

const AUDIO_URL = 'https://res.cloudinary.com/dafbe77t/video/upload/v1792403438/See_You_Again_-_Wiz_Khalifa_feat._Charlie_Puth_Boyce_Avenue_feat._Bea_Miller_on_Spotify_Apple.mp3'

// Reff starts around 1:05
const REFF_START = 65

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
      <p className="envelope-hint">{opened ? '✉️ Membuka kenangan...' : 'Klik amplop untuk membuka'}</p>
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
