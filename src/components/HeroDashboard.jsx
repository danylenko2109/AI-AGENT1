import { motion } from 'framer-motion'
import { Activity, BarChart3, Bot, BrainCircuit, DatabaseZap, UserRound } from 'lucide-react'

const nodes = [
  { icon: UserRound, label: 'Client', metric: 'New intent' },
  { icon: BrainCircuit, label: 'AI Manager', metric: 'Reply 0.8s' },
  { icon: Bot, label: 'Bot', metric: 'Qualified' },
  { icon: DatabaseZap, label: 'CRM', metric: 'Synced' },
  { icon: BarChart3, label: 'Analytics', metric: '+38% CVR' },
]

export function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48, rotateX: 8 }}
      animate={{ opacity: 1, x: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
    >
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-violet-600/25 via-blue-600/10 to-cyan-400/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#071020]/78 p-5 shadow-[0_30px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl md:p-7">
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">AI Revenue OS</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Live Automation Flow</h3>
          </div>
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]" /> Live
          </motion.div>
        </div>

        <div className="relative grid gap-4">
          <motion.div
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            className="absolute left-8 top-14 h-[78%] w-16 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-md"
          />
          {nodes.map((node, index) => {
            const Icon = node.icon
            return (
              <div key={node.label} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.12 }}
                  className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[.055] p-4"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-cyan-100 shadow-[0_0_28px_rgba(6,182,212,.18)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{node.label}</p>
                    <p className="text-sm text-slate-400">{node.metric}</p>
                  </div>
                  <Activity className="h-5 w-5 text-cyan-200" />
                </motion.div>
                {index < nodes.length - 1 && <div className="mx-8 h-5 w-px bg-gradient-to-b from-cyan-300/70 to-violet-400/30 shadow-[0_0_14px_rgba(6,182,212,.8)]" />}
              </div>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {['Leads 248', 'Booked 61', 'ROI 4.7x'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center text-sm font-semibold text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
