import { useState } from 'react'
import './MusicPlayer.css'

const AUDIO_URL = 'https://res.cloudinary.com/dafbe77t/video/upload/v1793197394/Project-Pop-SnapYT.App.mp3'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [audio] = useState(() => new Audio(AUDIO_URL))

  const toggle = () => {
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(o => !o)
  }

  return (
    <div className="music-player">
      <button className="music-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}
