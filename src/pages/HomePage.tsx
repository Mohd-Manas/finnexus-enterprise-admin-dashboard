import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hexagon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const authSession = localStorage.getItem('skylinks_terminal_session');
    const timer = setTimeout(() => {
      if (authSession) {
        navigate('/overview');
      } else {
        navigate('/login');
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,11,75,0.2),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center space-y-10 relative z-10 w-full max-w-lg px-4"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#020B4B] to-[#1E3A8A] flex items-center justify-center shadow-[0_0_50px_rgba(2,11,75,0.5)] border border-white/10"
          >
            <Hexagon className="w-12 h-12 text-white fill-white/10" />
          </motion.div>
        </div>
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight"
          >
            SkyLinks Capital <span className="text-gradient">Terminal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-sm md:text-base font-semibold uppercase tracking-[0.4em]"
          >
            Enterprise Financial Infrastructure
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3 text-primary text-[10px] font-mono font-bold bg-[#020B4B]/40 px-6 py-2.5 rounded-full border border-[#020B4B]/60 backdrop-blur-md tracking-widest shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            SYNCHRONIZING SECURE NODES...
          </div>
        </motion.div>
      </motion.div>
      <footer className="absolute bottom-10 text-center text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">
        <p>© 2025 SkyLinks Capital • Secure Terminal V4.9.0-GOLD</p>
      </footer>
    </div>
  )
}