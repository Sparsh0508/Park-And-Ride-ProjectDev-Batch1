export const parkingSlots = [
  { id: 'P-001', name: 'Central Plaza Parking', distance: '0.5 km', price: 50, available: 12, total: 20, rating: 4.5, address: '123 Main Street, Downtown', features: ['Covered', '24/7 Security', 'CCTV', 'EV Charging'] },
  { id: 'P-002', name: 'City Mall Multi-Level', distance: '0.8 km', price: 40, available: 8, total: 15, rating: 4.8, address: '456 Shopping Blvd', features: ['Covered', '24/7 Security', 'CCTV', 'Valet Available'] },
  { id: 'P-003', name: 'Metro Station Parking', distance: '1.2 km', price: 30, available: 20, total: 30, rating: 4.2, address: 'Metro Station Road', features: ['Open Air', 'Security Guard', 'Well Lit'] },
  { id: 'P-004', name: 'Business District Tower', distance: '1.5 km', price: 60, available: 5, total: 25, rating: 4.7, address: '789 Corporate Ave', features: ['Covered', '24/7 Security', 'CCTV', 'Premium Spots'] },
  { id: 'P-005', name: 'Airport Terminal Parking', distance: '2.0 km', price: 80, available: 0, total: 50, rating: 4.6, address: 'Airport Road', features: ['Covered', '24/7 Security', 'CCTV', 'Shuttle Service'] },
  { id: 'P-006', name: 'Tech Park Underground', distance: '2.5 km', price: 45, available: 18, total: 40, rating: 4.4, address: 'Tech Park Complex', features: ['Underground', '24/7 Security', 'CCTV', 'EV Charging'] },
]

export const rideTypes = [
  { id: 'cab', name: 'Cab', description: 'Comfortable sedan cars for a premium experience', eta: '5-8 min', price: 120, capacity: 4, iconName: 'Car' },
  { id: 'shuttle', name: 'Shuttle', description: 'Shared ride service for economical travel', eta: '10-15 min', price: 40, capacity: 8, iconName: 'Users' },
  { id: 'erickshaw', name: 'E-Rickshaw', description: 'Eco-friendly option for short distances', eta: '3-5 min', price: 30, capacity: 3, iconName: 'Zap' },
]

export const bookings = [
  { id: 'BK-P001', type: 'parking', location: 'Central Plaza Parking', address: '123 Main Street, Downtown', date: '2024-01-15', time: '09:00', duration: '2 hours', status: 'active', amount: 110, slot: 'A-23' },
  { id: 'BK-P002', type: 'parking', location: 'City Mall Multi-Level', address: '456 Shopping Blvd', date: '2024-01-14', time: '14:00', duration: '3 hours', status: 'completed', amount: 130, slot: 'B-15' },
  { id: 'BK-P003', type: 'parking', location: 'Airport Terminal Parking', address: 'Airport Road', date: '2024-01-20', time: '06:00', duration: '5 hours', status: 'upcoming', amount: 410, slot: 'C-08' },
  { id: 'BK-R001', type: 'ride', location: 'Central Plaza → Tech Park', date: '2024-01-15', time: '11:30', status: 'active', amount: 125, slot: 'Cab' },
  { id: 'BK-R002', type: 'ride', location: 'Metro Station → City Mall', date: '2024-01-13', time: '16:00', status: 'completed', amount: 35, slot: 'E-Rickshaw' },
]

export const getParkingById = (id) => parkingSlots.find(slot => slot.id === id)
