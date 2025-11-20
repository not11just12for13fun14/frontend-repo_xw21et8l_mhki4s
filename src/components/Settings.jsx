import Layout from './Layout'
import { auth } from '../lib/api'

export default function Settings(){
  const coachId = auth.getCoachId()
  return (
    <Layout>
      <div className="max-w-xl space-y-4">
        <div className="text-2xl font-bold">Settings</div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" placeholder="Coach Name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" placeholder="you@gym.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Change Password</label>
            <input type="password" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2" placeholder="••••••••" />
          </div>
          <button className="px-3 py-2 bg-blue-600 rounded-lg">Save</button>
        </div>
        <div className="text-sm text-slate-400">Coach ID: {coachId}</div>
      </div>
    </Layout>
  )
}
