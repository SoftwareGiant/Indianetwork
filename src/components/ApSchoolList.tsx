import { useState } from 'react'
import { apCycloneSchools } from '../data/apCycloneSchools'

export const apSchoolCount = apCycloneSchools.reduce((n, g) => n + g.schools.length, 0)

export default function ApSchoolList({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden" style={{ border: '1px solid rgba(13,43,69,0.06)' }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-800" style={{ color: '#0D2B45', fontFamily: 'Manrope, sans-serif' }}>List of schools that received help ({apSchoolCount})</span>
        <span className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white transition-transform" style={{ background: '#F47C20', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-6">
          {apCycloneSchools.map(g => (
            <div key={g.area}>
              <h4 className="font-700 text-sm mb-2" style={{ color: '#F47C20' }}>{g.area} ({g.schools.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                      <th className="py-2 pr-4 font-700">School</th>
                      <th className="py-2 pr-4 font-700 text-right">Students</th>
                      <th className="py-2 font-700 text-right">Teachers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.schools.map(s => (
                      <tr key={s.name} style={{ borderTop: '1px solid rgba(13,43,69,0.06)' }}>
                        <td className="py-2 pr-4" style={{ color: '#0D2B45' }}>{s.name}</td>
                        <td className="py-2 pr-4 text-right text-gray-500">{s.students ?? '—'}</td>
                        <td className="py-2 text-right text-gray-500">{s.teachers ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400">Source: India Network Foundation, "Andhra Pradesh Cyclone Relief Efforts — List of Schools Received Help". Schools listed twice in the original have been shown once.</p>
        </div>
      )}
    </div>
  )
}
