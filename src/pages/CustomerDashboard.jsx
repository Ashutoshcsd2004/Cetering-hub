import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, Calendar, BookOpen, Receipt, Bell } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { bookings, notifications } = useData();

  const userBookings = bookings.filter(b => b.customerId === user.id);
  const upcomingBookings = userBookings.filter(b => new Date(b.eventDate) > new Date());
  const unreadNotifications = notifications.filter(n => n.userId === user.id && !n.read);

  const quickActions = [
    { icon: Search, label: 'Search Caterers', link: '/search', color: 'bg-blue-500' },
    { icon: Calendar, label: 'My Bookings', link: '/my-bookings', color: 'bg-green-500' },
    { icon: Receipt, label: 'My Khata', link: '/my-khata', color: 'bg-purple-500' },
    { icon: Bell, label: 'Notifications', badge: unreadNotifications.length, color: 'bg-orange-500' }
  ];

  return (
    <>
      <Helmet>
        <title>Customer Dashboard - Haluwai Booking</title>
        <meta name="description" content="Manage your catering bookings and search for caterers" />
      </Helmet>

      <DashboardLayout role="customer">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-white/90">Ready to plan your next event?</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-orange-600">{userBookings.length}</div>
              <div className="text-gray-600">Total Bookings</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-green-600">{upcomingBookings.length}</div>
              <div className="text-gray-600">Upcoming Events</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-3xl font-bold text-purple-600">
                ₹{userBookings.reduce((sum, b) => sum + b.remainingAmount, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Pending Payment</div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link || '#'}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center cursor-pointer"
                  >
                    <div className={`inline-flex p-3 rounded-full ${action.color} text-white mb-3`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="font-medium text-sm text-gray-900">{action.label}</div>
                    {action.badge > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {action.badge}
                      </div>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Bookings */}
          {upcomingBookings.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="font-semibold">{booking.eventType.charAt(0).toUpperCase() + booking.eventType.slice(1)}</div>
                    <div className="text-sm text-gray-600">Date: {new Date(booking.eventDate).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">Guests: {booking.guestCount}</div>
                  </div>
                ))}
              </div>
              <Link to="/my-bookings">
                <Button className="mt-4 w-full">View All Bookings</Button>
              </Link>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerDashboard;