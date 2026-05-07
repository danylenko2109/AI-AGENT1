import { motion } from 'framer-motion'

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: (index % 9) * 0.45,
  duration: 7 + (index % 6),
  size: 2 + (index % 3),
}))

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,.22),transparent_32%),radial-gradient(circle_at_78%_16%,rgba(6,182,212,.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(37,99,235,.16),transparent_34%)]" />
      <motion.div
        animate={{ x: [0, 42, -24, 0], y: [0, -26, 18, 0], scale: [1, 1.07, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-36 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -38, 28, 0], y: [0, 30, -16, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-cyan-500/14 blur-3xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          animate={{ opacity: [0.12, 0.75, 0.12], y: [0, -34, 0] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(6,182,212,.8)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,.1),#050816_92%)]" />
    </div>
  )
}
