import { useEffect, useState } from 'react'
import Layout from './Layout'
import { api, auth } from '../lib/api'

export default function Dashboard() {
  const coachId = auth.getCoachId()
  const [summary, setSummary] = useState({ total_clients: 0, recent_activity: [] })

  useEffect(() => { fetchSummary() }, [])

  const fetchSummary = async () => {
    try {
      const data = await api.get('/dashboard/summary', { coach_id: coachId })
      setSummary(data)
    } catch (e) { /* ignore for MVP */ }
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Total Clients</div>
          <div className="text-3xl font-bold">{summary.total_clients}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Quick Actions</div>
          <div className="flex gap-2 mt-2">
            <a href="/clients" className="px-3 py-2 bg-blue-600 rounded-lg">Add Client</a>
            <a href="/programs" className="px-3 py-2 bg-slate-700 rounded-lg">Create Program</a>
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-sm">Backend</div>
          <div className="text-sm">{api.base}</div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div className="font-semibold mb-2">Recent Activity</div>
        <ul className="space-y-2">
          {summary.recent_activity?.length ? summary.recent_activity.map((a) => (
            <li key={a._id} className="text-sm text-slate-300">{a.message}</li>
          )) : <li className="text-sm text-slate-400">No activity yet.</li>}
        </ul>
      </div>
    </Layout>
  )
}
