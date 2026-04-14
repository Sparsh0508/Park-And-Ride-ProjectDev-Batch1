import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Navigation, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageWrapper, PageHeader, StatCard, StatCardSkeleton, ParkingCardSkeleton, MapSkeleton } from '@/components/shared/index'
import { MotionButton } from '@/components/shared/MotionButton'
import { ParkingCard } from '@/components/parking/ParkingCard'
import { MapView } from '@/components/parking/MapView'
import { staggerContainer, staggerItem, cardHover } from '@/lib/motion'
import { parkingSlots } from '@/lib/data'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const { user } = useAuth()
  const nearbySlots = parkingSlots.slice(0, 4)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <PageHeader title="Dashboard" description={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}! Here's your overview`} />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
        </div>
      ) : (
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={staggerItem}><StatCard title="Available Slots" value={45} subtitle="Near your location" icon={MapPin} variant="primary" trend={{ value: 12, isPositive: true }} /></motion.div>
          <motion.div variants={staggerItem}><StatCard title="Active Bookings" value={2} subtitle="Parking & Rides" icon={CheckCircle2} variant="secondary" /></motion.div>
          <motion.div variants={staggerItem}><StatCard title="This Month" value={12} subtitle="Total bookings" icon={TrendingUp} variant="accent" trend={{ value: 8, isPositive: true }} /></motion.div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {isLoading ? <MapSkeleton /> : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Nearby Locations</h2>
            </div>
            <MapView slots={nearbySlots} selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} aspectRatio="wide" />
          </div>
        )}
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Nearby Parking</h2>
          <MotionButton variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/dashboard/parking">View All <ArrowRight className="w-4 h-4" /></Link>
          </MotionButton>
        </div>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ParkingCardSkeleton /><ParkingCardSkeleton /><ParkingCardSkeleton /><ParkingCardSkeleton />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearbySlots.map((slot, index) => <ParkingCard key={slot.id} slot={slot} index={index} />)}
          </div>
        )}
      </div>

      <motion.div whileHover={cardHover}>
        <Card className="border-2 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-1">Need a ride?</h3>
                <p className="text-sm text-muted-foreground">Book cabs, shuttles, or e-rickshaws instantly</p>
              </div>
              <MotionButton className="gap-2" asChild>
                <Link to="/dashboard/rides">Book Ride <ArrowRight className="w-4 h-4" /></Link>
              </MotionButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageWrapper>
  )
}
