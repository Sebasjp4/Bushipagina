import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registro() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    conf_password: '',
    fecha_nacimiento: '',
    grado_cinturon: 'Blanco',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.conf_password) {
      alert('¡Atención! Las contraseñas no coinciden.')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/atletas/nuevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert('Atleta registrado con éxito')
        navigate('/login')
      } else {
        alert('Error al registrar atleta')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al registrar atleta')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-red-500 uppercase tracking-widest italic">
          Nuevo Karateka
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña segura"
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 ml-1 italic">Fecha de Nacimiento</label>
            <input
              type="date"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-500 outline-none"
              onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
              required
            />
          </div>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) => setFormData({ ...formData, conf_password: e.target.value })}
            required
          />
          <select
            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white cursor-pointer"
            onChange={(e) => setFormData({ ...formData, grado_cinturon: e.target.value })}
          >
            <option value="Blanco">Cinturón Blanco</option>
            <option value="Amarillo">Cinturón Amarillo</option>
            <option value="Naranja">Cinturón Naranja</option>
            <option value="Azul">Cinturón Azul</option>
            <option value="Verde">Cinturón Verde</option>
            <option value="morado">Cinturón morado</option>
            <option value="Marrón I">Cinturón Marrón I</option>
            <option value="Marrón II">Cinturón Marrón II</option>
            <option value="Marrón III">Cinturón Marrón III</option>
            <option value="Negro">Cinturón Negro</option>
          </select>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-lg mt-2 transition-all transform active:scale-95"
          >
            REGISTRAR EN EL SISTEMA
          </button>
        </form>
      </div>
    </main>
  )
}
