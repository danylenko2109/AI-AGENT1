import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  CalendarCheck,
  Car,
  Check,
  CircuitBoard,
  Clock3,
  DatabaseZap,
  Gem,
  Globe2,
  LineChart,
  MessageSquareText,
  MessagesSquare,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from 'lucide-react'

export const navItems = ['Services', 'Solutions', 'Cases', 'Pricing', 'Contact']

export const trustBadges = [
  { icon: Sparkles, label: 'AI Powered' },
  { icon: Clock3, label: '24/7 Automation' },
  { icon: DatabaseZap, label: 'CRM Integration' },
]

export const problems = [
  {
    icon: MessagesSquare,
    title: 'Businesses lose leads in direct messages',
    text: 'Every unanswered DM becomes a silent competitor win. FirstAI captures intent instantly across channels.',
  },
  {
    icon: Clock3,
    title: 'Managers answer too slowly',
    text: 'AI managers respond in seconds, qualify demand, and keep conversations moving while your team focuses on closing.',
  },
  {
    icon: Workflow,
    title: 'No automation',
    text: 'Manual handoffs, repetitive replies, and scattered spreadsheets are replaced with a connected operating system.',
  },
  {
    icon: BarChart3,
    title: 'No analytics',
    text: 'Know exactly where leads come from, which scripts convert, and what bottlenecks block revenue growth.',
  },
  {
    icon: Target,
    title: 'Lost revenue',
    text: 'A premium automation layer turns missed conversations into booked calls, CRM records, and measurable sales momentum.',
  },
]

export const solutions = [
  {
    icon: Globe2,
    title: 'AI Websites',
    text: 'Conversion-focused websites with intelligent lead capture, contextual CTAs, and rich behavioral events.',
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    text: 'Brand-trained assistants that answer questions, qualify clients, and route hot conversations to your team.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Managers',
    text: 'Always-on digital sales operators that handle objections, gather data, and book appointments automatically.',
  },
  {
    icon: CircuitBoard,
    title: 'Automation',
    text: 'Integrations between forms, Telegram, CRM, calendars, spreadsheets, ads, and internal notifications.',
  },
  {
    icon: LineChart,
    title: 'Analytics',
    text: 'Executive dashboards showing lead quality, response speed, booked calls, conversion, and revenue signals.',
  },
]

export const flowSteps = [
  { icon: Building2, label: 'Client' },
  { icon: BrainCircuit, label: 'AI' },
  { icon: ScanLine, label: 'Qualification' },
  { icon: DatabaseZap, label: 'CRM' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Rocket, label: 'Revenue Growth' },
]

export const activityItems = [
  { icon: Zap, label: 'New lead captured', meta: 'Telegram • 8 sec ago', status: 'hot' },
  { icon: MessageSquareText, label: 'AI replied to customer', meta: 'Instagram DM • 19 sec ago', status: 'live' },
  { icon: CalendarCheck, label: 'Appointment booked', meta: 'CRM synced • 42 sec ago', status: 'won' },
  { icon: ShieldCheck, label: 'Duplicate request filtered', meta: 'Automation rule • 1 min ago', status: 'clean' },
]

export const cases = [
  {
    icon: Gem,
    company: 'Beauty Studio',
    result: '+40% bookings',
    text: 'AI manager qualified clients, recommended services, and booked appointments without waiting for manual replies.',
  },
  {
    icon: Car,
    company: 'Car Service',
    result: '2x more inquiries',
    text: 'Automated diagnostics intake, service routing, and CRM reminders doubled qualified customer conversations.',
  },
  {
    icon: Building2,
    company: 'Construction Company',
    result: 'Stable lead flow',
    text: 'Lead forms, messenger bots, and analytics created a predictable pipeline from first touch to consultation.',
  },
]

export const pricing = [
  {
    name: 'START',
    price: '150$',
    text: 'Launch a focused AI entry point for one channel.',
    features: ['AI lead form', 'Telegram notifications', 'Basic bot script', 'Setup analytics'],
  },
  {
    name: 'PRO',
    price: '300$',
    text: 'A complete automation layer for growing teams.',
    featured: true,
    features: ['AI website section', 'AI manager', 'CRM integration', 'Appointment booking', 'Conversion dashboard'],
  },
  {
    name: 'MAX',
    price: '500$',
    text: 'Premium multi-channel system for serious scale.',
    features: ['Full funnel architecture', 'Advanced workflows', 'Custom AI knowledge base', 'Analytics suite', 'Priority optimization'],
  },
]

export const footerLinks = ['Services', 'Solutions', 'Cases', 'Pricing', 'Contact']
export const footerSocial = ['X', 'LinkedIn', 'Instagram']
export { Activity, ArrowUpRight, Check }
