import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hexagon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const authSession = localStorage.getItem('skylinks_terminal_session');
    // Reduced timer for better DX and perceived performance
    const timer = setTimeout(() => {
      if (authSession) {
        navigate('/overview');
      } else {
        navigate('/login');
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden relative">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-10 relative z-10 w-full max-w-lg px-4"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#020B4B] to-[#1E3A8A] flex items-center justify-center shadow-[0_0_50px_rgba(2,11,75,0.6)] border border-white/10"
          >
            <Hexagon className="w-12 h-12 text-white fill-white/10" />
          </motion.div>
        </div>
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            SkyLinks Capital <span className="text-blue-500">Terminal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] opacity-80"
          >
            Enterprise Financial Infrastructure
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3 text-blue-400 text-[9px] font-mono font-bold bg-blue-500/5 px-6 py-3 rounded-full border border-blue-500/20 backdrop-blur-xl tracking-widest shadow-2xl">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            INITIALIZING SECURE PROTOCOLS...
          </div>
        </motion.div>
      </motion.div>
      <footer className="absolute bottom-10 text-center text-slate-700 text-[9px] font-black tracking-[0.4em] uppercase opacity-50">
        <p>© 2025 SkyLinks Capital • Secure Node v4.9.2-GOLD</p>
      </footer>
    </div>
  )
}