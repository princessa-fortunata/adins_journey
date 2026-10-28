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

// Group by year, sort each group by doc ID (time-ordered)
const byYear = {}
for (const p of photos) {
  if (!byYear[p.year]) byYear[p.year] = []
  byYear[p.year].push(p)
}

let count = 0
for (const year of Object.keys(byYear).sort()) {
  const group = byYear[year].sort((a, b) => a.id.localeCompare(b.id))
  for (let i = 0; i < group.length; i++) {
    const p = group[i]
    if (!p.uploadedAt) {
      // assign timestamp: year Jan 1 + index in seconds
      const base = new Date(`${year}-01-01`).getTime()
      await updateDoc(doc(db, 'photos', p.id), { uploadedAt: base + i * 1000 })
      count++
      console.log(`Updated: [${year}] ${p.title || p.id}`)
    }
  }
}

console.log(`\nDone! ${count} photos updated.`)
process.exit(0)
