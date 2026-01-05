import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';

const ProviderEarnings = () => {
  const { user } = useAuth();
  const { bookings } = useData();

  const providerBookings = bookings.filter(b => b.providerId === user.id);
  const totalEarnings = providerBookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const pendingAmount = providerBookings.reduce((sum, b) => sum + b.remainingAmount, 0);

  return (
    <>
      <Helmet>
        <title>Earnings - Haluwai Booking</title>
        <meta name="description" content="View your earnings summary" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Earnings Summary</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
              <div className="text-3xl font-bold text-gray-900">{providerBookings.length}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Total Earned</div>
              <div className="text-3xl font-bold text-green-600">₹{totalEarnings.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Pending Payment</div>
              <div className="text-3xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderEarnings;