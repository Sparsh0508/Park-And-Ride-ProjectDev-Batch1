import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Mail, Phone, Shield, Bell, CreditCard, Camera, CheckCircle2, Pencil, MapPin, Calendar, Award } from 'lucide-react'
import { PageWrapper, PageHeader, StatCard } from '@/components/shared/index'
import { MotionButton } from '@/components/shared/MotionButton'
import { useNotification } from '@/components/shared/Notification'
import { useAuth } from '@/context/AuthContext'
import { staggerContainer, staggerItem, fadeInUp, cardHover } from '@/lib/motion'

const stats = [
  { title: 'Total Bookings', value: 47, icon: Calendar, variant: 'primary' },
  { title: 'Active Now', value: 2, icon: MapPin, variant: 'secondary' },
  { title: 'Member Since', value: '2024', icon: Award, variant: 'accent' },
]

const paymentMethods = [
  { id: 'card1', type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
  { id: 'card2', type: 'mastercard', last4: '5555', expiry: '08/25', isDefault: false },
]

export default function ProfilePage() {
  const { addNotification } = useNotification()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  })
  const [notifications, setNotifications] = useState({ bookingReminders: true, promotions: false, securityAlerts: true, newsletter: false })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
    addNotification({ type: 'success', title: 'Profile Updated', message: 'Your changes have been saved successfully' })
  }

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <PageHeader title="Profile" description="Manage your account settings and preferences" />

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <motion.div whileHover={cardHover}>
          <Card className="border-2 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent relative">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="profilePattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#profilePattern)" />
                </svg>
              </div>
            </div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 sm:-mt-12">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <Avatar className="w-28 h-28 border-4 border-background shadow-xl">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl font-bold">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </motion.div>
                <div className="flex-1 pt-2 sm:pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <Badge className="w-fit bg-primary/10 text-primary border-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
                <MotionButton variant={isEditing ? 'default' : 'outline'} className="gap-2 sm:mb-2" onClick={() => isEditing ? handleSave() : setIsEditing(true)} loading={isSaving}>
                  {isEditing ? 'Save Changes' : (
                    <span className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Profile</span>
                  )}
                </MotionButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="grid gap-4 sm:grid-cols-3" variants={staggerContainer} initial="initial" animate="animate">
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={staggerItem}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal" className="gap-2"><User className="w-4 h-4" /><span className="hidden sm:inline">Personal</span></TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="w-4 h-4" /><span className="hidden sm:inline">Notifications</span></TabsTrigger>
          <TabsTrigger value="payment" className="gap-2"><CreditCard className="w-4 h-4" /><span className="hidden sm:inline">Payment</span></TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="border-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" />Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} disabled={!isEditing} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} disabled={!isEditing} className="pl-10 h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} disabled={!isEditing} className="pl-10 h-11" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Account Security</p>
                      <p className="text-sm text-muted-foreground">Two-factor authentication is enabled</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/5">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="border-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: 'bookingReminders', label: 'Booking Reminders', desc: 'Get notified before your bookings start' },
                  { key: 'promotions', label: 'Promotions & Offers', desc: 'Receive special deals and discounts' },
                  { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important alerts about your account' },
                  { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates and tips' },
                ].map((item, index) => (
                  <motion.div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch checked={notifications[item.key]} onCheckedChange={(checked) => setNotifications(n => ({ ...n, [item.key]: checked }))} />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payment">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />Payment Methods</CardTitle>
                  <MotionButton variant="outline" size="sm">Add New</MotionButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <motion.div key={method.id} className="flex items-center gap-4 p-4 border-2 rounded-xl hover:border-primary/50 transition-colors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <div className="w-12 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium capitalize">{method.type} •••• {method.last4}</p>
                        {method.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                    <MotionButton variant="ghost" size="sm">Edit</MotionButton>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  )
}
