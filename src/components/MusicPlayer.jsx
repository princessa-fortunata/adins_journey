import { useState } from 'react'
import './MusicPlayer.css'

const AUDIO_URL = 'https://res.cloudinary.com/dafbe77t/video/upload/v1792403438/See_You_Again_-_Wiz_Khalifa_feat._Charlie_Puth_Boyce_Avenue_feat._Bea_Miller_on_Spotify_Apple.mp3'

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
