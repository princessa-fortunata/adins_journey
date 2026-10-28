import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import MusicPlayer from './components/MusicPlayer'
import EnvelopePage from './pages/EnvelopePage'

function Layout() {
  const location = useLocation()
  const isEnvelope = location.pathname === '/'
  return (
    <>
      {!isEnvelope && <Navbar />}
      <Routes>
        <Route path="/" element={<EnvelopePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isEnvelope && <MusicPlayer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </AuthProvider>
  )
}
