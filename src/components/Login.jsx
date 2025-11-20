import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, auth } from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('coach@example.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      if (res.success && res.coach_id) {
        auth.setCoachId(res.coach_id)
        navigate('/dashboard')
      } else {
        setError(res.message || 'Login failed')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="text-2xl font-extrabold tracking-tight text-white">broCoachme</div>
          <p className="text-slate-300 text-sm">Coach Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="you@gym.com" required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-slate-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot Password?</a>
            </div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-2 rounded-lg transition-colors">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
