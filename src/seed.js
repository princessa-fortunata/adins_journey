import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'

const photos = [
  { src: 'https://res.cloudinary.com/dafbe77t/image/upload/v1791367245/c5dvazp48rbttuz9uqcf.jpg', publicId: 'c5dvazp48rbttuz9uqcf', title: 'Moment 1', location: 'AdIns', year: 2025, description: '' },
  { src: 'https://res.cloudinary.com/dafbe77t/image/upload/v1791366612/ldwxg5krsoyy1nfbhbv7.jpg', publicId: 'ldwxg5krsoyy1nfbhbv7', title: 'Moment 2', location: 'AdIns', year: 2025, description: '' },
  { src: 'https://res.cloudinary.com/dafbe77t/image/upload/v1791366428/juzkjslwsf38q60kfqql.jpg', publicId: 'juzkjslwsf38q60kfqql', title: 'Moment 3', location: 'AdIns', year: 2025, description: '' },
  { src: 'https://res.cloudinary.com/dafbe77t/image/upload/v1791366408/sb20irhot1qbpenktwmn.jpg', publicId: 'sb20irhot1qbpenktwmn', title: 'Moment 4', location: 'AdIns', year: 2025, description: '' },
  { src: 'https://res.cloudinary.com/dafbe77t/image/upload/v1791366016/Image.jpg', publicId: 'Image', title: 'Moment 5', location: 'AdIns', year: 2025, description: '' },
]

async function seed() {
  for (const photo of photos) {
    await addDoc(collection(db, 'photos'), photo)
    console.log('Added:', photo.title)
  }
  console.log('Seed done!')
}

seed()
