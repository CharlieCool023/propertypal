'use client'

import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const roles = [
  { id: 'tenant', title: 'Tenant', icon: '🏠', color: 'from-emerald-500 to-teal-600' },
  { id: 'landlord', title: 'Landlord / Owner', icon: '🏰', color: 'from-cyan-500 to-blue-600' },
  { id: 'agent', title: 'Agent / Realtor', icon: '🤝', color: 'from-purple-500 to-pink-600' },
  { id: 'buyer', title: 'Buyer / Investor', icon: '💰', color: 'from-orange-500 to-red-600' },
]

export default function ChooseRole() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const selectRole = async (role: string) => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    // Create or update profile
    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        user_id: user?.id,
        role: role,
        updated_at: new Date().toISOString()
      })

    if (!error) {
      router.push('/home')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-6xl font-bold text-white mb-4">Welcome to PropertyPAL!</h1>
        <p className="text-2xl text-teal-100 mb-12">Tell us who you are to get started</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => selectRole(r.id)}
              disabled={loading}
              className={`group relative bg-white/10 backdrop-blur-xl rounded-24 rounded-3xl p-12 border border-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-500 shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-20 rounded-3xl transition`}></div>
              <div className="relative z-10">
                <div className="text-8xl mb-6">{r.icon}</div>
                <h3 className="text-2xl font-bold text-white">{r.title}</h3>
              </div>
              <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-white/30 transition"></div>
            </button>
          ))}
        </div>

        <p className="text-teal-200 mt-12 text-lg">
          Built with ❤️ by you & Grok — 2025
        </p>
      </div>
    </div>
  )
}