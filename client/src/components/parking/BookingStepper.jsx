import { motion } from 'framer-motion'
import { MapPin, Clock, CreditCard, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Select Slot', icon: MapPin },
  { id: 2, name: 'Choose Time', icon: Clock },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Confirmed', icon: CheckCircle2 },
]

export function BookingStepper({ currentStep, onStepClick }) {
  return (
    <div className="w-full">
      <div className="relative h-1 bg-muted rounded-full mb-8 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          const isClickable = isCompleted && onStepClick
          return (
            <motion.button
              key={step.id}
              className={cn('flex flex-col items-center gap-2 text-center relative', isClickable ? 'cursor-pointer' : 'cursor-default')}
              onClick={() => isClickable && onStepClick(step.id)}
              whileHover={isClickable ? { scale: 1.05 } : undefined}
              whileTap={isClickable ? { scale: 0.98 } : undefined}
            >
              <motion.div
                className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden',
                  isActive && 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
                  isCompleted && 'bg-primary text-primary-foreground',
                  !isActive && !isCompleted && 'bg-muted text-muted-foreground border-2 border-border'
                )}
                initial={false}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
              <span className={cn('text-xs font-medium hidden sm:block transition-colors', (isActive || isCompleted) ? 'text-foreground' : 'text-muted-foreground')}>
                {step.name}
              </span>
              <span className={cn('text-xs font-medium sm:hidden', (isActive || isCompleted) ? 'text-foreground' : 'text-muted-foreground')}>
                {step.id}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export function SlotStatus({ available, total, showLabel = true, size = 'md' }) {
  const percentage = (available / total) * 100
  const getStatus = () => {
    if (available === 0) return { label: 'Full', color: 'bg-red-500', textColor: 'text-red-600' }
    if (percentage < 25) return { label: 'Almost Full', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
    if (percentage < 50) return { label: 'Filling Up', color: 'bg-orange-500', textColor: 'text-orange-600' }
    return { label: 'Available', color: 'bg-green-500', textColor: 'text-green-600' }
  }
  const status = getStatus()
  const sizeClasses = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className={cn('font-medium', status.textColor)}>{status.label}</span>
          <span className="text-muted-foreground">{available}/{total} slots</span>
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', status.color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function SlotGrid({ rows, cols, bookedSlots = [], selectedSlot, onSlotSelect }) {
  const slots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const letter = String.fromCharCode(65 + r)
      slots.push({ id: `${letter}-${String(c + 1).padStart(2, '0')}`, row: r, col: c })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-primary" /><span>Selected</span></div>
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-muted border-2 border-border" /><span>Available</span></div>
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-muted-foreground/30" /><span>Booked</span></div>
      </div>
      <div className="grid gap-2 p-4 bg-muted/30 rounded-xl border-2 border-border" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {slots.map((slot, index) => {
          const isBooked = bookedSlots.includes(slot.id)
          const isSelected = selectedSlot === slot.id
          return (
            <motion.button
              key={slot.id}
              className={cn(
                'aspect-[2/3] rounded-lg flex items-center justify-center text-xs font-medium transition-all',
                isBooked && 'bg-muted-foreground/30 text-muted-foreground cursor-not-allowed',
                !isBooked && !isSelected && 'bg-muted border-2 border-border hover:border-primary hover:bg-primary/10',
                isSelected && 'bg-primary text-primary-foreground shadow-lg'
              )}
              disabled={isBooked}
              onClick={() => !isBooked && onSlotSelect?.(slot.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              whileHover={!isBooked ? { scale: 1.05 } : undefined}
              whileTap={!isBooked ? { scale: 0.95 } : undefined}
            >
              {slot.id}
            </motion.button>
          )
        })}
      </div>
      <div className="flex justify-center">
        <div className="px-4 py-1 bg-muted rounded-full text-xs text-muted-foreground">Entrance</div>
      </div>
    </div>
  )
}
