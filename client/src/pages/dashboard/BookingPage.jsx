import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { ChevronLeft, QrCode, CheckCircle2, Star, Shield, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/shared/index'
import { MotionButton } from '@/components/shared/MotionButton'
import { BookingStepper, SlotGrid, SlotStatus } from '@/components/parking/BookingStepper'
import { useNotification } from '@/components/shared/Notification'
import { getParkingById, parkingSlots } from '@/lib/data'
import { fadeInUp, scaleIn } from '@/lib/motion'

const defaultParking = parkingSlots[0]

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const slotId = searchParams.get('id') || 'P-001'
  const parkingSlot = getParkingById(slotId) || defaultParking

  const [currentStep, setCurrentStep] = useState(1)
  const [date, setDate] = useState(() => {
    const d = new Date()
    d.setHours(12, 0, 0, 0) // noon to avoid timezone shift
    return d
  })
  const [startTime, setStartTime] = useState('09:00')
  const [duration, setDuration] = useState('2')
  const [selectedParkingSlot, setSelectedParkingSlot] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingId] = useState(`BK-${Math.random().toString(36).substring(7).toUpperCase()}`)

  const totalAmount = parkingSlot.price * parseInt(duration)
  const platformFee = 10
  const grandTotal = totalAmount + platformFee
  const bookedSlots = ['A-03', 'A-05', 'B-02', 'B-06', 'C-01', 'C-04']

  const handleNext = () => {
    if (currentStep === 1 && !selectedParkingSlot) {
      addNotification({ type: 'warning', title: 'Select a slot', message: 'Please select a parking slot to continue' })
      return
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setCurrentStep(4)
    addNotification({ type: 'success', title: 'Booking Confirmed!', message: 'Your parking slot has been reserved successfully' })
  }

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <MotionButton variant="ghost" onClick={() => navigate(-1)} className="gap-2 -ml-2">
          <ChevronLeft className="w-4 h-4" /> Back to Parking
        </MotionButton>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Book Parking Slot</h1>
        <p className="text-muted-foreground">Complete your booking in a few simple steps</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <BookingStepper currentStep={currentStep} />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" variants={scaleIn} initial="initial" animate="animate" exit="exit">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Select Your Slot</span>
                      <Badge variant="secondary">{parkingSlot.name}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SlotStatus available={parkingSlot.available} total={parkingSlot.total} />
                    <SlotGrid rows={4} cols={6} bookedSlots={bookedSlots} selectedSlot={selectedParkingSlot} onSlotSelect={setSelectedParkingSlot} />
                    {selectedParkingSlot && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Selected Slot</p>
                            <p className="text-xl font-bold">{selectedParkingSlot}</p>
                          </div>
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" variants={scaleIn} initial="initial" animate="animate" exit="exit">
                <Card className="border-2">
                  <CardHeader><CardTitle>Select Date & Time</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block text-base font-semibold">Parking Date</Label>
                      <input
                        type="date"
                        className="flex h-12 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={date.toISOString().split('T')[0]}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const d = new Date(e.target.value)
                          d.setHours(12, 0, 0, 0)
                          setDate(d)
                        }}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Start Time</Label>
                        <Select value={startTime} onValueChange={setStartTime}>
                          <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => {
                              const hour = i.toString().padStart(2, '0')
                              return <SelectItem key={hour} value={`${hour}:00`}>{`${hour}:00`}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const hours = (i + 1).toString()
                              return <SelectItem key={hours} value={hours}>{hours} {hours === '1' ? 'hour' : 'hours'}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" variants={scaleIn} initial="initial" animate="animate" exit="exit">
                <Card className="border-2">
                  <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 border-2 rounded-xl bg-muted/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Parking Fee</span>
                        <span className="font-medium">₹{parkingSlot.price} x {duration}h = ₹{totalAmount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Platform Fee</span>
                        <span className="font-medium">₹{platformFee}</span>
                      </div>
                      <div className="border-t pt-3 flex items-center justify-between">
                        <span className="font-semibold text-lg">Total Amount</span>
                        <span className="text-2xl font-bold text-primary">₹{grandTotal}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Payment Method</Label>
                      {[
                        { id: 'card', icon: CreditCard, title: 'Credit/Debit Card', sub: 'Visa, Mastercard, Amex', gradient: 'from-primary to-secondary' },
                        { id: 'upi', icon: QrCode, title: 'UPI Payment', sub: 'GPay, PhonePe, Paytm', gradient: 'from-secondary to-accent' },
                      ].map(({ id, icon: Icon, title, sub, gradient }) => (
                        <motion.button
                          key={id}
                          className={cn('w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left', selectedPayment === id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}
                          onClick={() => setSelectedPayment(id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{title}</p>
                            <p className="text-sm text-muted-foreground">{sub}</p>
                          </div>
                          {selectedPayment === id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" variants={scaleIn} initial="initial" animate="animate" exit="exit">
                <Card className="border-2 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}>
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <motion.h2 className="text-2xl font-bold mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Booking Confirmed!</motion.h2>
                      <motion.p className="text-muted-foreground" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Your parking slot has been reserved successfully</motion.p>
                    </div>
                    <motion.div className="p-6 bg-background rounded-xl border-2 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                      <div className="w-32 h-32 mx-auto bg-muted rounded-xl flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                        <p className="font-mono font-bold text-xl">{bookingId}</p>
                      </div>
                    </motion.div>
                    <motion.div className="space-y-3 text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                      {[
                        { label: 'Location', value: parkingSlot.name },
                        { label: 'Slot', value: selectedParkingSlot },
                        { label: 'Date', value: date.toLocaleDateString() },
                        { label: 'Time', value: `${startTime} (${duration}h)` },
                        { label: 'Amount Paid', value: `₹${grandTotal}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-2 sticky top-20">
              <CardHeader><CardTitle className="text-lg">Booking Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Parking Location</p>
                  <p className="font-semibold">{parkingSlot.name}</p>
                  <p className="text-sm text-muted-foreground">{parkingSlot.address}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{parkingSlot.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>
                {selectedParkingSlot && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Selected Slot</p>
                    <p className="font-bold text-lg">{selectedParkingSlot}</p>
                  </div>
                )}
                {currentStep >= 2 && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">{date.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time & Duration</p>
                      <p className="font-medium">{startTime} ({duration} hours)</p>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform Fee</span>
                        <span className="font-medium">₹{platformFee}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl text-primary">₹{grandTotal}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div className="flex items-center justify-between gap-4 pt-6 border-t" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        {currentStep > 1 && currentStep < 4 && (
          <MotionButton variant="outline" onClick={handleBack} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </MotionButton>
        )}
        <div className="flex-1" />
        {currentStep < 3 && <MotionButton onClick={handleNext} size="lg">Continue</MotionButton>}
        {currentStep === 3 && <MotionButton onClick={handlePayment} size="lg" loading={isProcessing} className="min-w-[160px]">Pay ₹{grandTotal}</MotionButton>}
        {currentStep === 4 && <MotionButton size="lg" asChild><Link to="/dashboard/bookings">View My Bookings</Link></MotionButton>}
      </motion.div>
    </PageWrapper>
  )
}
