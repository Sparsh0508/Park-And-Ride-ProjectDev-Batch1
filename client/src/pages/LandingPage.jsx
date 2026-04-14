import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Zap, Car, Clock, Shield, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { MotionButton } from '@/components/shared/MotionButton'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

const features = [
  { icon: Zap, title: 'Real-time Parking', description: 'See available parking spots in real-time with live updates and instant availability.', color: 'from-primary to-primary/60' },
  { icon: TrendingUp, title: 'Smart Allocation', description: 'AI-powered slot recommendations based on your destination and preferences.', color: 'from-secondary to-secondary/60' },
  { icon: Car, title: 'Last-mile Rides', description: 'Book cabs, shuttles, or e-rickshaws for seamless last-mile connectivity.', color: 'from-accent to-accent/60' },
]

const stats = [
  { icon: Clock, value: '2 min', label: 'Average booking time' },
  { icon: Shield, value: '100%', label: 'Secure payments' },
  { icon: MapPin, value: '500+', label: 'Parking locations' },
]

const benefits = [
  'Save up to 30 minutes daily on parking',
  'Zero-contact digital payments',
  'Real-time navigation to your slot',
  'Seamless ride booking integration',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Now available in 50+ cities
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Smart Parking &{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Seamless Travel
              </span>
            </h1>

            <motion.p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              Find parking spots in real-time, book rides instantly, and travel smarter with our intelligent urban mobility platform.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <MotionButton size="lg" className="rounded-full text-base px-8 gap-2 shadow-lg shadow-primary/20" asChild>
                <Link to="/register">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
              </MotionButton>
              <MotionButton size="lg" variant="outline" className="rounded-full text-base px-8" asChild>
                <Link to="/login">Sign In</Link>
              </MotionButton>
            </motion.div>
          </motion.div>

          <motion.div className="mt-16 lg:mt-20 relative" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl -z-10" />
            <Card className="relative overflow-hidden border-2 shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-muted via-muted/50 to-muted flex items-center justify-center relative">
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
                      {[1, 2, 3].map((i) => (
                        <motion.div key={i} className="bg-card rounded-xl p-4 shadow-lg border border-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                          <div className="w-8 h-8 rounded-lg bg-primary/20 mb-3" />
                          <div className="h-2 bg-muted rounded w-3/4 mb-2" />
                          <div className="h-2 bg-muted rounded w-1/2" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.div className="absolute bottom-4 left-4 bg-card rounded-xl p-3 shadow-lg border border-border" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium">12 slots available nearby</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Everything you need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Powerful features designed for modern urban mobility</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6 lg:gap-8" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={staggerItem}>
                  <Card className="border-2 h-full hover:border-primary/30 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="pt-8 pb-8">
                      <motion.div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`} whileHover={{ rotate: -5 }}>
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why choose Park & Ride?</h2>
              <p className="text-lg text-muted-foreground mb-8">Join thousands of commuters who save time and reduce stress with our smart parking and ride solutions.</p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li key={benefit} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <Card className="relative border-2 overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {[{ label: 'Time saved', value: '2.5 hrs/week' }, { label: 'Carbon reduced', value: '12 kg/month' }, { label: 'Money saved', value: '₹1,200/month' }].map((stat, index) => (
                      <motion.div key={stat.label} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.1 }}>
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-bold text-lg">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="grid md:grid-cols-3 gap-8 lg:gap-12" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} className="text-center" variants={staggerItem}>
                  <motion.div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 lg:p-16 text-center overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of users who trust Park & Ride for their daily commute. Start saving time today.</p>
              <MotionButton size="lg" className="rounded-full text-base px-8 gap-2 shadow-lg" asChild>
                <Link to="/register">Get Started Now <ArrowRight className="w-4 h-4" /></Link>
              </MotionButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Park & Ride</span>
            </div>
            <p className="text-sm text-muted-foreground">2024 Park & Ride. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
