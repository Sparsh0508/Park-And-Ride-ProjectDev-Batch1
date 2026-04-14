import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import ParkingPage from './pages/dashboard/ParkingPage.jsx'
import BookingPage from './pages/dashboard/BookingPage.jsx'
import RidesPage from './pages/dashboard/RidesPage.jsx'
import BookingsPage from './pages/dashboard/BookingsPage.jsx'
import ProfilePage from './pages/dashboard/ProfilePage.jsx'

// Redirect already-authenticated users away from login/register
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth pages — redirect to dashboard if already logged in */}
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="parking" element={<ParkingPage />} />
        <Route path="parking/book" element={<BookingPage />} />
        <Route path="rides" element={<RidesPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="park-ride-theme" attribute="class" enableSystem={false}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
