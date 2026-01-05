import React from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';

const AdminBookings = () => {
  const { bookings, providers } = useData();

  const getProviderName = (providerId) => {
    return providers.find(p => p.id === providerId)?.name || 'Unknown';
  };

  return (
    <>
      <Helmet>
        <title>All Bookings - Admin</title>
        <meta name="description" content="View all platform bookings" />
      </Helmet>

      <DashboardLayout role="admin">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">All Bookings</h1>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{getProviderName(booking.providerId)}</h3>
                      <p className="text-sm text-gray-600 capitalize">{booking.eventType} - {new Date(booking.eventDate).toLocaleDateString()}</p>
                      <div className="text-sm mt-1">
                        <span className="text-gray-600">Guests: {booking.guestCount} | </span>
                        <span className="text-gray-600">Amount: ₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminBookings;