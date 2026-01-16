import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hexagon, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const authSession = localStorage.getItem('finnexus_auth_session');
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8 relative z-10 w-full max-w-lg px-4"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-[0_0_40px_rgba(243,128,32,0.4)]"
          >
            <Hexagon className="w-10 h-10 text-white fill-white/20" />
          </motion.div>
        </div>
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tighter"
          >
            SkyLinks Capital <span className="text-gradient">Terminal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-[0.3em]"
          >
            SkyLinks Capital Financial Core
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3 text-indigo-400 text-xs font-mono font-bold bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
            <Loader2 className="h-3 w-3 animate-spin" />
            SYNCHRONIZING SECURE NODES...
          </div>
        </motion.div>
      </motion.div>
      <footer className="absolute bottom-10 text-center text-slate-600 text-[10px] font-bold tracking-widest uppercase">
        <p>© 2025 SkyLinks Capital • Version 4.8.2-LTS</p>
      </footer>
    </div>
  )
}