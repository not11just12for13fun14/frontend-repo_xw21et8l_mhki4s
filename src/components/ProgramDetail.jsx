import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function ProgramDetail(){
  const { programId } = useParams()
  const coachId = auth.getCoachId()
  const [data, setData] = useState({ program: null, sessions: [] })
  const [title, setTitle] = useState('')

  const load = async () => {
    const res = await api.get(`/programs/${programId}`)
    setData(res)
  }
  useEffect(()=>{ load() }, [programId])

  const addSession = async () => {
    if(!title) return
    await api.post(`/programs/${programId}/sessions`, { title }, { coach_id: coachId })
    setTitle(''); load()
  }

  return (
    <Layout>
      {data.program && (
        <div className="mb-4">
          <div className="text-2xl font-bold">{data.program.title}</div>
          <div className="text-slate-400">{data.program.description}</div>
        </div>
      )}

      <div className="flex items-end gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">New Session Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2" placeholder="Day 1 – Push" />
        </div>
        <button onClick={addSession} className="px-3 py-2 bg-blue-600 rounded-lg">Add Session</button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl divide-y divide-slate-800">
        {data.sessions?.length ? data.sessions.map(s => (
          <div key={s._id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-slate-400">Session</div>
            </div>
            <a href={`/sessions/${s._id}`} className="px-3 py-2 bg-slate-800 rounded-lg">Open</a>
          </div>
        )) : <div className="p-4 text-slate-400">No sessions yet</div>}
      </div>
    </Layout>
  )
}
