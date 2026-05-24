import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Login'))
const Registro = lazy(() => import('./pages/Registro'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Perfil = lazy(() => import('./pages/Perfil'))

function LoadingScreen() {
  return (
    <div className="h-screen bg-[#111212] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-red-600 font-black tracking-[0.3em] uppercase animate-pulse">Bushi Kai</p>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
