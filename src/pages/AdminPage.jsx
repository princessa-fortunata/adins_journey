import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePhotos } from '../context/usePhotos'
import './AdminPage.css'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 2023 }, (_, i) => 2024 + i)

export default function AdminPage() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const { addPhoto, editPhoto, deletePhoto, getByYear, loading } = usePhotos()

  const [activeYear, setActiveYear] = useState(CURRENT_YEAR)
  const [form, setForm] = useState({ title: '', location: '', description: '', year: CURRENT_YEAR })
  const [preview, setPreview] = useState(null)
  const [fileData, setFileData] = useState(null)
  const [success, setSuccess] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [editForm, setEditForm] = useState({})

  if (!isAdmin) { navigate('/login'); return null }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX = 1200
        let { width, height } = img
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round(height * MAX / width); width = MAX }
          else { width = Math.round(width * MAX / height); height = MAX }
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.75)
        setPreview(dataUrl)
        setFileData(dataUrl)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileData) return
    try {
      await addPhoto({ ...form, year: Number(form.year), src: fileData })
      setForm({ title: '', location: '', description: '', year: CURRENT_YEAR })
      setPreview(null)
      setFileData(null)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      alert('Upload gagal: ' + err.message)
    }
  }

  const handleEdit = (photo) => {
    setEditingPhoto(photo)
    setEditForm({ title: photo.title, location: photo.location, description: photo.description || '', year: photo.year })
  }

  const handleEditSave = () => {
    editPhoto(editingPhoto.id, { ...editForm, year: Number(editForm.year) })
    setEditingPhoto(null)
  }

  const yearPhotos = getByYear(activeYear)

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage Cessa Journey in AdIns</p>
      </div>

      <div className="admin-layout">
        <div className="upload-section">
          <h2>Upload Photo</h2>
          <form onSubmit={handleSubmit}>
            <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
              {preview ? <img src={preview} alt="preview" className="upload-preview" /> : (
                <div className="upload-placeholder"><span>+</span><p>Click to select photo</p></div>
              )}
              <input id="fileInput" type="file" accept="image/*,.jfif,.jpe" onChange={handleFile} hidden />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Photo title" required />
              </div>
              <div className="form-group">
                <label>Year</label>
                <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Jakarta, Indonesia" required />
            </div>

            <div className="form-group">
              <label>Description <span>(optional)</span></label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="A short story about this moment..." rows={3} />
            </div>

            {success && <p className="success-msg">✦ Photo uploaded successfully</p>}
            <button type="submit" className="btn-upload" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>

        <div className="manage-section">
          <h2>Manage Photos</h2>
          <div className="year-tabs">
            {YEARS.map(y => (
              <button key={y} className={activeYear === y ? 'active' : ''} onClick={() => setActiveYear(y)}>{y}</button>
            ))}
          </div>
          <p className="photo-count">{yearPhotos.length} photo{yearPhotos.length !== 1 ? 's' : ''} in {activeYear}</p>
          {yearPhotos.length === 0 ? (
            <div className="admin-empty"><span>✦</span><p>No photos for {activeYear} yet</p></div>
          ) : (
            <div className="admin-grid">
              {yearPhotos.map(photo => (
                <div key={photo.id} className="admin-card">
                  <img src={photo.src} alt={photo.title} />
                  <div className="admin-card-info">
                    <p className="admin-card-title">{photo.title}</p>
                    <p className="admin-card-loc">{photo.location}</p>
                  </div>
                  <div className="admin-card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(photo)}>✎</button>
                    <button className="btn-delete" onClick={() => deletePhoto(photo.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editingPhoto && (
        <div className="modal-overlay" onClick={() => setEditingPhoto(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Photo</h3>
              <button className="modal-close" onClick={() => setEditingPhoto(null)}>✕</button>
            </div>
            <img src={editingPhoto.src} alt={editingPhoto.title} className="modal-img" />
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Year</label>
                <select value={editForm.year} onChange={e => setEditForm({ ...editForm, year: e.target.value })}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3} />
            </div>
            <button className="btn-upload" onClick={handleEditSave}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  )
}
