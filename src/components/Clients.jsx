import { useEffect, useState } from 'react'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function Clients() {
  const coachId = auth.getCoachId()
  const [q, setQ] = useState('')
  const [clients, setClients] = useState([])
  const [showInvite, setShowInvite] = useState(false)

  const fetchClients = async () => {
    const data = await api.get('/clients', { coach_id: coachId, q })
    setClients(data)
  }
  useEffect(() => { fetchClients() }, [])

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search clients" className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2"/>
          <button onClick={fetchClients} className="px-3 py-2 bg-slate-800 rounded-lg">Search</button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setShowInvite(true)} className="px-3 py-2 bg-blue-600 rounded-lg">Invite Client</button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl divide-y divide-slate-800">
        {clients.length ? clients.map((c)=> (
          <div key={c._id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-slate-400">{c.status} • {c.last_activity || 'No recent activity'}</div>
            </div>
            <a href={`/clients/${c._id}`} className="px-3 py-2 bg-slate-800 rounded-lg">View Profile</a>
          </div>
        )) : <div className="p-4 text-slate-400">No clients yet</div>}
      </div>

      {showInvite && <InviteModal onClose={()=>setShowInvite(false)} onSent={fetchClients} />}
    </Layout>
  )
}

function InviteModal({ onClose, onSent }){
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const coachId = auth.getCoachId()

  const send = async () => {
    try {
      await api.post('/invites', { email, message }, { coach_id: coachId })
      setStatus('Invite sent successfully.')
      setTimeout(()=>{ setStatus(''); onClose(); onSent(); }, 1000)
    } catch (e) { setStatus('Failed to send invite') }
  }

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-4">
        <div className="font-semibold mb-2">Invite Client</div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" placeholder="client@email.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message (optional)</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" rows={3} />
          </div>
          {status && <div className="text-green-400 text-sm">{status}</div>}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-2 bg-slate-800 rounded-lg">Cancel</button>
            <button onClick={send} className="px-3 py-2 bg-blue-600 rounded-lg">Send Invite</button>
          </div>
        </div>
      </div>
    </div>
  )
}
