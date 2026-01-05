import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, Calendar, TrendingUp, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const { providers, bookings } = useData();

  const approvedProviders = providers.filter(p => p.status === 'approved').length;
  const pendingProviders = providers.filter(p => p.status === 'pending').length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Haluwai Booking</title>
        <meta name="description" content="Manage the platform" />
      </Helmet>

      <DashboardLayout role="admin">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/90">Platform overview and management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">{providers.length}</div>
              <div className="text-gray-600">Total Providers</div>
              <div className="text-sm text-orange-600 mt-1">{pendingProviders} pending approval</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">{approvedProviders}</div>
              <div className="text-gray-600">Active Providers</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">{totalBookings}</div>
              <div className="text-gray-600">Total Bookings</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-gray-600">Total Revenue</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admin/providers">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Manage Providers</h3>
                <p className="text-gray-600">Approve or block catering providers</p>
              </motion.div>
            </Link>
            <Link to="/admin/bookings">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                <Calendar className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">View Bookings</h3>
                <p className="text-gray-600">Monitor all platform bookings</p>
              </motion.div>
            </Link>
            <Link to="/admin/reports">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Reports</h3>
                <p className="text-gray-600">Platform analytics and insights</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboard;