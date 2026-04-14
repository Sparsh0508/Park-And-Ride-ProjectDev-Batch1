import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet'
import { PageWrapper, PageHeader, ParkingCardSkeleton, MapSkeleton, EmptyState } from '@/components/shared/index'
import { ParkingCard } from '@/components/parking/ParkingCard'
import { MapView } from '@/components/parking/MapView'
import { MotionButton } from '@/components/shared/MotionButton'
import { parkingSlots } from '@/lib/data'
import { staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

const distanceFilters = [
  { label: 'Under 1 km', value: 1 },
  { label: '1-2 km', value: 2 },
  { label: '2-5 km', value: 5 },
  { label: 'Any', value: Infinity },
]

export default function ParkingPage() {
  const [priceRange, setPriceRange] = useState([0, 150])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistance, setSelectedDistance] = useState(Infinity)
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredSlots = useMemo(() => parkingSlots.filter(slot => {
    const matchesSearch = slot.name.toLowerCase().includes(searchQuery.toLowerCase()) || slot.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = slot.price >= priceRange[0] && slot.price <= priceRange[1]
    const matchesDistance = parseFloat(slot.distance) <= selectedDistance
    const matchesAvailability = !showAvailableOnly || slot.available > 0
    return matchesSearch && matchesPrice && matchesDistance && matchesAvailability
  }), [searchQuery, priceRange, selectedDistance, showAvailableOnly])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (priceRange[0] > 0 || priceRange[1] < 150) count++
    if (selectedDistance !== Infinity) count++
    if (showAvailableOnly) count++
    return count
  }, [priceRange, selectedDistance, showAvailableOnly])

  const resetFilters = () => { setPriceRange([0, 150]); setSelectedDistance(Infinity); setShowAvailableOnly(false) }

  return (
    <PageWrapper className="flex-1 p-4 md:p-6 space-y-6">
      <PageHeader title="Book Parking" description="Find and reserve your parking spot" />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by location or parking name..." className="pl-10 h-11" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 h-11 relative">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{activeFiltersCount}</span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>Customize your search preferences</SheetDescription>
              </SheetHeader>
              <div className="space-y-8 mt-8">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Price Range</Label>
                  <div className="px-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={150} min={0} step={5} className="mb-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium px-2 py-1 bg-muted rounded">₹{priceRange[0]}/hr</span>
                      <span className="font-medium px-2 py-1 bg-muted rounded">₹{priceRange[1] >= 150 ? '150+' : priceRange[1]}/hr</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Distance</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {distanceFilters.map((filter) => (
                      <Button key={filter.value} variant={selectedDistance === filter.value ? 'default' : 'outline'} size="sm" onClick={() => setSelectedDistance(filter.value)} className="justify-start">
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Availability</Label>
                  <Button variant={showAvailableOnly ? 'default' : 'outline'} size="sm" onClick={() => setShowAvailableOnly(!showAvailableOnly)} className="w-full justify-start">
                    Show available only
                  </Button>
                </div>
              </div>
              <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                <div className="flex gap-3 w-full">
                  <Button variant="outline" onClick={resetFilters} className="flex-1">Reset</Button>
                  <Button onClick={() => setIsFilterOpen(false)} className="flex-1">Apply Filters</Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:flex items-center border rounded-lg p-1">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9" onClick={() => setViewMode('grid')}><Grid className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9" onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      {isLoading ? <MapSkeleton /> : <MapView slots={filteredSlots} selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} aspectRatio="wide" />}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredSlots.length} parking {filteredSlots.length === 1 ? 'location' : 'locations'} found</p>
        {activeFiltersCount > 0 && <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">Clear filters</Button>}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loading" className={cn('grid gap-4', viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => <ParkingCardSkeleton key={i} />)}
          </motion.div>
        ) : filteredSlots.length > 0 ? (
          <motion.div key="results" className={cn('grid gap-4', viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')} variants={staggerContainer} initial="initial" animate="animate">
            {filteredSlots.map((slot, index) => <ParkingCard key={slot.id} slot={slot} index={index} />)}
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-2"><CardContent className="p-0"><EmptyState type="no-parking" action={{ label: 'Clear Filters', onClick: resetFilters }} /></CardContent></Card>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
