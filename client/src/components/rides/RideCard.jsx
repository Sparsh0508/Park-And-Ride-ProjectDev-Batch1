import { motion } from 'framer-motion'
import { Car, Users, Zap, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MotionButton } from '@/components/shared/MotionButton'
import { cardHover } from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap = { Car, Users, Zap }
const colorMap = {
  cab: 'from-primary to-primary/60',
  shuttle: 'from-secondary to-secondary/60',
  erickshaw: 'from-accent to-accent/60',
}

export function RideCard({ ride, isSelected, onSelect, index = 0 }) {
  const Icon = iconMap[ride?.iconName] || Car
  const gradientColor = colorMap[ride?.id] || colorMap.cab

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={cardHover}>
      <Card
        className={cn('border-2 cursor-pointer transition-all duration-300 h-full', isSelected ? 'border-primary ring-2 ring-primary/20 shadow-lg' : 'hover:border-primary/50 hover:shadow-xl')}
        onClick={onSelect}
      >
        <CardContent className="p-6">
          <motion.div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg', gradientColor)} whileHover={{ scale: 1.1, rotate: -5 }}>
            <Icon className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <h3 className="font-bold text-xl mb-1">{ride.name}</h3>
          <p className="text-sm text-muted-foreground mb-5">{ride.description}</p>
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" />Arrives in</span>
              <span className="font-semibold">{ride.eta}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5"><Users className="w-4 h-4" />Capacity</span>
              <span className="font-semibold">{ride.capacity} seats</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold">₹{ride.price}</span>
              <span className="text-sm text-muted-foreground ml-1">est.</span>
            </div>
            <MotionButton size="sm" className="gap-1">
              Select <ArrowRight className="w-4 h-4" />
            </MotionButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
