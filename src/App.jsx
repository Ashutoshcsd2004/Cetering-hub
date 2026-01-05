import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import ChatWidget from '@/components/ChatWidget';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPassword from '@/pages/ForgotPassword';

// Customer Pages
import CustomerDashboard from '@/pages/CustomerDashboard';
import CustomerProfile from '@/pages/CustomerProfile';
import SearchProviders from '@/pages/SearchProviders';
import ProviderProfile from '@/pages/ProviderProfile';
import BookingPage from '@/pages/BookingPage';
import MyBookings from '@/pages/MyBookings';
import MyKhata from '@/pages/MyKhata';

// Provider Pages
import ProviderDashboard from '@/pages/ProviderDashboard';
import ProviderSettings from '@/pages/ProviderSettings';
import ProviderManageMenu from '@/pages/ProviderManageMenu';
import ProviderManagePackages from '@/pages/ProviderManagePackages';
import ProviderManageBookings from '@/pages/ProviderManageBookings';
import ProviderKhata from '@/pages/ProviderKhata';
import ProviderEarnings from '@/pages/ProviderEarnings';

// Admin Pages
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProviders from '@/pages/AdminProviders';
import AdminBookings from '@/pages/AdminBookings';
import AdminReports from '@/pages/AdminReports';
import AdminComplaints from '@/pages/AdminComplaints';

// Static Pages
import TermsConditions from '@/pages/TermsConditions';
import CancellationPolicy from '@/pages/CancellationPolicy';
import HelpSupport from '@/pages/HelpSupport';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Haluwai & Catering Booking System</title>
        <meta name="description" content="Book professional catering services for weddings, birthdays, and events." />
      </Helmet>
      <Routes>
        <Route path="/" element={user ? (
          user.role === 'customer' ? <Navigate to="/dashboard" /> :
          user.role === 'provider' ? <Navigate to="/provider/dashboard" /> :
          <Navigate to="/admin/dashboard" />
        ) : <LandingPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Customer Routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><CustomerProfile /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute allowedRoles={['customer']}><SearchProviders /></ProtectedRoute>} />
        <Route path="/provider/:id" element={<ProtectedRoute allowedRoles={['customer']}><ProviderProfile /></ProtectedRoute>} />
        <Route path="/book/:id" element={<ProtectedRoute allowedRoles={['customer']}><BookingPage /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute allowedRoles={['customer']}><MyBookings /></ProtectedRoute>} />
        <Route path="/my-khata" element={<ProtectedRoute allowedRoles={['customer']}><MyKhata /></ProtectedRoute>} />

        {/* Provider Routes */}
        <Route path="/provider/dashboard" element={<ProtectedRoute allowedRoles={['provider']}><ProviderDashboard /></ProtectedRoute>} />
        <Route path="/provider/settings" element={<ProtectedRoute allowedRoles={['provider']}><ProviderSettings /></ProtectedRoute>} />
        <Route path="/provider/menu" element={<ProtectedRoute allowedRoles={['provider']}><ProviderManageMenu /></ProtectedRoute>} />
        <Route path="/provider/packages" element={<ProtectedRoute allowedRoles={['provider']}><ProviderManagePackages /></ProtectedRoute>} />
        <Route path="/provider/bookings" element={<ProtectedRoute allowedRoles={['provider']}><ProviderManageBookings /></ProtectedRoute>} />
        <Route path="/provider/khata" element={<ProtectedRoute allowedRoles={['provider']}><ProviderKhata /></ProtectedRoute>} />
        <Route path="/provider/earnings" element={<ProtectedRoute allowedRoles={['provider']}><ProviderEarnings /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/providers" element={<ProtectedRoute allowedRoles={['admin']}><AdminProviders /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
        <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['admin']}><AdminComplaints /></ProtectedRoute>} />

        {/* Static Pages */}
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/help" element={<HelpSupport />} />
      </Routes>
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
          <Toaster />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;