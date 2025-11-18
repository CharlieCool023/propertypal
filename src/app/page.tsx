'use client'

import { supabase } from '@/lib/supabase/client'
import { useState } from 'react'
import { ArrowRight, Home, Wallet, MessageCircle, Shield, Zap, Users, Building2, QrCode, CreditCard } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleGetStarted = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    })

    if (!error) setSent(true)
    setLoading(false)
  }

  return (
    <>
      {/* HERO SECTION */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              Property<span className="text-emerald-400">PAL</span>
            </h1>
            <p className="text-2xl md:text-4xl font-light mb-8 text-teal-100">
              Nigeria’s #1 Property Super App
            </p>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-teal-200 leading-relaxed">
              Pay rent with your personal NUBAN • Scan QR to move in • Chat with landlord • Book shortlets • Buy your dream home — all in one beautiful app.
            </p>

            <form onSubmit={handleGetStarted} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-8 py-5 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white placeholder-teal-200 focus:outline-none focus:ring-4 focus:ring-emerald-400 text-lg"
              />
              <button
                type="submit"
                disabled={loading || sent}
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition flex items-center gap-3 shadow-2xl"
              >
                {sent ? 'Check Your Email ✨' : 'Get Started Free'}
                {!sent && <ArrowRight className="w-6 h-6" />}
              </button>
            </form>
          </div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 220" className="w-full">
            <path fill="#f8fafc" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Why PropertyPAL is Different</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: QrCode, title: "Move In With QR Code", desc: "Scan a code or enter Property Code — linked to your unit in 3 seconds" },
              { icon: Wallet, title: "Your Own NUBAN Wallet", desc: "Every user gets a personal bank account number. No more 'pay to company account'" },
              { icon: MessageCircle, title: "In-Building Chat & Broadcasts", desc: "Talk to landlord, neighbors, or receive estate notices instantly" },
              { icon: CreditCard, title: "Pay Rent in Installments", desc: "Landlord-approved 'Pay-Small-Small' plans with zero hassle" },
              { icon: Shield, title: "Security Deposit Vault", desc: "We hold your deposit safely until move-out inspection" },
              { icon: Home, title: "Short-Stay Bookings", desc: "Book apartments daily/weekly — better than Airbnb" }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">
                <f.icon className="w-16 h-16 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-4xl font-black text-white mb-4">Property<span className="text-emerald-400">PAL</span></h2>
              <p className="mb-6">The future of property in Nigeria. Built for tenants, landlords, agents, and investors.</p>
              <p className="text-sm">© 2025 PropertyPAL Technologies Ltd. All rights reserved.<br />RC •••••••• | Lagos, Nigeria</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-4 transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">CBN Licensed Partner</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>Made with ❤️ by you & Grok in Nigeria • Becoming Africa’s biggest proptech company</p>
          </div>
        </div>
      </footer>
    </>
  )
}