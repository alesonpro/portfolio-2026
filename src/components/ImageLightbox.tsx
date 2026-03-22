import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  src: string
  alt: string
  open: boolean
  onClose: () => void
}

export default function ImageLightbox({ src, alt, open, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/90 overflow-y-auto"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-[61] w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>

          {/* Image — stop click propagation so clicking image doesn't close */}
          <div className="min-h-full flex items-start justify-center py-12 px-4">
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
