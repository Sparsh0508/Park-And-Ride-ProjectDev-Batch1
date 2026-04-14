import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Locate, ZoomIn, ZoomOut, Layers } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const markerPositions = [
  { top: '25%', left: '30%' },
  { top: '45%', left: '55%' },
  { top: '35%', left: '70%' },
  { top: '60%', left: '35%' },
  { top: '70%', left: '60%' },
  { top: '20%', left: '50%' },
]

function MapMarker({ slot, position, isSelected, onClick, index }) {
  const isAvailable = slot.available > 0
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
      className="absolute z-10 transform -translate-x-1/2 -translate-y-full cursor-pointer group"
      style={{ top: position.top, left: position.left }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={cn('relative flex flex-col items-center', isSelected && 'z-20')}>
        <motion.div
          className={cn(
            'px-2 py-1 rounded-lg text-xs font-bold shadow-lg mb-1 transition-colors',
            isSelected ? 'bg-primary text-primary-foreground' : isAvailable ? 'bg-card text-foreground border-2 border-border group-hover:border-primary' : 'bg-muted text-muted-foreground'
          )}
          whileHover={{ y: -2 }}
        >
          ₹{slot.price}/hr
        </motion.div>
        <motion.div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors',
            isSelected ? 'bg-primary' : isAvailable ? 'bg-secondary group-hover:bg-primary' : 'bg-muted'
          )}
          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
        >
          <MapPin className={cn('w-4 h-4', isSelected || isAvailable ? 'text-primary-foreground' : 'text-muted-foreground')} />
        </motion.div>
        <div className={cn('w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent', isSelected ? 'border-t-primary' : isAvailable ? 'border-t-secondary group-hover:border-t-primary' : 'border-t-muted')} />
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-card rounded-xl shadow-xl border-2 border-border p-3 z-30"
          >
            <p className="font-semibold text-sm truncate">{slot.name}</p>
            <p className="text-xs text-muted-foreground truncate mb-2">{slot.address}</p>
            <div className="flex items-center justify-between">
              <Badge variant={slot.available > 0 ? 'default' : 'destructive'} className="text-xs">{slot.available} slots</Badge>
              <span className="text-xs text-muted-foreground">{slot.distance}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function MapView({ slots = [], selectedSlot = null, onSlotSelect, className, aspectRatio = 'wide' }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const aspectClasses = { video: 'aspect-video', wide: 'aspect-[21/9]', square: 'aspect-square' }

  return (
    <Card className={cn('border-2 overflow-hidden', className)}>
      <CardContent className="p-0 relative">
        <div className={cn('bg-gradient-to-br from-muted via-muted/50 to-muted relative overflow-hidden', aspectClasses[aspectRatio])}>
          <AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-muted flex items-center justify-center z-20">
                <div className="text-center space-y-3">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
            </svg>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-muted-foreground/10 transform -translate-y-1/2" />
            <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-muted-foreground/10" />
            <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-muted-foreground/10" />
          </div>

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-blue-500 rounded-full" />
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            </div>
          </motion.div>

          {!isLoading && slots.map((slot, index) => (
            <MapMarker
              key={slot.id}
              slot={slot}
              position={markerPositions[index % markerPositions.length]}
              isSelected={selectedSlot?.id === slot.id}
              onClick={() => onSlotSelect?.(slot)}
              index={index}
            />
          ))}

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg"><ZoomIn className="w-4 h-4" /></Button>
            <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg"><ZoomOut className="w-4 h-4" /></Button>
            <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg"><Layers className="w-4 h-4" /></Button>
          </div>

          <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 gap-2 shadow-lg">
            <Locate className="w-4 h-4" />
            <span className="hidden sm:inline">My Location</span>
          </Button>

          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-secondary" /><span>Available</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-muted" /><span>Full</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500" /><span>You</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
