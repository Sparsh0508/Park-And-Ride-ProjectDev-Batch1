import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, Phone, MessageSquare, X, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionButton } from '@/components/shared/MotionButton'
import { Progress } from '@/components/ui/progress'

export function RideTracking({ rideType, driver, eta, onCancel }) {
  const [progress, setProgress] = useState(0)
  const [currentEta, setCurrentEta] = useState(eta)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 2
      })
      setCurrentEta(prev => Math.max(0, prev - 0.1))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <Card className="border-2 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Car className="w-5 h-5 text-primary" />
              </motion.div>
              Live Tracking
            </CardTitle>
            <Badge variant="secondary" className="animate-pulse">{rideType}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="trackingGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#trackingGrid)" />
              </svg>
            </div>
            <motion.div className="absolute top-1/2 left-0 h-1 bg-primary/30 rounded" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            <motion.div className="absolute top-1/2 left-0 h-1 bg-primary rounded" initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 90)}%` }} transition={{ duration: 0.5 }} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg"
              animate={{ left: `${Math.min(progress, 85)}%` }}
              transition={{ duration: 0.5 }}
            >
              <Car className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Badge className="text-lg px-4 py-2 bg-card text-foreground border-2 shadow-lg">
                <motion.span key={Math.round(currentEta)} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  Arriving in {Math.round(currentEta)} min
                </motion.span>
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Driver en route</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
            <Avatar className="w-14 h-14 border-2 border-primary/20">
              <AvatarImage src={driver.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {driver.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-lg">{driver.name}</p>
              <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
              <p className="text-sm font-medium">{driver.plate}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-500">
                <span className="text-lg font-bold">{driver.rating}</span>
                <span>★</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MotionButton variant="outline" className="gap-2"><Phone className="w-4 h-4" /><span className="hidden sm:inline">Call</span></MotionButton>
            <MotionButton variant="outline" className="gap-2"><MessageSquare className="w-4 h-4" /><span className="hidden sm:inline">Message</span></MotionButton>
            <MotionButton variant="destructive" className="gap-2" onClick={onCancel}><X className="w-4 h-4" /><span className="hidden sm:inline">Cancel</span></MotionButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
