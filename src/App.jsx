import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Send, Sparkles } from 'lucide-react'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { GlassCard, Section, fadeUp } from './components/Section'
import { HeroDashboard } from './components/HeroDashboard'
import {
  Activity,
  ArrowUpRight,
  Check,
  activityItems,
  cases,
  flowSteps,
  footerLinks,
  footerSocial,
  pricing,
  problems,
  solutions,
  trustBadges,
} from './data/siteData'

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pt-24">
      <motion.div style={{ y }} className="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full border border-cyan-300/10 bg-cyan-300/5 blur-2xl" />
      <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.11 }} className="relative z-10">
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.055] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-cyan-200" /> Premium AI automation agency for modern businesses
        </motion.div>
        <motion.h1 variants={fadeUp} className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
          AI Automation Systems That Bring Clients Automatically
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 text-xl font-medium text-cyan-100 md:text-2xl">
          Websites + AI Managers + Bots + Automation + Analytics
        </motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          We help businesses automate communication, capture more leads and scale faster with AI-powered systems.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-7 py-4 text-center font-semibold text-white shadow-[0_0_44px_rgba(37,99,235,.45)] transition hover:-translate-y-1 hover:shadow-[0_0_68px_rgba(6,182,212,.45)]">
            Get Free Demo
          </a>
          <a href="#solutions" className="rounded-full border border-white/12 bg-white/[.055] px-7 py-4 text-center font-semibold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200/40">
            See How It Works
          </a>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <Icon className="h-4 w-4 text-cyan-200" /> {label}
            </span>
          ))}
        </motion.div>
      </motion.div>
      <HeroDashboard />
    </section>
  )
}

function Problems() {
  return (
    <Section id="services" eyebrow="The revenue leak" title="Your clients are already asking. The system just is not catching them." text="FirstAI replaces slow manual communication with a premium automated layer designed to convert attention into measurable opportunities.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {problems.map(({ icon: Icon, title, text }, index) => (
          <GlassCard key={title} delay={index * 0.06} className="lg:min-h-72">
            <Icon className="mb-6 h-8 w-8 text-cyan-200" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">{text}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}

function Solutions() {
  return (
    <Section id="solutions" eyebrow="The FirstAI system" title="Not disconnected services. One intelligent growth infrastructure." text="Each module connects into a single AI operating system for lead capture, conversation, qualification, automation, and analytics.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map(({ icon: Icon, title, text }, index) => (
          <GlassCard key={title} delay={index * 0.06} className={index === 0 ? 'lg:col-span-2' : ''}>
            <div className="mb-8 flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/35 to-cyan-400/20 text-cyan-100">
                <Icon className="h-7 w-7" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-cyan-200" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-4 max-w-xl leading-7 text-slate-400">{text}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}

function Flow() {
  return (
    <Section eyebrow="How it works" title="From first message to revenue signal in one connected flow.">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.04] p-6 backdrop-blur-2xl lg:p-10">
        <div className="absolute left-10 right-10 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent lg:block" />
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {flowSteps.map(({ icon: Icon, label }, index) => (
            <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative rounded-3xl border border-white/10 bg-[#070b18]/80 p-5 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100 shadow-[0_0_28px_rgba(6,182,212,.14)]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-white">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function LiveActivity() {
  return (
    <Section eyebrow="Live AI Activity" title="A command center that feels alive." text="Fake preview, real architecture: every interaction can trigger answers, bookings, CRM updates, and executive metrics.">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <GlassCard className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Today</p>
            <h3 className="mt-4 text-4xl font-semibold text-white">384 automated actions</h3>
            <p className="mt-4 text-slate-400">Response speed, lead routing, and booking logic run continuously without adding headcount.</p>
          </div>
          <div className="mt-10 h-40 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,.16),rgba(6,182,212,.06))] p-4">
            <div className="flex h-full items-end gap-2">
              {[35, 62, 45, 76, 58, 88, 70, 96, 82].map((height, index) => (
                <motion.span key={height + index} initial={{ height: 8 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.7 }} className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 to-cyan-300" />
              ))}
            </div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="space-y-4">
            {activityItems.map(({ icon: Icon, label, meta, status }, index) => (
              <motion.div key={label} animate={{ x: [0, 4, 0] }} transition={{ delay: index * 0.4, duration: 3, repeat: Infinity }} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-sm text-slate-400">{meta}</p>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase text-cyan-100">{status}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  )
}

function Cases() {
  return (
    <Section id="cases" eyebrow="Cases" title="Built for businesses that need premium execution, not templates.">
      <div className="grid gap-6 md:grid-cols-3">
        {cases.map(({ icon: Icon, company, result, text }, index) => (
          <GlassCard key={company} delay={index * 0.08}>
            <Icon className="mb-8 h-9 w-9 text-cyan-200" />
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{company}</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{result}</h3>
            <p className="mt-5 leading-7 text-slate-400">{text}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}

function Pricing() {
  return (
    <Section id="pricing" eyebrow="Pricing" title="Premium systems, simple starting packages." text="Start lean, then scale the automation stack as the business grows.">
      <div className="grid gap-6 lg:grid-cols-3">
        {pricing.map((plan, index) => (
          <GlassCard key={plan.name} delay={index * 0.08} className={plan.featured ? 'border-cyan-300/30 bg-cyan-300/[.07] shadow-[0_0_70px_rgba(6,182,212,.22)]' : ''}>
            {plan.featured && <span className="mb-5 inline-flex rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Most popular</span>}
            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-4 text-5xl font-semibold tracking-tight text-white">{plan.price}</p>
            <p className="mt-4 min-h-14 text-slate-400">{plan.text}</p>
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-cyan-200" /> {feature}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 block rounded-full border border-white/10 bg-white/[.06] px-5 py-3 text-center font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/10">Get Demo</a>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" className="pb-12">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,.28),transparent_34%),rgba(255,255,255,.045)] p-6 shadow-[0_40px_140px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_.82fr]">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/80">Scale with AI</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Scale Your Business With AI</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Get a free demo concept for your business: website, AI manager, automation flow, and analytics map.</p>
            <a href="mailto:hello@firstai.systems" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-[0_0_55px_rgba(6,182,212,.32)]">
              <Mail className="h-5 w-5" /> Get Free Demo
            </a>
          </div>
          <form className="rounded-[2rem] border border-white/10 bg-[#050816]/70 p-5 backdrop-blur-2xl md:p-7">
            {['Name', 'Telegram', 'Business Type'].map((field) => (
              <label key={field} className="mb-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-300">{field}</span>
                <input className="w-full rounded-2xl border border-white/10 bg-white/[.055] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/50 focus:ring-4 focus:ring-cyan-300/10" placeholder={field === 'Telegram' ? '@username' : field} />
              </label>
            ))}
            <button type="button" className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold text-[#050816] transition hover:-translate-y-1 hover:shadow-[0_0_46px_rgba(255,255,255,.22)]">
              Get Demo <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
      <div className="flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">First<span className="text-cyan-200">AI</span></p>
          <p className="mt-2 text-slate-500">Premium AI automation systems for scalable businesses.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-400">
          {footerLinks.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white">{link}</a>)}
        </div>
        <div className="flex gap-3">
          {footerSocial.map((social) => <a key={social} href="#contact" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-xs font-bold text-slate-300 hover:text-white">{social[0]}</a>)}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2 text-sm text-slate-600 md:flex-row md:justify-between">
        <p>© 2026 FirstAI. All rights reserved.</p>
        <p>Telegram: @firstai • Email: hello@firstai.systems</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Background />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Flow />
        <LiveActivity />
        <Cases />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
