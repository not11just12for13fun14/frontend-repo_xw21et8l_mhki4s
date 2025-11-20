import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function ClientProfile(){
  const { clientId } = useParams()
  const coachId = auth.getCoachId()
  const [client, setClient] = useState(null)
  const [note, setNote] = useState('')

  const load = async () => {
    // For MVP, fetch by listing and filter; in real app, create dedicated endpoint
    const list = await api.get('/clients', { coach_id: coachId })
    const found = list.find(c => c._id === clientId)
    setClient(found)
  }
  useEffect(()=>{ load() }, [clientId])

  const addNote = async () => {
    if(!note) return
    await api.post(`/clients/${clientId}/notes`, { client_id: clientId, content: note }, { coach_id: coachId })
    setNote('')
  }

  return (
    <Layout>
      {client ? (
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{client.name}</div>
            <div className="text-slate-400 text-sm">{client.email || 'No email'} • {client.status}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="font-semibold mb-2">Notes</div>
              <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" rows={3} placeholder="Goals, injuries, preferences..." />
              <button onClick={addNote} className="mt-2 px-3 py-2 bg-blue-600 rounded-lg">Add Note</button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="font-semibold mb-2">Assigned Programs</div>
              <div className="text-slate-400 text-sm">Coming soon</div>
            </div>
          </div>
        </div>
      ) : <div className="text-slate-400">Loading...</div>}
    </Layout>
  )
}
