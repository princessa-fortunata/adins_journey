import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const CLOUD_NAME = 'dafbe77t'
const UPLOAD_PRESET = 'ml_default'
const COL = 'photos'

export function usePhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(collection(db, COL)).then(snap => {
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [])

  const addPhoto = async (photo) => {
    const { src, ...meta } = photo
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', src)
      fd.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!data.secure_url) throw new Error(data.error?.message || 'Upload failed')
      const payload = { ...meta, src: data.secure_url, publicId: data.public_id, uploadedAt: Date.now() }
      const newDoc = await addDoc(collection(db, COL), payload)
      setPhotos(prev => [...prev, { id: newDoc.id, ...payload }])
    } finally {
      setLoading(false)
    }
  }

  const editPhoto = async (id, updates) => {
    await updateDoc(doc(db, COL, id), updates)
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePhoto = async (id) => {
    await deleteDoc(doc(db, COL, id))
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const getByYear = (year) => photos.filter(p => p.year === year)
  const years = [...new Set(photos.map(p => p.year))].sort((a, b) => b - a)

  return { photos, loading, addPhoto, editPhoto, deletePhoto, getByYear, years }
}
