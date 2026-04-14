import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Calendar, Search, X, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import { PageWrapper, PageHeader, StatCard, EmptyState } from '@/components/shared/index'
import { BookingCard } from '@/components/bookings/BookingCard'
import { useNotification } from '@/components/shared/Notification'
import { bookings as allBookings } from '@/lib/data'
import { staggerContainer } from '@/lib/motion'

export default function BookingsPage() {
  const { addNotification } = useNotification()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookings, setBookings] = useState(allBookings)

  const filteredBookings = useMemo(() => bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab
    const matchesSearch = booking.location.toLowerCase().includes(searchQuery.toLowerCase()) || booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  }), [bookings, activeTab, searchQuery])

  const stats = useMemo(() => ({
    total: bookings.length,
    active: bookings.filter(b => b.status === 'active').length,
    upcoming: bookings.filter(b => b.status === 'upcoming').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }), [bookings])

  const handleCancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    addNotification({ type: 'info', title: 'Booking Cancelled', message: `Booking ${id} has been cancelled` })
  }

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <PageHeader title="My Bookings" description="Manage all your parking and ride bookings" />

      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="initial" animate="animate">
        <StatCard title="Total Bookings" value={stats.total} subtitle="All time" icon={TrendingUp} variant="primary" />
        <StatCard title="Active Now" value={stats.active} subtitle="In progress" icon={CheckCircle2} variant="secondary" />
        <StatCard title="Upcoming" value={stats.upcoming} subtitle="Scheduled" icon={Clock} variant="accent" />
        <StatCard title="Completed" value={stats.completed} subtitle="Successfully" icon={Calendar} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by location or booking ID..." className="pl-10 h-11" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="all" className="gap-2">All <span className="hidden sm:inline text-xs bg-muted px-1.5 py-0.5 rounded">{stats.total}</span></TabsTrigger>
          <TabsTrigger value="active" className="gap-2">Active <span className="hidden sm:inline text-xs bg-primary/20 px-1.5 py-0.5 rounded">{stats.active}</span></TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">Upcoming <span className="hidden sm:inline text-xs bg-secondary/20 px-1.5 py-0.5 rounded">{stats.upcoming}</span></TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <motion.div key={`${activeTab}-${searchQuery}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="initial" animate="animate" exit={{ opacity: 0 }}>
                {filteredBookings.map((booking, index) => (
                  <BookingCard key={booking.id} booking={booking} index={index} onCancel={() => handleCancelBooking(booking.id)} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-2">
                  <CardContent className="p-0">
                    <EmptyState type="no-bookings" action={{ label: 'Clear Search', onClick: () => { setSearchQuery(''); setActiveTab('all') } }} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  )
}
