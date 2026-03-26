import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, CheckCircle, Wrench, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ImageLightbox from './ImageLightbox'

interface CaseStudy {
  problem: string
  solution: string
  tools: string[]
  results: string
}

interface Project {
  id: string
  title: string
  category: string
  description: string
  outcomes: string[]
  accent: string
  icon: React.ElementType
  iconColor: string
  link?: string
  preview?: string
  caseStudy: CaseStudy
}

interface Props {
  project: Project | null
  onClose: () => void
}

export default function CaseStudyModal({ project, onClose }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open (also pause Lenis)
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new Event('lenis:stop'))
    } else {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('lenis:start'))
    }
    return () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('lenis:start'))
    }
  }, [project])

  // Reset lightbox when drawer closes or project changes
  useEffect(() => {
    setLightboxOpen(false)
  }, [project])

  return (
    <>
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full z-50 w-full max-w-lg bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header strip */}
            <div className={cn('h-28 bg-gradient-to-br relative flex items-center px-6 gap-4 shrink-0', project.accent)}>
              {/* Icon */}
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', project.iconColor)}>
                <project.icon size={18} strokeWidth={1.75} />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground block">
                  {project.category}
                </span>
                <h2 className="font-heading font-bold text-lg text-foreground mt-0.5 leading-snug truncate">
                  {project.title}
                </h2>
              </div>

              {/* Ghost ID */}
              <span className="absolute right-16 bottom-1 font-heading font-bold text-6xl leading-none text-foreground/[0.06] select-none">
                {project.id}
              </span>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
                aria-label="Close"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 flex flex-col gap-6" data-lenis-prevent>

              {/* Preview — iframe for websites, image for everything else */}
              {project.link ? (
                <div className="w-full rounded-lg overflow-hidden border border-border pointer-events-none" style={{ height: '220px' }}>
                  <iframe
                    src={project.link}
                    title={`${project.title} preview`}
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
              ) : project.preview ? (
                <div className="flex flex-col gap-2">
                  <img
                    src={project.preview}
                    alt={`${project.title} preview`}
                    onClick={() => setLightboxOpen(true)}
                    className="w-full rounded-lg border border-border object-cover object-top max-h-64 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors group"
                  >
                    <Maximize2 size={11} strokeWidth={2} />
                    {project.category.startsWith('AI Automations') ? 'View Automation' : 'View Full Design'}
                  </button>
                </div>
              ) : null}

              {/* Visit Website — only for projects with a link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/40 text-sm font-semibold text-accent hover:bg-accent/10 transition-colors group"
                >
                  Visit Website
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

              {/* Problem */}
              <section>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">The Problem</h3>
                <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.problem}</p>
              </section>

              {/* Solution */}
              <section>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">The Solution</h3>
                <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.solution}</p>
              </section>

              {/* Tools */}
              <section>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <Wrench size={12} strokeWidth={2} />
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>

              {/* Results */}
              <section>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Results</h3>
                <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.results}</p>
              </section>

              {/* Key outcomes */}
              <section className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Key Outcomes</h3>
                <ul className="flex flex-col gap-2.5">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle size={13} className="text-accent shrink-0" strokeWidth={2} />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {project?.preview && (
      <ImageLightbox
        src={project.preview}
        alt={project.title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    )}
    </>
  )
}
