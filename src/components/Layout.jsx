import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../lib/api'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const logout = () => { auth.clear(); navigate('/') }
  const navLink = (to, label) => (
    <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-700/50'}`}>{label}</NavLink>
  )
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            broCoachme
          </Link>
          <nav className="flex items-center gap-2">
            {navLink('/dashboard', 'Dashboard')}
            {navLink('/clients', 'Clients')}
            {navLink('/programs', 'Programs')}
            {navLink('/settings', 'Settings')}
            <button onClick={logout} className="ml-2 text-slate-300 hover:text-white">Logout</button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
