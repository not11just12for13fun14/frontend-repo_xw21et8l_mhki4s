import { useEffect, useState } from 'react'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function Programs(){
  const coachId = auth.getCoachId()
  const [programs, setPrograms] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const load = async () => {
    const data = await api.get('/programs', { coach_id: coachId })
    setPrograms(data)
  }
  useEffect(()=>{ load() }, [])

  const create = async () => {
    if(!title) return
    await api.post('/programs', { title, description: desc }, { coach_id: coachId })
    setTitle(''); setDesc(''); load()
  }

  return (
    <Layout>
      <div className="flex items-end gap-2 mb-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Program name</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2" placeholder="e.g., 8-Week Strength" />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Description</label>
          <input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2" placeholder="Optional" />
        </div>
        <button onClick={create} className="px-3 py-2 bg-blue-600 rounded-lg">Create Program</button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl divide-y divide-slate-800">
        {programs.length ? programs.map(p => (
          <div key={p._id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-slate-400">{p.sessions_count || 0} sessions • {new Date(p.updated_at || p.created_at).toLocaleDateString()}</div>
            </div>
            <a href={`/programs/${p._id}`} className="px-3 py-2 bg-slate-800 rounded-lg">View</a>
          </div>
        )) : <div className="p-4 text-slate-400">No programs yet</div>}
      </div>
    </Layout>
  )
}
