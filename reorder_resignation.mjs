import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWXpU9voEj749adBDgZXK9L1R0PIN50a4",
  authDomain: "cessajourney.firebaseapp.com",
  projectId: "cessajourney",
  storageBucket: "cessajourney.firebasestorage.app",
  messagingSenderId: "893752559477",
  appId: "1:893752559477:web:c475445c2289384b00b53c"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const snap = await getDocs(collection(db, 'photos'))
const photos = snap.docs.map(d => ({ id: d.id, ...d.data() }))

// Cari uploadedAt terbesar di tahun 2026
const year2026 = photos.filter(p => p.year === 2026)
const maxTs = Math.max(...year2026.map(p => p.uploadedAt ?? 0))

// Set semua Resignation Cessa ke maxTs + index
const resignations = year2026
  .filter(p => p.title?.toLowerCase().includes('resignation'))
  .sort((a, b) => a.id.localeCompare(b.id))

let i = 1
for (const p of resignations) {
  await updateDoc(doc(db, 'photos', p.id), { uploadedAt: maxTs + i * 1000 })
  console.log(`Updated: ${p.title} (${p.id})`)
  i++
}

console.log(`\nDone! ${resignations.length} Resignation Cessa photos moved to bottom.`)
process.exit(0)
