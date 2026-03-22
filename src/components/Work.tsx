import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Zap, Globe, Palette, Mail } from 'lucide-react'
import FadeIn from './FadeIn'
import { cn } from '@/lib/utils'
import { pillStagger, slideUpSmall, viewport } from '@/lib/animations'
import CaseStudyModal from './CaseStudyModal'

// ─── Filter categories ───────────────────────────────────────────────────────
type Category = 'All' | 'AI Automations' | 'Website Creation' | 'UI/UX Design' | 'Email Design'

const filters: { label: Category; icon: React.ElementType }[] = [
  { label: 'All',             icon: Zap     },
  { label: 'AI Automations',  icon: Zap     },
  { label: 'Website Creation',icon: Globe   },
  { label: 'UI/UX Design',    icon: Palette },
  { label: 'Email Design',    icon: Mail    },
]

// ─── Projects ────────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'Altitude Gym',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'Designed and built a modern gym website for Altitude Gym — showcasing memberships, class schedules, and facilities with a clean, high-energy look that drives sign-ups.',
    outcomes: ['Live on Vercel', 'Mobile-first responsive', 'Conversion-focused layout'],
    accent: 'from-violet-500/10 to-indigo-500/5',
    icon: Globe,
    iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
    link: 'https://altitudegym.vercel.app/',
    caseStudy: {
      problem:
        'Altitude Gym had no digital presence — potential members had no way to explore memberships, view class schedules, or contact the gym online, resulting in missed leads.',
      solution:
        'Built a full marketing website with a bold hero, membership tiers, class schedule section, facilities gallery, and a contact form. Designed to be fast, mobile-first, and easy to update.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Deployed and live on Vercel. The site gives Altitude Gym a professional online presence with a conversion-focused layout built to turn visitors into members.',
    },
  },
  {
    id: '02',
    title: 'Album Caption Generator',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · OpenAI',
    description:
      'Upload a photo or folder to Google Drive and AI automatically reads each image, generates a platform-ready caption, and logs everything to Airtable — no manual writing needed.',
    outcomes: ['AI caption per image, zero typing', 'Works on full album uploads', 'All output logged in Airtable'],
    accent: 'from-amber-500/10 to-orange-500/5',
    icon: Zap,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    preview: '/previews/n8n-content-pipeline-1.png',
    caseStudy: {
      problem:
        'A social media manager handling multiple photography clients was spending 2–3 hours after every shoot writing captions manually. With 20+ images per session and several clients per week, the workload was unsustainable — and the quality was inconsistent depending on how rushed they were.',
      solution:
        'Built an n8n workflow triggered whenever a new image or folder is uploaded to Google Drive. Each image is sent to OpenAI Vision, which reads the content of the photo and generates a platform-appropriate caption with relevant tone and hashtag suggestions. The caption and image reference are saved to an Airtable Content Sheet, and the item is marked as processed so nothing gets duplicated.',
      tools: ['n8n', 'Google Drive', 'OpenAI Vision', 'Airtable'],
      results:
        'Caption writing went from a manual 2–3 hour task to a fully automated background process. The social media manager now uploads the shoot, walks away, and returns to a full sheet of ready-to-use captions — with consistent quality across every image.',
    },
  },
  {
    id: '03',
    title: 'Homu Cafe',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'Designed a warm, immersive website for Homu Cafe — a Japanese-inspired cafe brand — using rich food photography, earthy tones, and a layout that makes visitors feel the atmosphere before they arrive.',
    outcomes: ['Brand identity reflected in every section', 'Food-first visual hierarchy', 'Mobile-friendly layout'],
    accent: 'from-orange-500/10 to-amber-500/5',
    icon: Palette,
    iconColor: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
    preview: '/previews/uiux-homu.png',
    caseStudy: {
      problem:
        'Homu Cafe had a strong physical presence and a clear brand identity rooted in Japanese food culture — but no digital home to match it. Potential customers searching online had no way to feel the brand\'s warmth before walking through the door.',
      solution:
        'Designed a full website UI with a bold hero section featuring their signature tagline "Experience Japan in Every Sip & Bite", immersive food photography throughout, a story section humanising the brand, a categorised menu showcase, and a contact section with location and hours. The visual direction used warm amber and earthy tones to mirror the cafe\'s interior feel.',
      tools: ['Figma', 'UI Design', 'Typography', 'Brand Direction'],
      results:
        'The design gives Homu Cafe a digital presence as inviting as the cafe itself — a warm, story-driven layout that builds appetite and connection before the customer even visits.',
    },
  },
  {
    id: '15',
    title: 'IMAGO Art Gallery',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'Designed a dark, editorial website for IMAGO — an art gallery connecting collectors with curated artwork and artists — with a visual language that commands attention and elevates every piece.',
    outcomes: ['Gallery-quality visual presentation', 'Clear pathways for buyers and creators', 'Bold editorial aesthetic'],
    accent: 'from-slate-500/10 to-zinc-500/5',
    icon: Palette,
    iconColor: 'text-slate-500 bg-slate-50 dark:bg-slate-500/10',
    preview: '/previews/uiux-imago.png',
    caseStudy: {
      problem:
        'IMAGO needed a digital space that matched the prestige of the art it represented. A generic template or light-themed site would undermine the gallery\'s positioning — they needed something that felt as considered as the artwork itself.',
      solution:
        'Designed a full-page dark UI with a cinematic hero, curated artwork grid, artist discovery section, and an upcoming events/exhibitions area. The layout uses generous whitespace, bold serif typography, and high-contrast image treatment to let the artwork breathe while the brand\'s identity — "Where Arts Meets Vision" — remains front and centre.',
      tools: ['Figma', 'UI Design', 'Typography', 'Dark Mode Design'],
      results:
        'The design positions IMAGO as a serious, premium gallery space online — one that collectors and artists would trust. Every section reinforces the brand without competing with the artwork on display.',
    },
  },
  {
    id: '16',
    title: 'Likha Web Solutions',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'Designed the agency website UI for Likha Web Solutions — a bold, conversion-focused layout that positions them as a results-driven web design and social media agency.',
    outcomes: ['Conversion-first layout', 'Portfolio and services clearly presented', 'Strong agency brand voice'],
    accent: 'from-blue-500/10 to-indigo-500/5',
    icon: Palette,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    preview: '/previews/uiux-likha.png',
    caseStudy: {
      problem:
        'Likha Web Solutions needed a website that did what they promise their clients — turn clicks into results. The design had to establish credibility, communicate services clearly, and move visitors toward an inquiry without friction.',
      solution:
        'Designed a dark blue agency site with a punchy hero headline ("Web Design & Social Media That Turn Clicks Into Cash"), a services breakdown, a proof section with past client results, a team introduction, and a strong CTA at the bottom. The visual tone is bold and professional — balancing energy with trust.',
      tools: ['Figma', 'UI Design', 'Conversion Design', 'Brand Direction'],
      results:
        'The design gives Likha a website that matches the confidence of their pitch — a strong first impression that communicates capability and pushes visitors to take action.',
    },
  },
  {
    id: '17',
    title: 'INTTO — Innovation & Technology Transfer Office',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'Designed the UI for INTTO — an institutional body bridging academic research and industry — with a credible, information-rich layout that communicates services, numbers, and startups clearly.',
    outcomes: ['Institutional-grade credibility', 'Complex content made scannable', 'Clear service and programme structure'],
    accent: 'from-green-500/10 to-emerald-500/5',
    icon: Palette,
    iconColor: 'text-green-600 bg-green-50 dark:bg-green-500/10',
    preview: '/previews/uiux-intto.png',
    caseStudy: {
      problem:
        'INTTO operates in a complex space — technology transfer, IP management, industry partnerships, and startup support — and had no cohesive digital design to present all of this clearly to researchers, companies, and the public.',
      solution:
        'Designed a structured, professional UI using INTTO\'s green brand colour. The layout guides visitors through: a mission-driven hero, an About and Objective section, a grid of services with icons, a statistics strip ("InTTO by the Numbers"), a startup showcase, and a newsletter sign-up. Every section is designed to inform without overwhelming.',
      tools: ['Figma', 'UI Design', 'Information Architecture', 'Brand Direction'],
      results:
        'The design gives INTTO a trustworthy, organised presence that communicates the full scope of their work — making it easy for any audience (researcher, company, or student) to find what they need.',
    },
  },
  {
    id: '18',
    title: 'Taraki',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'Designed the UI for Taraki — a knowledge-empowerment foundation with multiple programmes — creating a comprehensive site that communicates their mission, activities, and community reach.',
    outcomes: ['Multi-programme content organised clearly', 'Community-driven visual tone', 'Consistent brand across all sections'],
    accent: 'from-violet-500/10 to-purple-500/5',
    icon: Palette,
    iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
    preview: '/previews/uiux-taraki.png',
    caseStudy: {
      problem:
        'Taraki runs several distinct programmes — awareness, readiness, innovation, and a knowledge hub — but had no unified design that tied everything together under one coherent brand and site structure.',
      solution:
        'Designed a full UI covering Taraki\'s mission, team, and each programme with dedicated sections. The layout uses a consistent visual language — dark tones with warm amber accents — across programme cards, photo sections, a FAQ accordion, and a community-facing footer. Navigation gives clear entry points to each area without fragmenting the brand.',
      tools: ['Figma', 'UI Design', 'Information Architecture', 'Brand Direction'],
      results:
        'The design unifies Taraki\'s diverse programmes under one strong visual identity — making the foundation\'s work immediately legible and credible to partners, participants, and the public.',
    },
  },
  {
    id: '04',
    title: 'Google Sheets → Invoice PDF Pipeline',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · Google Sheets',
    description:
      'A freelancer fills in a Google Sheet row with project details and within seconds a formatted invoice PDF is generated, saved to Drive, and emailed to the client automatically.',
    outcomes: ['Invoice sent in seconds, not hours', 'No manual formatting ever', 'PDF archived to Drive automatically'],
    accent: 'from-emerald-500/10 to-teal-500/5',
    icon: Zap,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    preview: '/previews/n8n-content-pipeline-2.png',
    caseStudy: {
      problem:
        'A freelance developer with 15+ active clients was spending half a day on invoicing every week — copying project details from a spreadsheet into a Word template, formatting line items, converting to PDF, and manually emailing each one. It was repetitive, error-prone, and ate into billable time.',
      solution:
        'Built an n8n workflow that watches Google Sheets for newly completed rows. When a row is marked ready, n8n extracts the client name, project description, line items, and amounts — generates a cleanly formatted invoice PDF using an HTML template — saves it to a designated Google Drive folder — and emails it directly to the client with the PDF attached.',
      tools: ['n8n', 'Google Sheets', 'PDF Generation', 'Google Drive', 'Gmail'],
      results:
        'Invoicing went from a half-day weekly task to something that happens automatically in the background. The freelancer now just fills in the sheet, and the client receives a professional invoice within seconds — with zero additional effort.',
    },
  },
  {
    id: '05',
    title: 'Calvin Klein — Jennie Campaign',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'Designed a campaign email for the "Jennie for Calvin Klein" collaboration — minimalist luxury aesthetic, editorial photography layout, and a clear CTA that stays true to the brand\'s timeless identity.',
    outcomes: ['Luxury editorial aesthetic', 'Desktop & mobile layouts designed', 'On-brand CK visual language'],
    accent: 'from-neutral-500/10 to-stone-500/5',
    icon: Mail,
    iconColor: 'text-neutral-500 bg-neutral-50 dark:bg-neutral-500/10',
    preview: '/previews/email-calvinklein.png',
    caseStudy: {
      problem:
        'Campaign emails for luxury fashion brands demand an editorial standard that generic templates can\'t achieve. The Jennie x Calvin Klein collaboration needed an email that felt as considered as the campaign itself — clean, powerful, and on-brand.',
      solution:
        'Designed a minimalist email layout anchored by a full-width campaign hero image of Jennie. The copy — "Timeless. Classic. Indispensable." — is set in clean sans-serif with generous whitespace. A secondary image grid showcases the collection range, and a single "Shop Now" CTA keeps the focus sharp. Both desktop and mobile layouts were designed to maintain the editorial feel across every screen size.',
      tools: ['Figma', 'Email Design', 'Brand Guidelines', 'Typography'],
      results:
        'The design captures the Calvin Klein brand voice precisely — restrained, confident, and image-led — with a layout that drives attention toward the campaign and the single conversion action.',
    },
  },
  {
    id: '19',
    title: 'Gymshark — History of Onyx',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'Designed a launch email for Gymshark\'s "History of Onyx" collection — a dark, high-energy layout with bold product photography and feature callouts built to drive urgency and conversions.',
    outcomes: ['High-impact dark visual tone', 'Feature-led product storytelling', 'Desktop & mobile designed'],
    accent: 'from-zinc-500/10 to-neutral-500/5',
    icon: Mail,
    iconColor: 'text-zinc-600 bg-zinc-50 dark:bg-zinc-500/10',
    preview: '/previews/email-gymshark.png',
    caseStudy: {
      problem:
        'Gymshark\'s Onyx collection re-launch needed an email that matched the brand\'s intensity — a design that communicated the story behind the collection and pushed the product\'s technical features without feeling like a standard promotional blast.',
      solution:
        'Designed a dark, editorial email with a cinematic hero, the collection\'s backstory ("We dropped the OG collection in 2016..."), and distinct feature callouts: Heavy-Duty Compression, Physique Enhancing Design, Statement Lift in 3D, and Powerful Silhouettes. The layout balances storytelling with conversion — ending with a "Shop All" CTA and a clean footer with social links and legal copy.',
      tools: ['Figma', 'Email Design', 'Brand Guidelines', 'Dark Mode Design'],
      results:
        'The design tells the collection\'s story while driving to purchase — a balance Gymshark\'s audience responds to. Every section earns its place, moving the reader from brand history to product belief to action.',
    },
  },
  {
    id: '20',
    title: 'Louis Vuitton — House Ambassadors',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'Designed a campaign email for Louis Vuitton\'s House Ambassadors — Lisa, j-hope, and Felix — with an understated luxury layout that lets the talent and the brand speak for themselves.',
    outcomes: ['Ultra-minimal luxury presentation', 'Talent-first visual hierarchy', 'Desktop & mobile layouts'],
    accent: 'from-amber-500/10 to-yellow-500/5',
    icon: Mail,
    iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
    preview: '/previews/email-lv.png',
    caseStudy: {
      problem:
        'A Louis Vuitton email has to communicate exclusivity without trying too hard. The House Ambassadors campaign — featuring global music icons — needed an email where the imagery did the work and the design got out of the way.',
      solution:
        'Designed a two-section email: a hero featuring the three ambassadors with a single "Discover more" CTA, followed by a clean dark footer with the LV monogram, navigation categories (Gifts, Bags, Women, Men, Travel), and account links. No excess copy, no competing elements — just the brand, the talent, and the call to action.',
      tools: ['Figma', 'Email Design', 'Luxury Brand Guidelines', 'Minimalist Layout'],
      results:
        'The design is as restrained as the brand demands — a single strong image, a single action, and nothing else. The kind of email that feels like an invitation, not an advertisement.',
    },
  },
  {
    id: '21',
    title: "McDonald's — The Legends Are Back",
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      "Designed a 40th anniversary promotional email for McDonald's — a warm, high-energy layout bringing back iconic limited-time menu items with bold product photography and a nostalgia-driven message.",
    outcomes: ['Nostalgia-driven campaign design', 'Product grid with individual CTAs', 'Desktop & mobile designed'],
    accent: 'from-yellow-500/10 to-orange-500/5',
    icon: Mail,
    iconColor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10',
    preview: '/previews/email-mcdonald.png',
    caseStudy: {
      problem:
        "McDonald's 40th Anniversary re-launch of classic menu items — the CBO, McRoyal Deluxe, 1955, and Double 1955 — needed an email that felt celebratory and nostalgic while still driving urgency. A standard promotional layout wouldn't do justice to the occasion.",
      solution:
        "Designed a warm yellow email with a hero featuring all four legendary burgers, a bold headline (\"The Legends are back\"), and nostalgic copy reconnecting customers with their memories. Below, a clean product grid presents each item with its own \"Learn more\" CTA. The layout closes with an app download prompt and the McDonald's 40th anniversary mark.",
      tools: ['Figma', 'Email Design', 'Campaign Layout', 'Brand Guidelines'],
      results:
        'The design balances celebration with conversion — a visually rich layout that stirs nostalgia and gives every product its own moment while keeping the path to action simple and clear.',
    },
  },
  {
    id: '22',
    title: 'Samsung — Galaxy Z Fold7',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Product Launch',
    description:
      'Designed a product launch email for the Samsung Galaxy Z Fold7 — a feature-led layout that builds the case for the device through spec highlights, lifestyle imagery, and a clear upgrade CTA.',
    outcomes: ['Feature-led product storytelling', 'Tech-forward visual tone', 'Desktop design with spec callouts'],
    accent: 'from-blue-500/10 to-cyan-500/5',
    icon: Mail,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    preview: '/previews/email-samsung.png',
    caseStudy: {
      problem:
        'Launching a flagship foldable phone in email requires more than a hero image and a button. The Galaxy Z Fold7 has a specific story to tell — thinnest, lightest, most powerful — and the email needed to build conviction before asking for the click.',
      solution:
        'Designed a feature-stacked email opening with a confident headline ("Ultra sleek. Ultra light.") and a lifestyle hand shot of the device. The body walks through four key spec callouts with supporting imagery: all-new Fold design, ultra-detailed photos, most powerful processor, and efficient battery. The layout closes with trade-in and purchase CTAs and a Samsung Care mention to reduce purchase hesitation.',
      tools: ['Figma', 'Email Design', 'Product Marketing Layout', 'Tech Brand Guidelines'],
      results:
        'The design builds the argument for the Z Fold7 step by step — moving the reader from awareness to interest to purchase intent through a structured, feature-driven narrative that feels premium throughout.',
    },
  },
  {
    id: '06',
    title: 'Taraki Consortium',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'Built the official web presence for Taraki Consortium — a clean, professional site that communicates the organisation\'s mission, services, and team to stakeholders and partners.',
    outcomes: ['Live on Vercel', 'Professional brand presence', 'Fully responsive'],
    accent: 'from-indigo-500/10 to-blue-500/5',
    icon: Globe,
    iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10',
    link: 'https://taraki.vercel.app/',
    caseStudy: {
      problem:
        'Taraki Consortium needed a professional digital presence to present their organisation to potential partners, clients, and stakeholders — with no existing website to build from.',
      solution:
        'Designed and built a clean, content-driven website covering the organisation\'s mission, services, team, and contact information. Focused on clarity, professional tone, and mobile responsiveness.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Delivered a live, professional website that gives Taraki Consortium a credible online presence to support outreach, partnerships, and stakeholder communication.',
    },
  },
  {
    id: '08',
    title: 'Lead Capture → CRM → Email Follow-up',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · HubSpot',
    description:
      'Every lead from any source — forms, ads, or DMs — is captured via webhook, logged in the CRM, tagged by origin, and sent a personalised follow-up email automatically.',
    outcomes: ['Lead in CRM within seconds', 'Personalised follow-up sent instantly', 'Sales team notified on Slack'],
    accent: 'from-orange-500/10 to-red-500/5',
    icon: Zap,
    iconColor: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
    preview: '/previews/n8n-complex-workflow.png',
    caseStudy: {
      problem:
        'A digital marketing agency was pulling leads manually from Facebook Ads, website forms, and Instagram DMs every morning — copying details into HubSpot, assigning them to reps, and sending welcome emails by hand. Response times averaged 6+ hours, and leads from overnight campaigns were going cold before anyone saw them.',
      solution:
        'Built an n8n workflow with a universal webhook endpoint that receives leads from any source. It normalises the incoming fields (name, email, source, intent), creates a contact record in HubSpot with appropriate tags, triggers a personalised email follow-up based on the lead source, and posts a Slack notification to the sales channel with the lead\'s key details for immediate human review if needed.',
      tools: ['n8n', 'Webhook', 'HubSpot', 'Gmail', 'Slack'],
      results:
        'Lead response time dropped from 6+ hours to under a minute. Every lead is now in HubSpot with the right tags the moment it comes in, and follow-up emails go out before a human even sees the notification. The agency handles 3× the lead volume with the same team.',
    },
  },
  {
    id: '09',
    title: 'Barbershop Booking Assistant',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · AI Voice',
    description:
      'An AI voice assistant answers inbound booking calls for a barbershop 24/7 — checks availability, confirms the appointment verbally, logs the booking, and sends an SMS reminder.',
    outcomes: ['Calls answered 24/7, no staff needed', 'Bookings logged automatically', 'SMS reminders sent hands-free'],
    accent: 'from-green-500/10 to-teal-500/5',
    icon: Zap,
    iconColor: 'text-green-600 bg-green-50 dark:bg-green-500/10',
    preview: '/previews/n8n-booking-onboarding.png',
    caseStudy: {
      problem:
        'A barbershop owner was the sole person handling all appointment calls — manually checking a paper calendar, confirming times, and jotting bookings by hand. Missed calls during busy hours meant missed revenue. After hours, calls went unanswered entirely and potential clients booked elsewhere.',
      solution:
        'Built an n8n-powered AI voice assistant using a voice AI provider (Bland.ai / Vapi) that handles all inbound booking calls. The assistant greets the caller, asks for their preferred date, time, and barber, checks real-time availability on Google Calendar, confirms the slot verbally with the caller, creates the booking record in Airtable, and triggers a Twilio SMS reminder to be sent before the appointment.',
      tools: ['n8n', 'Bland.ai / Vapi', 'Google Calendar', 'Airtable', 'Twilio SMS'],
      results:
        'The barbershop now takes bookings 24/7 without any staff involvement. No calls go unanswered, the calendar stays up to date automatically, and clients receive SMS reminders that cut no-shows significantly.',
    },
  },
  {
    id: '10',
    title: 'AI Lead Intake & Auto-Response System',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · AI by Zapier',
    description:
      'Inquiry forms are automatically qualified by Zapier — high-intent leads get an AI-written personalised reply within minutes, while all leads are logged and the team is alerted instantly.',
    outcomes: ['Reply sent within minutes of submission', 'Hot leads flagged to team instantly', 'Manual review fully eliminated'],
    accent: 'from-yellow-500/10 to-amber-500/5',
    icon: Zap,
    iconColor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10',
    preview: '/previews/zapier-appointment.png',
    caseStudy: {
      problem:
        'A coaching business was receiving 40+ inquiry forms per week. Every single one required manual review before a reply could go out — the owner was writing individual responses, assessing budgets, and deciding who to prioritise. Response times stretched to 24–48 hours, and potential clients who didn\'t hear back quickly moved on to competitors.',
      solution:
        'Built a Zapier workflow triggered on every form submission. Path conditions evaluate key fields (budget range, intent signals, service type) to qualify the lead automatically. Qualified leads immediately receive an AI-written personalised response via Gmail, tailored to their specific inquiry. All leads — regardless of score — are logged to a Google Sheet with their qualification status, and a Slack alert notifies the team whenever a high-intent lead comes in for immediate personal follow-up.',
      tools: ['Zapier', 'Google Forms', 'AI by Zapier', 'Gmail', 'Google Sheets', 'Slack'],
      results:
        'Every inquiry now gets a thoughtful, personalised response within minutes — not days. The coaching business converted significantly more leads simply by responding faster, and the owner reclaimed hours each week that were previously spent on manual triage.',
    },
  },
  {
    id: '12',
    title: 'Asana CRM Automation',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · Asana',
    description:
      'Five Zapier automations that keep a sales team\'s Asana CRM fully in sync — new leads become tasks instantly, follow-up sequences fire on stage changes, and deals close themselves on paper.',
    outcomes: ['CRM updated without manual input', 'Follow-ups fire on every stage change', 'Zero deals fall through'],
    accent: 'from-purple-500/10 to-violet-500/5',
    icon: Zap,
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    preview: '/previews/zapier-crm-pipeline.png',
    caseStudy: {
      problem:
        'A 3-person sales team was using Asana to track deals but spending 45 minutes per day on CRM housekeeping — manually creating tasks for new leads, moving cards between stages, sending follow-up emails, and logging closed deals to Google Drive. The CRM only reflected reality when someone remembered to update it, which wasn\'t always.',
      solution:
        'Built 5 targeted Zapier automations: (1) New lead arrives → Asana task auto-created with all contact details and assigned to the right rep. (2) Task moves to a new stage → the appropriate email sequence triggers automatically with Delay and Filter steps to stop it if the lead replies. (3) Deal reaches Approved → onboarding task created and personalised welcome email sent. (4) Payment confirmed → deal marked closed, summary logged to Google Drive. (5) No response after 3 days → escalating follow-up sequence fires and stops cleanly on reply.',
      tools: ['Zapier', 'Asana', 'Gmail', 'Google Drive', 'Delay & Filter by Zapier'],
      results:
        'The team\'s Asana board now reflects live deal status without anyone manually updating it. Follow-ups go out at exactly the right time, no lead is ever forgotten, and closing a deal triggers the entire post-sale process automatically.',
    },
  },
  {
    id: '13',
    title: 'Lead Qualification Process',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · AI by Zapier',
    description:
      'Incoming leads are automatically scored on company size, source, and intent — high-priority leads reach the sales team within minutes, low-priority leads enter a nurture sequence, and everything is logged.',
    outcomes: ['Hot leads reach sales in under 5 min', 'Low-quality leads auto-nurtured', 'Full lead log in Google Sheets'],
    accent: 'from-sky-500/10 to-blue-500/5',
    icon: Zap,
    iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10',
    preview: '/previews/zapier-form-routing.png',
    caseStudy: {
      problem:
        'A B2B SaaS company was receiving 50+ leads per week through their website form. Sales reps were manually visiting each company\'s website, estimating company size, reading the lead\'s message, and deciding whether it was worth pursuing — a process that took hours and still produced inconsistent prioritisation. Reps were spending as much time on low-quality leads as on high-value ones.',
      solution:
        'Built a Zapier qualification pipeline triggered by every form submission. The lead data is enriched using available signals (company size field, lead source, message intent). A scoring function via Filter and Path by Zapier routes the lead: high-priority leads trigger an immediate Slack alert to the sales team and an AI-written personalised outreach email via Gmail. Lower-priority leads enter an automated nurture sequence. Every lead — regardless of score — is appended to a Google Sheet with its score, source, and routing decision for full visibility.',
      tools: ['Zapier', 'Google Sheets', 'AI by Zapier', 'Slack', 'Gmail', 'Filter & Path by Zapier'],
      results:
        'Sales reps now only receive leads that meet the qualification criteria — their time is spent on conversations, not triage. Hot leads hear from the team within 5 minutes. Low-priority leads are nurtured automatically rather than ignored, and the Google Sheet gives management a clear view of pipeline quality over time.',
    },
  },
  {
    id: '14',
    title: 'Likha Web Solutions',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'Built the brand website for Likha Web Solutions — a clean, professional agency site showcasing services, portfolio, and a clear path for clients to get started.',
    outcomes: ['Live on custom domain', 'Professional agency presence', 'Fully responsive'],
    accent: 'from-rose-500/10 to-pink-500/5',
    icon: Globe,
    iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
    link: 'https://likhawebsolutions.com/',
    caseStudy: {
      problem:
        'Likha Web Solutions needed a website that reflected the quality of their work — a place where potential clients could understand the agency\'s services, see past projects, and reach out with confidence.',
      solution:
        'Designed and built a clean agency website covering services, portfolio highlights, and contact. Focused on a strong first impression, clear service communication, and a frictionless path to inquiry.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Delivered a live, professional agency site that gives Likha Web Solutions a credible online presence to attract and convert new clients.',
    },
  },
  {
    id: '11',
    title: 'Innovation & Technology Transfer Office',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'Developed the web platform for INTTO — presenting research commercialisation services, IP management, and industry partnership opportunities to academics and industry partners.',
    outcomes: ['Live on Vercel', 'Institutional-grade design', 'Fully responsive'],
    accent: 'from-cyan-500/10 to-sky-500/5',
    icon: Globe,
    iconColor: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10',
    link: 'https://intto.vercel.app/',
    caseStudy: {
      problem:
        'INTTO needed a platform that clearly communicated their role in bridging academic research and industry — existing materials were fragmented across documents with no centralised web presence.',
      solution:
        'Built a structured, information-rich website covering INTTO\'s services (IP management, licensing, industry partnerships), resources for researchers, and contact pathways. Designed for clarity and institutional credibility.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Delivered a live platform that gives INTTO a professional home for their services, making it easy for researchers and industry partners to understand offerings and get in touch.',
    },
  },
]

// ─── Card animation variants ─────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, scale: 0.97,
    transition: { duration: 0.2, ease: 'easeIn' } },
}

const PAGE_SIZE = 4

export default function Work() {
  const [active, setActive] = useState<Category>('All')
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null)

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.filter === active)

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  const hasMore = filtered.length > PAGE_SIZE

  const handleFilterChange = (label: Category) => {
    setActive(label)
    setShowAll(false)
  }

  return (
    <section id="work" className="py-24 px-6 md:px-12 lg:px-20 bg-muted/20">
      <div className="max-w-7xl mx-auto">

        {/* Header — slides in from right */}
        <div className="mb-10">
          <FadeIn direction="right">
            <span className="section-label">Selected Work</span>
          </FadeIn>
          <FadeIn direction="right" delay={0.07}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mt-2">
              From idea to{' '}
              <span className="text-accent">launched system</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.14}>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-xl">
              Real projects across automation, web, design, and email — each built to solve a
              specific problem and deliver measurable results.
            </p>
          </FadeIn>
          {/* Accent line */}
          <motion.div
            className="h-0.5 w-16 bg-accent rounded-full mt-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ── Filter tabs — stagger in from left ── */}
        <motion.div
          variants={pillStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map(({ label, icon: Icon }) => {
              const isActive = active === label
              return (
                <motion.div key={label} variants={slideUpSmall}>
                <button
                  onClick={() => handleFilterChange(label)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border',
                    isActive
                      ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                      : 'bg-background text-muted-foreground border-border hover:border-accent/40 hover:text-foreground hover:bg-accent/5',
                  )}
                >
                  {/* Only show icon for non-All tabs, since All reuses the Zap icon */}
                  {label !== 'All' && (
                    <Icon size={13} strokeWidth={2} className="shrink-0" />
                  )}
                  {label}
                  {/* Count badge */}
                  <span
                    className={cn(
                      'text-xs rounded-full px-1.5 py-0.5 font-semibold leading-none',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {label === 'All'
                      ? projects.length
                      : projects.filter((p) => p.filter === label).length}
                  </span>
                </button>
              </motion.div>
              )
            })}
        </motion.div>

        {/* ── Projects grid ── */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="portfolio-card flex flex-col"
                >
                  {/* Top strip */}
                  <div className={cn('h-24 bg-gradient-to-br relative flex items-center px-6 gap-4', p.accent)}>
                    {/* Icon */}
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', p.iconColor)}>
                      <Icon size={16} strokeWidth={1.75} />
                    </div>

                    {/* Category label */}
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                      {p.category}
                    </span>

                    {/* Big ghost ID */}
                    <span className="absolute right-5 bottom-1 font-heading font-bold text-6xl leading-none text-foreground/[0.06] select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="flex flex-col gap-2 pt-3 border-t border-border">
                      {p.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle size={13} className="text-accent shrink-0" strokeWidth={2} />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setSelectedProject(p)}
                      className="mt-auto self-start inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4 group pt-2"
                    >
                      View Case Study
                      <ArrowUpRight
                        size={13}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* See more / Show less */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
            >
              {showAll ? 'Show less' : `See more (${filtered.length - PAGE_SIZE} more)`}
            </button>
          </div>
        )}

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground text-sm"
            >
              No projects in this category yet — check back soon.
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
