import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWXpU9voEj749adBDgZXK9L1R0PIN50a4",
  authDomain: "cessajourney.firebaseapp.com",
  projectId: "cessajourney",
  storageBucket: "cessajourney.firebasestorage.app",
  messagingSenderId: "893752559477",
  appId: "1:893752559477:web:c475445c2289384b00b53c"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
