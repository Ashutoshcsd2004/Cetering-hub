import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Receipt, BarChart3, UtensilsCrossed, Package, TrendingUp } from 'lucide-react';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { bookings, menuItems, packages } = useData();

  const providerBookings = bookings.filter(b => b.providerId === user.id);
  const providerMenuItems = menuItems.filter(m => m.providerId === user.id);
  const providerPackages = packages.filter(p => p.providerId === user.id);

  const totalEarnings = providerBookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const pendingBookings = providerBookings.filter(b => b.status === 'pending').length;

  const quickActions = [
    { icon: UtensilsCrossed, label: 'Manage Menu', link: '/provider/menu', color: 'bg-blue-500', count: providerMenuItems.length },
    { icon: Package, label: 'Packages', link: '/provider/packages', color: 'bg-green-500', count: providerPackages.length },
    { icon: Calendar, label: 'Bookings', link: '/provider/bookings', color: 'bg-purple-500', count: pendingBookings },
    { icon: Receipt, label: 'Khata', link: '/provider/khata', color: 'bg-orange-500' },
    { icon: BarChart3, label: 'Earnings', link: '/provider/earnings', color: 'bg-pink-500' }
  ];

  return (
    <>
      <Helmet>
        <title>Provider Dashboard - Haluwai Booking</title>
        <meta name="description" content="Manage your catering business" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-white/90">Manage your catering business efficiently</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">{providerBookings.length}</div>
              <div className="text-gray-600">Total Bookings</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">{pendingBookings}</div>
              <div className="text-gray-600">Pending Requests</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">₹{totalEarnings.toLocaleString()}</div>
              <div className="text-gray-600">Total Earnings</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">{providerMenuItems.length}</div>
              <div className="text-gray-600">Menu Items</div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center cursor-pointer"
                  >
                    <div className={`inline-flex p-3 rounded-full ${action.color} text-white mb-3`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="font-medium text-sm text-gray-900">{action.label}</div>
                    {action.count !== undefined && (
                      <div className="text-2xl font-bold text-gray-700 mt-1">{action.count}</div>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          {providerBookings.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
              <div className="space-y-4">
                {providerBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="border-l-4 border-orange-500 pl-4 py-2 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{booking.eventType.charAt(0).toUpperCase() + booking.eventType.slice(1)}</div>
                      <div className="text-sm text-gray-600">Date: {new Date(booking.eventDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">Guests: {booking.guestCount} | Amount: ₹{booking.totalAmount.toLocaleString()}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/provider/bookings">
                <Button className="mt-4 w-full">View All Bookings</Button>
              </Link>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderDashboard;