import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, QrCode, Navigation, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MotionButton } from '@/components/shared/MotionButton'
import { cardHover, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'

const statusStyles = {
  active: { badge: 'bg-primary text-primary-foreground', border: 'border-primary/50', glow: 'shadow-primary/10' },
  upcoming: { badge: 'bg-secondary text-secondary-foreground', border: 'border-secondary/50', glow: 'shadow-secondary/10' },
  completed: { badge: 'bg-muted text-muted-foreground', border: 'border-muted', glow: '' },
  cancelled: { badge: 'bg-destructive/10 text-destructive', border: 'border-destructive/30', glow: '' },
}

export function BookingCard({ booking, onViewDetails, onCancel, index = 0 }) {
  const styles = statusStyles[booking?.status] || statusStyles.completed

  if (!booking) return null

  return (
    <motion.div
      variants={staggerItem}
      initial="initial"
      animate="animate"
    >
      <motion.div whileHover={cardHover}>
        <Card className={cn('border-2 overflow-hidden transition-all shadow-lg', styles.border, styles.glow)}>
          <CardContent className="p-0">
            <div className="p-4 pb-3 border-b bg-gradient-to-r from-muted/50 to-transparent">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn(styles.badge, 'capitalize text-xs')}>{booking.status}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">{booking.id}</span>
                  </div>
                  <h3 className="font-semibold text-lg truncate">{booking.location}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mr-2 -mt-1"><MoreVertical className="w-4 h-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Get Directions</DropdownMenuItem>
                    {(booking.status === 'upcoming' || booking.status === 'active') && (
                      <DropdownMenuItem onClick={onCancel} className="text-destructive focus:text-destructive">Cancel Booking</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Slot / Type</p>
                  <p className="font-semibold">{booking.slot}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Time</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-xl font-bold text-primary">₹{booking.amount}</p>
                </div>
                {booking.status === 'active' && (
                  <MotionButton size="sm" className="gap-1.5"><QrCode className="w-4 h-4" />Show QR</MotionButton>
                )}
                {booking.status === 'upcoming' && (
                  <MotionButton variant="outline" size="sm" className="gap-1.5"><Navigation className="w-4 h-4" />Navigate</MotionButton>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
