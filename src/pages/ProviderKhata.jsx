import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';

const ProviderKhata = () => {
  const { user } = useAuth();
  const { bookings } = useData();

  const providerBookings = bookings.filter(b => b.providerId === user.id);

   // Group by month
   const monthlyData = providerBookings.reduce((acc, booking) => {
    const month = new Date(booking.eventDate).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = { total: 0, received: 0, pending: 0, items: [] };
    acc[month].total += booking.totalAmount;
    acc[month].received += booking.advancePaid;
    acc[month].pending += booking.remainingAmount;
    acc[month].items.push(booking);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Khata Management - Haluwai Booking</title>
        <meta name="description" content="Track customer payments and balances" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Khata Management</h1>

          {Object.keys(monthlyData).length === 0 ? (
             <div className="bg-white rounded-xl shadow-md p-12 text-center">
               <p className="text-gray-500">No transactions recorded yet.</p>
             </div>
          ) : (
            Object.entries(monthlyData).map(([month, data]) => (
              <div key={month} className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                   <h2 className="text-lg font-bold">{month} Summary</h2>
                   <div className="text-sm font-medium space-x-4">
                      <span className="text-green-600">Received: ₹{data.received.toLocaleString()}</span>
                      <span className="text-red-600">Pending: ₹{data.pending.toLocaleString()}</span>
                   </div>
                </div>
                <div className="p-4 space-y-4">
                  {data.items.map((booking) => (
                    <div key={booking.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold capitalize">{booking.eventType}</h3>
                          <p className="text-sm text-gray-600">{new Date(booking.eventDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {booking.id}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 block">Total</span>
                          <span className="font-bold">₹{booking.totalAmount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Received</span>
                          <span className="font-bold text-green-600">₹{booking.advancePaid.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block">Pending</span>
                          <span className="font-bold text-orange-600">₹{booking.remainingAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderKhata;