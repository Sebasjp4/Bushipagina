import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    try {
      const response = await fetch('http://127.0.0.1:8000/atletas/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Error al iniciar sesión')
      }

      localStorage.setItem('token', data.access_token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className="pt-10">
      <div className="max-w-md mx-auto mt-20 p-8 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-red-900/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Bushikai Dojo</h2>
          <p className="text-slate-400 text-sm">Ingresa a tu perfil de atleta</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 ml-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 ml-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-red-600/30"
          >
            Entrar al Tatami
          </button>
        </form>
      </div>
    </main>
  )
}
