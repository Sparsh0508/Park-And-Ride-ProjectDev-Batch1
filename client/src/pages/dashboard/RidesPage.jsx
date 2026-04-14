import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Navigation, Zap, TrendingUp, Shield, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { PageWrapper, PageHeader } from '@/components/shared/index'
import { MotionButton } from '@/components/shared/MotionButton'
import { RideCard } from '@/components/rides/RideCard'
import { RideTracking } from '@/components/rides/RideTracking'
import { useNotification } from '@/components/shared/Notification'
import { rideTypes } from '@/lib/data'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

const whyChooseFeatures = [
  { icon: Zap, title: 'Fast & Reliable', description: 'Quick pickups and on-time arrivals guaranteed', color: 'bg-primary/10 text-primary' },
  { icon: TrendingUp, title: 'Best Prices', description: 'Competitive rates for all ride types', color: 'bg-secondary/10 text-secondary' },
  { icon: Shield, title: 'Verified Drivers', description: 'All drivers are background-checked', color: 'bg-accent/10 text-accent' },
]

export default function RidesPage() {
  const { addNotification } = useNotification()
  const [selectedRide, setSelectedRide] = useState(null)
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropLocation, setDropLocation] = useState('')
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [isBooking, setIsBooking] = useState(false)

  const handleSelectRide = (ride) => { setSelectedRide(ride); setIsBookingDialogOpen(true) }

  const handleConfirmBooking = async () => {
    if (!pickupLocation || !dropLocation) {
      addNotification({ type: 'warning', title: 'Missing locations', message: 'Please enter pickup and drop locations' })
      return
    }
    setIsBooking(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsBooking(false)
    setIsBookingDialogOpen(false)
    setIsTracking(true)
    addNotification({ type: 'success', title: 'Ride Booked!', message: 'Your driver is on the way' })
  }

  const handleCancelRide = () => {
    setIsTracking(false)
    setSelectedRide(null)
    addNotification({ type: 'info', title: 'Ride Cancelled', message: 'Your ride has been cancelled' })
  }

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <PageHeader title="Book a Ride" description="Choose your preferred ride option" />

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="border-2">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-sm font-semibold">Pickup Location</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
                <Input id="pickup" placeholder="Enter pickup location" className="pl-10 h-12" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center pl-4"><div className="w-0.5 h-6 bg-border" /></div>
            <div className="space-y-2">
              <Label htmlFor="drop" className="text-sm font-semibold">Drop Location</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-destructive" />
                <Input id="drop" placeholder="Enter drop location" className="pl-10 h-12" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <Navigation className="w-4 h-4" />
              <span>Estimated distance: 5.2 km</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {isTracking && selectedRide ? (
          <RideTracking
            key="tracking"
            rideType={selectedRide.name}
            driver={{ name: 'Rajesh Kumar', rating: 4.8, vehicle: 'Maruti Swift Dzire', plate: 'DL 01 AB 1234' }}
            eta={4}
            onCancel={handleCancelRide}
          />
        ) : (
          <motion.div key="selection" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Choose Ride Type</h2>
              <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="initial" animate="animate">
                {rideTypes.map((ride, index) => (
                  <motion.div key={ride.id} variants={staggerItem}>
                    <RideCard ride={ride} isSelected={selectedRide?.id === ride.id} onSelect={() => handleSelectRide(ride)} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <Card className="border-2 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
              <CardHeader><CardTitle>Why Choose Our Rides?</CardTitle></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  {whyChooseFeatures.map((feature, index) => (
                    <motion.div key={feature.title} className="flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                      <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm {selectedRide?.name} Booking</DialogTitle>
            <DialogDescription>Review your ride details before confirming</DialogDescription>
          </DialogHeader>
          {selectedRide && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{selectedRide.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedRide.description}</p>
                </div>
              </div>
              <div className="space-y-3 border-t pt-4">
                {[
                  { label: 'Pickup', value: pickupLocation || 'Current location' },
                  { label: 'Drop', value: dropLocation || 'Destination' },
                  { label: 'Distance', value: '5.2 km' },
                  { label: 'ETA', value: selectedRide.eta },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-2 rounded-xl bg-muted/30">
                <div className="flex justify-between mb-2"><span className="text-sm">Base Fare</span><span className="font-medium">₹{selectedRide.price}</span></div>
                <div className="flex justify-between mb-2"><span className="text-sm">Platform Fee</span><span className="font-medium">₹5</span></div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-primary">₹{selectedRide.price + 5}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <MotionButton onClick={handleConfirmBooking} className="w-full" size="lg" loading={isBooking}>Confirm & Book Ride</MotionButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  )
}
