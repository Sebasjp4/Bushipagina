import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Perfil() {
  const navigate = useNavigate()
  const [atleta, setAtleta] = useState<any>(null)
  const [listaAtletas, setListaAtletas] = useState<any[]>([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        const resPerfil = await fetch('http://127.0.0.1:8000/atletas/me', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!resPerfil.ok) throw new Error('Sesión inválida')
        const datosPerfil = await resPerfil.json()
        setAtleta(datosPerfil)

        if (datosPerfil.es_entrenador) {
          const resTodos = await fetch('http://127.0.0.1:8000/atletas/todos', {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (resTodos.ok) {
            setListaAtletas(await resTodos.json())
          }
        }
      } catch (err: any) {
        setError(err.message)
        localStorage.removeItem('token')
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  const subirPuntos = async (id: number, puntosActuales: number) => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`http://127.0.0.1:8000/atletas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ puntos_ranking: puntosActuales + 10 }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        const errData = await res.json()
        alert(errData.detail || 'Error al actualizar puntos')
      }
    } catch (err) {
      console.error('Error al actualizar', err)
    }
  }

  const expulsarAtleta = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas expulsar a ${nombre} del dojo?`)) return

    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`http://127.0.0.1:8000/atletas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        window.location.reload()
      } else {
        const errData = await res.json()
        alert(errData.detail || 'Error al expulsar atleta')
      }
    } catch (err) {
      console.error('Error al expulsar', err)
    }
  }

  if (cargando) return <div className="text-white text-center mt-20">Cargando el Tatami...</div>
  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        {error} <br />
        <Link to="/login">Volver</Link>
      </div>
    )

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-slate-900 border-t-4 border-t-red-600 rounded-xl shadow-2xl mb-10">
      <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-1">
            ¡OSS, {atleta?.nombre}!{' '}
            {atleta?.es_entrenador && (
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded ml-2 align-middle">SENSEI</span>
            )}
          </h1>
          <p className="text-slate-400">{atleta?.email}</p>
        </div>
        <button
          onClick={cerrarSesion}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm py-2 px-4 rounded transition-colors"
        >
          Salir del Dojo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Grado Actual</p>
          <p className="text-2xl font-bold text-white">Cinturón {atleta?.grado_cinturon}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Puntos de Ranking</p>
          <p className="text-2xl font-bold text-red-500">{atleta?.puntos_ranking} pts</p>
        </div>
      </div>

      {atleta?.es_entrenador && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            Panel de Control del Dojo
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-6 py-4">Atleta</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Cinturón</th>
                  <th className="px-6 py-4">Puntos</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaAtletas.map((a) => (
                  <tr key={a.id} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {a.nombre} {a.id === atleta.id && '(Tú)'}
                    </td>
                    <td className="px-6 py-4">{a.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-700 px-2 py-1 rounded text-xs">{a.grado_cinturon}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-red-400">
                      {a.puntos_ranking}
                      <button
                        onClick={() => subirPuntos(a.id, a.puntos_ranking)}
                        className="ml-3 text-xs bg-green-500/80 hover:bg-green-500 text-white px-2 py-1 rounded transition-colors"
                        title="Sumar 10 puntos"
                      >
                        +10
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {a.id !== atleta.id && (
                        <button
                          onClick={() => expulsarAtleta(a.id, a.nombre)}
                          className="text-xs bg-red-900/60 hover:bg-red-600 text-white px-3 py-1 rounded border border-red-700 transition-colors"
                        >
                          Expulsar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
