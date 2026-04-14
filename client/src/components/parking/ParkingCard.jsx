import { motion } from 'framer-motion'
import { Star, Navigation, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionButton } from '@/components/shared/MotionButton'
import { cardHover } from '@/lib/motion'
import { Link } from 'react-router-dom'

function getAvailabilityStatus(available, total) {
  const pct = (available / total) * 100
  if (available === 0) return { label: 'Full', variant: 'destructive' }
  if (pct < 25) return { label: 'Almost Full', variant: 'secondary' }
  return { label: 'Available', variant: 'default' }
}

export function ParkingCard({ slot, index = 0 }) {
  const status = getAvailabilityStatus(slot.available, slot.total)
  const isAvailable = slot.available > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={isAvailable ? cardHover : undefined}
    >
      <Card className={`border-2 transition-all duration-300 h-full ${isAvailable ? 'hover:border-primary/50 hover:shadow-xl' : 'opacity-75'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight mb-1 truncate">{slot.name}</CardTitle>
              <p className="text-sm text-muted-foreground truncate">{slot.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 pt-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{slot.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({Math.floor(slot.rating * 20)} reviews)</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Navigation className="w-3.5 h-3.5" />
              {slot.distance}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              24/7
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">₹{slot.price}</span>
              <span className="text-sm text-muted-foreground">/hr</span>
            </div>
            <Badge variant={status.variant} className="font-medium">
              {slot.available}/{slot.total} slots
            </Badge>
          </div>
          {isAvailable ? (
            <MotionButton className="w-full" asChild>
              <Link to={`/dashboard/parking/book?id=${slot.id}`}>Book Now</Link>
            </MotionButton>
          ) : (
            <MotionButton className="w-full" disabled>
              Fully Booked
            </MotionButton>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
