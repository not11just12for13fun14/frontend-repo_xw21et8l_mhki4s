import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function SessionDetail(){
  const { sessionId } = useParams()
  const coachId = auth.getCoachId()
  const [data, setData] = useState({ session: null, exercises: [] })
  const [form, setForm] = useState({ name: '', sets: 3, reps: 10, rest_time: '60s', notes: '', video_url: '' })

  const load = async () => {
    const res = await api.get(`/sessions/${sessionId}`)
    setData(res)
  }
  useEffect(()=>{ load() }, [sessionId])

  const addExercise = async () => {
    if(!form.name) return
    await api.post(`/sessions/${sessionId}/exercises`, form, { coach_id: coachId })
    setForm({ name: '', sets: 3, reps: 10, rest_time: '60s', notes: '', video_url: '' })
    load()
  }

  return (
    <Layout>
      {data.session && <div className="text-2xl font-bold mb-4">{data.session.title}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="font-semibold mb-2">Add Exercise</div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Exercise name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <input type="number" placeholder="Sets" value={form.sets} onChange={e=>setForm({...form, sets:Number(e.target.value)})} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <input type="number" placeholder="Reps" value={form.reps} onChange={e=>setForm({...form, reps:Number(e.target.value)})} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <input placeholder="Rest time" value={form.rest_time} onChange={e=>setForm({...form, rest_time:e.target.value})} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <input placeholder="Video link (YouTube)" value={form.video_url} onChange={e=>setForm({...form, video_url:e.target.value})} className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} rows={3} className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" />
            <button onClick={addExercise} className="col-span-2 px-3 py-2 bg-blue-600 rounded-lg">Save</button>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="font-semibold mb-2">Exercises</div>
          <div className="divide-y divide-slate-800">
            {data.exercises?.length ? data.exercises.map(e => (
              <div key={e._id} className="py-3">
                <div className="font-medium">{e.name} <span className="text-xs text-slate-400">• {e.sets}x{e.reps} • Rest {e.rest_time}</span></div>
                {e.notes && <div className="text-sm text-slate-300">{e.notes}</div>}
              </div>
            )) : <div className="text-slate-400">No exercises yet</div>}
          </div>
        </div>
      </div>
    </Layout>
  )
}
