import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

export function Section({ id, eyebrow, title, text, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28 ${className}`}>
      {(eyebrow || title || text) && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/80">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>}
          {text && <p className="mt-5 text-lg leading-8 text-slate-300">{text}</p>}
        </motion.div>
      )}
      {children}
    </section>
  )
}

export function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.015 }}
      className={`premium-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-400/20" />
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
