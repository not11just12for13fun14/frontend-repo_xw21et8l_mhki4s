import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Clients from './components/Clients'
import Programs from './components/Programs'
import ProgramDetail from './components/ProgramDetail'
import SessionDetail from './components/SessionDetail'
import ClientProfile from './components/ClientProfile'
import Settings from './components/Settings'
import { auth } from './lib/api'

function RequireAuth({ children }){
  const coachId = auth.getCoachId()
  if(!coachId) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/clients" element={<RequireAuth><Clients /></RequireAuth>} />
      <Route path="/clients/:clientId" element={<RequireAuth><ClientProfile /></RequireAuth>} />
      <Route path="/programs" element={<RequireAuth><Programs /></RequireAuth>} />
      <Route path="/programs/:programId" element={<RequireAuth><ProgramDetail /></RequireAuth>} />
      <Route path="/sessions/:sessionId" element={<RequireAuth><SessionDetail /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
    </Routes>
  )
}
