import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Zap, Globe, Palette, Mail } from 'lucide-react'
import FadeIn from './FadeIn'
import TiltCard from './TiltCard'
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
    title: 'Altitude Gym Rats',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'A gym website built for Altitude Gym Rats — covers memberships, class schedules, and facilities in a clean, mobile-friendly layout.',
    outcomes: ['Live on Vercel', 'Mobile responsive', 'Easy to navigate'],
    accent: 'from-violet-500/10 to-indigo-500/5',
    icon: Globe,
    iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
    link: 'https://altitude-gymrats.vercel.app/',
    caseStudy: {
      problem:
        'Altitude Gym Rats had no website — potential members had no way to learn about memberships, check class schedules, or find contact details online.',
      solution:
        'Built a gym website with a hero section, membership info, class schedule, facilities overview, and a contact form. Kept the design clean and easy to use on mobile.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'The site is live and gives the gym a proper online presence — somewhere to send people who want to learn more before walking in.',
    },
  },
  {
    id: '02',
    title: 'Album Caption Generator',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · OpenAI',
    description:
      'An n8n workflow that generates social media captions from photos uploaded to Google Drive — captions are ready in Airtable without any manual writing.',
    outcomes: ['Captions generated automatically', 'Works on single or batch uploads', 'Output saved to Airtable'],
    accent: 'from-amber-500/10 to-orange-500/5',
    icon: Zap,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    preview: '/previews/n8n-content-pipeline-1.png',
    caseStudy: {
      problem:
        'Writing captions for every photo after a shoot takes up a surprising amount of time — especially when you\'re managing multiple clients with different tones and posting schedules.',
      solution:
        'Built an n8n workflow that watches a Google Drive folder. When a new image is uploaded, it gets sent to OpenAI Vision, which reads the photo and generates a caption with tone and hashtag suggestions. The result is saved to an Airtable content sheet automatically.',
      tools: ['n8n', 'Google Drive', 'OpenAI Vision', 'Airtable'],
      results:
        'Instead of writing captions one by one, you upload the photos and they\'re waiting in the sheet when you come back. It won\'t replace a creative director, but it handles the repetitive part well.',
    },
  },
  {
    id: '03',
    title: 'Homu Cafe',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'A website UI design for Homu Cafe — a Japanese-inspired cafe brand — using warm tones and food photography to match the brand\'s atmosphere.',
    outcomes: ['Brand identity reflected in design', 'Food-first visual layout', 'Figma design file'],
    accent: 'from-orange-500/10 to-amber-500/5',
    icon: Palette,
    iconColor: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
    preview: '/previews/uiux-homu.png',
    caseStudy: {
      problem:
        'Homu Cafe had a clear brand personality offline but no digital design to reflect it. Potential customers searching online couldn\'t get a feel for the brand before visiting.',
      solution:
        'Designed a website UI in Figma with a hero section, brand story, categorised menu, and contact details. Used warm amber tones and food photography throughout to carry the cafe\'s atmosphere into the design.',
      tools: ['Figma', 'UI Design', 'Typography', 'Brand Direction'],
      results:
        'A design the brand can use as a blueprint for their website — warm, welcoming, and consistent with what they\'ve built in person.',
    },
  },
  {
    id: '15',
    title: 'IMAGO Art Gallery',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'A dark, editorial website UI for IMAGO — an art gallery — designed so the artwork stays front and centre and the layout gets out of the way.',
    outcomes: ['Dark editorial aesthetic', 'Gallery-quality presentation', 'Figma design file'],
    accent: 'from-slate-500/10 to-zinc-500/5',
    icon: Palette,
    iconColor: 'text-slate-500 bg-slate-50 dark:bg-slate-500/10',
    preview: '/previews/uiux-imago.png',
    caseStudy: {
      problem:
        'An art gallery\'s website should feel as intentional as the work it shows. A generic or template-based design would undercut the gallery\'s positioning.',
      solution:
        'Designed a dark website UI in Figma with a cinematic hero, artwork grid, artist discovery section, and an exhibitions area. Used generous whitespace and strong typography to let the work breathe.',
      tools: ['Figma', 'UI Design', 'Typography', 'Dark Mode Design'],
      results:
        'A design that gives the gallery a premium feel online — one that collectors and artists would take seriously without the layout overshadowing the art.',
    },
  },
  {
    id: '16',
    title: 'Likha Web Solutions',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'A website UI design for Likha Web Solutions — a layout that presents their services clearly and gives potential clients a reason to reach out.',
    outcomes: ['Services communicated clearly', 'Conversion-focused layout', 'Figma design file'],
    accent: 'from-blue-500/10 to-indigo-500/5',
    icon: Palette,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    preview: '/previews/uiux-likha.png',
    caseStudy: {
      problem:
        'Likha needed a website design that matched the quality of their work — somewhere potential clients could land and quickly understand what the agency does and how to get in touch.',
      solution:
        'Designed an agency website in Figma with a bold hero, service breakdown, a proof section, team intro, and a CTA at the bottom. Aimed for a look that feels professional without overcomplicating things.',
      tools: ['Figma', 'UI Design', 'Conversion Design', 'Brand Direction'],
      results:
        'A design the agency can build from — one that communicates what they do clearly and gives visitors a natural path to getting in touch.',
    },
  },
  {
    id: '17',
    title: 'INTTO — Innovation & Technology Transfer Office',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'A website UI design for INTTO — an institution bridging research and industry — with a structured layout that makes complex content easy to scan.',
    outcomes: ['Complex content made scannable', 'Institutional visual tone', 'Figma design file'],
    accent: 'from-green-500/10 to-emerald-500/5',
    icon: Palette,
    iconColor: 'text-green-600 bg-green-50 dark:bg-green-500/10',
    preview: '/previews/uiux-intto.png',
    caseStudy: {
      problem:
        'INTTO covers a lot of ground — technology transfer, IP management, industry partnerships, and startup support — and needed a design that organised everything clearly without overwhelming visitors.',
      solution:
        'Designed a structured website UI in Figma using INTTO\'s green brand colour, covering their mission, a services grid, key statistics, a startup showcase, and a newsletter sign-up. Focused on clarity over decoration.',
      tools: ['Figma', 'UI Design', 'Information Architecture', 'Brand Direction'],
      results:
        'A design that makes it easier for any visitor — researcher, company, or student — to quickly understand what INTTO does and where to go from there.',
    },
  },
  {
    id: '18',
    title: 'Taraki',
    filter: 'UI/UX Design' as Category,
    category: 'UI/UX Design · Figma · Web Design',
    description:
      'A website UI design for Taraki — a knowledge and empowerment foundation — bringing their multiple programmes together under one clear, consistent layout.',
    outcomes: ['Multiple programmes organised clearly', 'Consistent brand throughout', 'Figma design file'],
    accent: 'from-violet-500/10 to-purple-500/5',
    icon: Palette,
    iconColor: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10',
    preview: '/previews/uiux-taraki.png',
    caseStudy: {
      problem:
        'Taraki runs several distinct programmes and needed a design that tied them all together — rather than having each section feel like a different website.',
      solution:
        'Designed a full website UI in Figma covering Taraki\'s mission, team, and each programme with dedicated sections. Used a consistent visual language — dark tones with warm amber accents — across cards, photos, a FAQ accordion, and the footer.',
      tools: ['Figma', 'UI Design', 'Information Architecture', 'Brand Direction'],
      results:
        'A design that makes Taraki\'s full range of work easy to navigate and understand — without losing the sense that it all belongs to one organisation.',
    },
  },
  {
    id: '04',
    title: 'Google Sheets → Invoice PDF Pipeline',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · Google Sheets',
    description:
      'An n8n workflow that turns a completed Google Sheet row into a formatted invoice PDF — generated, saved to Drive, and emailed to the client automatically.',
    outcomes: ['Invoice generated from spreadsheet data', 'PDF saved to Google Drive', 'Email sent automatically'],
    accent: 'from-emerald-500/10 to-teal-500/5',
    icon: Zap,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    preview: '/previews/n8n-content-pipeline-2.png',
    caseStudy: {
      problem:
        'Manually creating invoices from a spreadsheet — copying details into a template, formatting line items, exporting to PDF, then emailing each one — adds up to a lot of time that could go toward actual work.',
      solution:
        'Built an n8n workflow that watches Google Sheets for new rows marked as ready. It pulls the project details, generates a formatted PDF invoice, saves it to Google Drive, and sends it to the client via Gmail.',
      tools: ['n8n', 'Google Sheets', 'PDF Generation', 'Google Drive', 'Gmail'],
      results:
        'Fill in the sheet row and the invoice takes care of itself. Less admin time, fewer formatting mistakes, and no follow-up needed to chase whether the email went out.',
    },
  },
  {
    id: '05',
    title: 'Calvin Klein — Jennie Campaign',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'An email design concept for the Jennie x Calvin Klein campaign — clean and minimal, letting the photography lead with a single focused CTA.',
    outcomes: ['Minimal editorial layout', 'Campaign imagery as focal point', 'Figma design concept'],
    accent: 'from-neutral-500/10 to-stone-500/5',
    icon: Mail,
    iconColor: 'text-neutral-500 bg-neutral-50 dark:bg-neutral-500/10',
    preview: '/previews/email-calvinklein.png',
    caseStudy: {
      problem:
        'Luxury brand emails need to feel as refined as the brand itself — a busy or template-looking layout would be off-brand for something like a Calvin Klein campaign.',
      solution:
        'Designed a minimalist email concept in Figma with a full-width campaign hero, clean copy ("Timeless. Classic. Indispensable."), a secondary image grid for the collection, and a single Shop Now CTA. Kept it restrained and image-led throughout.',
      tools: ['Figma', 'Email Design', 'Brand Guidelines', 'Typography'],
      results:
        'A design concept that feels consistent with Calvin Klein\'s visual identity — nothing extra, just the brand, the campaign, and one clear action.',
    },
  },
  {
    id: '19',
    title: 'Gymshark — History of Onyx',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'An email design concept for Gymshark\'s Onyx collection re-launch — dark, story-driven, with product feature callouts before the CTA.',
    outcomes: ['Dark high-energy layout', 'Product features highlighted', 'Figma design concept'],
    accent: 'from-zinc-500/10 to-neutral-500/5',
    icon: Mail,
    iconColor: 'text-zinc-600 bg-zinc-50 dark:bg-zinc-500/10',
    preview: '/previews/email-gymshark.png',
    caseStudy: {
      problem:
        'A collection re-launch email should do more than just show products — it helps to remind the audience why they cared about it in the first place.',
      solution:
        'Designed a dark email concept in Figma with a cinematic hero, the collection\'s origin story, and four feature callouts (compression, physique design, lift, silhouettes). Ended with a Shop All CTA and a clean footer.',
      tools: ['Figma', 'Email Design', 'Brand Guidelines', 'Dark Mode Design'],
      results:
        'A concept that builds context around the product before asking for the click — closer to editorial content than a standard promo email.',
    },
  },
  {
    id: '20',
    title: 'Louis Vuitton — House Ambassadors',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      'An email design concept for Louis Vuitton\'s House Ambassadors campaign — ultra-minimal, one image, one action, nothing competing for attention.',
    outcomes: ['Ultra-minimal luxury layout', 'Single clear CTA', 'Figma design concept'],
    accent: 'from-amber-500/10 to-yellow-500/5',
    icon: Mail,
    iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
    preview: '/previews/email-lv.png',
    caseStudy: {
      problem:
        'Luxury brand emails communicate exclusivity partly through restraint — too much copy or too many elements and the whole thing falls apart.',
      solution:
        'Designed a two-part email in Figma: a hero featuring all three ambassadors with a single Discover More CTA, then a clean dark footer with the LV monogram, category navigation, and account links. Nothing extra.',
      tools: ['Figma', 'Email Design', 'Luxury Brand Guidelines', 'Minimalist Layout'],
      results:
        'A concept that respects the brand\'s restraint — one strong image, one action, and nothing else competing for the reader\'s attention.',
    },
  },
  {
    id: '21',
    title: "McDonald's — The Legends Are Back",
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Campaign',
    description:
      "An email design concept for McDonald's 40th anniversary re-launch — warm, celebratory, with each returning menu item getting its own spot in the layout.",
    outcomes: ['Nostalgia-driven campaign layout', 'Each product given its own moment', 'Figma design concept'],
    accent: 'from-yellow-500/10 to-orange-500/5',
    icon: Mail,
    iconColor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10',
    preview: '/previews/email-mcdonald.png',
    caseStudy: {
      problem:
        "A 40th anniversary promotion needs to feel like a proper celebration — not just another coupon email. The returning classics each have their own story worth telling.",
      solution:
        "Designed a warm yellow email in Figma with a hero showing all four returning burgers, a bold \"The Legends are back\" headline, and nostalgia-led copy. Below, a clean product grid gives each item its own Learn More CTA, followed by an app download prompt and the anniversary mark.",
      tools: ['Figma', 'Email Design', 'Campaign Layout', 'Brand Guidelines'],
      results:
        'A concept that balances celebration with conversion — giving each product a moment while keeping the layout focused and easy to act on.',
    },
  },
  {
    id: '22',
    title: 'Samsung — Galaxy Z Fold7',
    filter: 'Email Design' as Category,
    category: 'Email Design · Figma · Product Launch',
    description:
      'An email design concept for the Samsung Galaxy Z Fold7 launch — feature-led layout that walks through the specs before asking for the click.',
    outcomes: ['Feature-led product layout', 'Tech-forward visual tone', 'Figma design concept'],
    accent: 'from-blue-500/10 to-cyan-500/5',
    icon: Mail,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
    preview: '/previews/email-samsung.png',
    caseStudy: {
      problem:
        'A premium device launch email needs to earn the click — showing the phone once and hitting a button isn\'t enough for something at this price point.',
      solution:
        'Designed a feature-led email in Figma with a confident hero, four key spec callouts with supporting imagery (Fold design, camera, processor, battery), and trade-in / purchase CTAs at the end. Each section adds a reason to upgrade before asking for the action.',
      tools: ['Figma', 'Email Design', 'Product Marketing Layout', 'Tech Brand Guidelines'],
      results:
        'A concept that walks the reader through the product\'s value step by step — so by the time they reach the CTA, they\'ve already built up a reason to click.',
    },
  },
  {
    id: '06',
    title: "Daniel's Coffee",
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      "A cafe website for Daniel's Coffee — highlights the menu, brand story, and contact details with a warm design that fits the vibe.",
    outcomes: ['Live on Vercel', 'Warm brand design', 'Mobile responsive'],
    accent: 'from-amber-500/10 to-yellow-500/5',
    icon: Globe,
    iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
    link: 'https://daniels-coffee-ten.vercel.app/',
    caseStudy: {
      problem:
        "Daniel's Coffee had no website — customers had no easy way to find the menu, location, or opening hours online.",
      solution:
        "Built a cafe website with a menu section, brand story, and contact info. Used warm tones and food-forward visuals to match the cafe's personality.",
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        "Live on Vercel — gives Daniel's Coffee a simple, welcoming home online that customers can actually find and use.",
    },
  },
  {
    id: '08',
    title: 'Lead Capture → CRM → Email Follow-up',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · HubSpot',
    description:
      'An n8n automation that captures leads from any source, logs them to HubSpot, and sends a follow-up email — without anyone doing it manually.',
    outcomes: ['Leads logged to CRM on arrival', 'Follow-up email sent automatically', 'Team notified on Slack'],
    accent: 'from-orange-500/10 to-red-500/5',
    icon: Zap,
    iconColor: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10',
    preview: '/previews/n8n-complex-workflow.png',
    caseStudy: {
      problem:
        'Manually copying leads from different sources — forms, ads, DMs — into a CRM and then sending follow-ups one by one takes time and things often get missed, especially outside office hours.',
      solution:
        'Built an n8n workflow with a webhook that receives leads from any source. It creates a contact in HubSpot with the right tags, triggers a follow-up email based on the lead source, and sends a Slack notification to the team.',
      tools: ['n8n', 'Webhook', 'HubSpot', 'Gmail', 'Slack'],
      results:
        'Leads land in HubSpot and get a follow-up email right away — no manual copy-paste, no delays from forgetting to check a form.',
    },
  },
  {
    id: '09',
    title: 'Barbershop Booking Assistant',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · n8n · AI Voice',
    description:
      'An AI voice assistant that handles inbound booking calls for a barbershop — checks availability, confirms the slot, logs the appointment, and sends an SMS reminder.',
    outcomes: ['Calls handled outside business hours', 'Bookings logged to Airtable', 'SMS reminders sent automatically'],
    accent: 'from-green-500/10 to-teal-500/5',
    icon: Zap,
    iconColor: 'text-green-600 bg-green-50 dark:bg-green-500/10',
    preview: '/previews/n8n-booking-onboarding.png',
    caseStudy: {
      problem:
        'A barbershop was missing calls during busy hours and after closing — potential bookings that went nowhere because no one was available to pick up the phone.',
      solution:
        'Built a voice AI integration using Bland.ai/Vapi connected to n8n. The assistant answers inbound calls, collects the preferred date, time, and barber, checks Google Calendar, confirms the slot with the caller, logs the booking in Airtable, and triggers a Twilio SMS reminder.',
      tools: ['n8n', 'Bland.ai / Vapi', 'Google Calendar', 'Airtable', 'Twilio SMS'],
      results:
        'The barbershop can now take bookings outside business hours without anyone picking up the phone — missed calls became a lot less common.',
    },
  },
  {
    id: '10',
    title: 'AI Lead Intake & Auto-Response System',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · AI by Zapier',
    description:
      'A Zapier automation that qualifies incoming inquiry forms and sends a personalised reply to high-intent leads — without waiting for someone to manually respond.',
    outcomes: ['Replies sent within minutes', 'Leads sorted by priority', 'All submissions logged automatically'],
    accent: 'from-yellow-500/10 to-amber-500/5',
    icon: Zap,
    iconColor: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10',
    preview: '/previews/zapier-appointment.png',
    caseStudy: {
      problem:
        'Reading every inquiry form and writing individual replies takes real time — and the longer someone waits to hear back, the more likely they\'ve already moved on.',
      solution:
        'Built a Zapier workflow that triggers on every form submission. It checks key fields to assess intent, sends an AI-written reply to qualified leads via Gmail, logs everything to a Google Sheet, and sends a Slack alert when a strong lead comes in.',
      tools: ['Zapier', 'Google Forms', 'AI by Zapier', 'Gmail', 'Google Sheets', 'Slack'],
      results:
        'Qualified leads get a personalised reply quickly, and the team only needs to step in for the ones worth their attention.',
    },
  },
  {
    id: '12',
    title: 'Asana CRM Automation',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · Asana',
    description:
      'Five Zapier automations that keep an Asana sales pipeline running — new leads become tasks automatically, follow-ups trigger on stage changes, and closed deals kick off the next steps.',
    outcomes: ['New leads added to Asana automatically', 'Follow-ups triggered by stage changes', 'Closed deals logged without manual input'],
    accent: 'from-purple-500/10 to-violet-500/5',
    icon: Zap,
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    preview: '/previews/zapier-crm-pipeline.png',
    caseStudy: {
      problem:
        'A small sales team was spending a chunk of their day on CRM upkeep — manually creating tasks for leads, sending follow-ups, and logging closed deals. The board was only accurate when someone remembered to update it.',
      solution:
        'Built five Zapier automations: auto-create Asana tasks for new leads, trigger email sequences on stage changes (with filters to stop if the lead replies), generate onboarding tasks when a deal is approved, log closed deals to Google Drive, and send follow-up nudges after no response.',
      tools: ['Zapier', 'Asana', 'Gmail', 'Google Drive', 'Delay & Filter by Zapier'],
      results:
        'The Asana board stays current without manual updates, follow-ups go out on time, and closing a deal automatically kicks off what comes next.',
    },
  },
  {
    id: '13',
    title: 'Lead Qualification Process',
    filter: 'AI Automations' as Category,
    category: 'AI Automations · Zapier · AI by Zapier',
    description:
      'A Zapier workflow that scores incoming leads by company size, source, and intent — routing high-priority ones to the sales team and putting lower-priority leads into a nurture sequence.',
    outcomes: ['High-priority leads flagged quickly', 'Lower-priority leads nurtured automatically', 'All leads tracked in Google Sheets'],
    accent: 'from-sky-500/10 to-blue-500/5',
    icon: Zap,
    iconColor: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10',
    preview: '/previews/zapier-form-routing.png',
    caseStudy: {
      problem:
        'When every lead looks the same in the inbox, sales teams end up spending time on ones that aren\'t a fit — while the good ones wait.',
      solution:
        'Built a Zapier qualification flow that evaluates form submissions using available signals (company size, source, message intent), routes them using Filter and Path, sends high-priority leads a personalised email and a Slack alert, puts lower-priority ones into a nurture sequence, and logs everything to Google Sheets.',
      tools: ['Zapier', 'Google Sheets', 'AI by Zapier', 'Slack', 'Gmail', 'Filter & Path by Zapier'],
      results:
        'The sales team gets flagged on the leads worth pursuing, and the lower-priority ones don\'t just get ignored — they\'re followed up with automatically.',
    },
  },
  {
    id: '14',
    title: 'Gawa SMMA',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'An agency website for Gawa SMMA — straightforward layout that explains their social media marketing services and makes it easy for potential clients to get in touch.',
    outcomes: ['Live on Vercel', 'Services clearly laid out', 'Mobile responsive'],
    accent: 'from-rose-500/10 to-pink-500/5',
    icon: Globe,
    iconColor: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
    link: 'https://gawa-smma.vercel.app/',
    caseStudy: {
      problem:
        'Gawa SMMA needed a website so potential clients could understand what they do and how to work with them — without having to DM first to ask.',
      solution:
        'Built a clean agency site covering their services, a bit about their approach, and a contact section. Kept it simple and direct.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Live on Vercel — gives Gawa SMMA a proper place to send potential clients instead of relying on social media alone.',
    },
  },
  {
    id: '11',
    title: 'Riza Gail — Personal Portfolio',
    filter: 'Website Creation' as Category,
    category: 'Website Creation · React · Tailwind',
    description:
      'A personal portfolio for Riza Gail — a clean, simple site that puts her skills, work, and contact info in one place she can share.',
    outcomes: ['Live on Vercel', 'Work displayed clearly', 'Mobile responsive'],
    accent: 'from-cyan-500/10 to-sky-500/5',
    icon: Globe,
    iconColor: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-500/10',
    link: 'https://rizagail.vercel.app/',
    caseStudy: {
      problem:
        'Riza needed somewhere to send potential employers and clients — a place to show her work without relying on a PDF resume or a long LinkedIn scroll.',
      solution:
        'Built a personal portfolio with an about section, skills overview, project highlights, and contact details. Kept it clean and to the point.',
      tools: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      results:
        'Live on Vercel — Riza now has a professional link she can share with anyone who wants to know more about her work.',
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
                <TiltCard key={p.id} strength={8}>
                <motion.div
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
                </TiltCard>
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
