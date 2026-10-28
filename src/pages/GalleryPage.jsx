import { useState } from 'react'
import { usePhotos } from '../context/usePhotos'
import './GalleryPage.css'

export default function GalleryPage() {
  const { photos, years, loading } = usePhotos()
  const [activeYear, setActiveYear] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const uniqueYears = [...new Set(years)].sort((a, b) => a - b)
  const filtered = activeYear === 'all'
    ? [...photos].sort((a, b) => a.year - b.year)
    : photos.filter(p => p.year === Number(activeYear))

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <p className="hero-sub">A collection of moments</p>
        <h1>Cessa Journey in AdIns</h1>
        <p className="hero-desc">Every journey tells a story worth remembering</p>
      </header>

      <div className="year-filter">
        <button className={activeYear === 'all' ? 'active' : ''} onClick={() => setActiveYear('all')}>All</button>
        {uniqueYears.map(y => (
          <button key={y} className={activeYear === String(y) ? 'active' : ''} onClick={() => setActiveYear(String(y))}>{y}</button>
        ))}
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state"><span>✦</span><p>No memories yet for this period</p></div>
      ) : (
        <div className="photo-grid">
          {filtered.map(photo => (
            <div key={photo.id} className="photo-card" onClick={() => setLightbox(photo)}>
              <img src={photo.src} alt={photo.title} />
              <div className="photo-overlay">
                <p className="photo-title">{photo.title}</p>
                <p className="photo-meta">{photo.location} · {photo.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="lightbox-info">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.location} · {lightbox.year}</p>
              {lightbox.description && <p className="lightbox-desc">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
