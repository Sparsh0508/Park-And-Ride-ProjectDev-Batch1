import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { buttonTap, buttonHover } from '@/lib/motion'
import { cn } from '@/lib/utils'

const MotionButton = forwardRef(({ className, children, loading, disabled, asChild, ...props }, ref) => (
  <motion.div
    whileHover={(disabled || loading) ? undefined : buttonHover}
    whileTap={(disabled || loading) ? undefined : buttonTap}
    style={{ display: 'inline-flex' }}
  >
    <Button
      ref={ref}
      className={cn(className)}
      disabled={disabled || loading}
      asChild={asChild}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : children}
    </Button>
  </motion.div>
))
MotionButton.displayName = 'MotionButton'

export { MotionButton }
