import { motion } from 'framer-motion'
import { pageTransition, fadeInUp, cardHover } from '@/lib/motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  MapPin, Calendar, Car, Search, AlertCircle, CheckCircle2, Clock,
  TrendingUp
} from 'lucide-react'

export function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function PageHeader({ title, description, children }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </motion.div>
  )
}

const variantStyles = {
  default: { iconBg: 'bg-muted', iconColor: 'text-muted-foreground' },
  primary: { iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  secondary: { iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  accent: { iconBg: 'bg-accent/10', iconColor: 'text-accent' },
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }) {
  const styles = variantStyles[variant]
  return (
    <motion.div whileHover={cardHover}>
      <Card className="border-2 transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold tracking-tight">{value}</p>
                {trend && (
                  <span className={cn('text-sm font-medium', trend.isPositive ? 'text-green-600' : 'text-red-600')}>
                    {trend.isPositive ? '+' : ''}{trend.value}%
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <div className={cn('p-3 rounded-xl', styles.iconBg)}>
              <Icon className={cn('w-6 h-6', styles.iconColor)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const stateConfig = {
  'no-parking': { icon: MapPin, defaultTitle: 'No parking locations found', defaultDescription: 'Try adjusting your filters or search for a different area.', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  'no-bookings': { icon: Calendar, defaultTitle: 'No bookings found', defaultDescription: "You don't have any bookings at the moment.", iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  'no-results': { icon: Search, defaultTitle: 'No results found', defaultDescription: "We couldn't find what you're looking for.", iconBg: 'bg-muted', iconColor: 'text-muted-foreground' },
  'no-rides': { icon: Car, defaultTitle: 'No rides available', defaultDescription: 'There are currently no rides available in your area.', iconBg: 'bg-accent/10', iconColor: 'text-accent' },
  'error': { icon: AlertCircle, defaultTitle: 'Something went wrong', defaultDescription: 'We encountered an error. Please try again later.', iconBg: 'bg-destructive/10', iconColor: 'text-destructive' },
  'success': { icon: CheckCircle2, defaultTitle: 'Success!', defaultDescription: 'Your action was completed successfully.', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  'no-upcoming': { icon: Clock, defaultTitle: 'No upcoming bookings', defaultDescription: "You don't have any scheduled bookings.", iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  'no-completed': { icon: Calendar, defaultTitle: 'No completed bookings', defaultDescription: 'Your booking history will appear here.', iconBg: 'bg-muted', iconColor: 'text-muted-foreground' },
}

export function EmptyState({ type, title, description, action }) {
  const config = stateConfig[type] || stateConfig['no-results']
  const Icon = config.icon
  return (
    <motion.div className="flex flex-col items-center justify-center py-16 px-4 text-center" variants={fadeInUp} initial="initial" animate="animate">
      <motion.div
        className={`w-20 h-20 rounded-2xl ${config.iconBg} flex items-center justify-center mb-6`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Icon className={`w-10 h-10 ${config.iconColor}`} />
      </motion.div>
      <motion.h3 className="text-xl font-semibold mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {title || config.defaultTitle}
      </motion.h3>
      <motion.p className="text-muted-foreground max-w-sm mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {description || config.defaultDescription}
      </motion.p>
      {action && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          {action.href ? (
            <Button asChild><Link to={action.href}>{action.label}</Link></Button>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-muted', className)} />
}

export function ParkingCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  )
}

export function MapSkeleton() {
  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      <Skeleton className="aspect-video w-full" />
    </div>
  )
}
