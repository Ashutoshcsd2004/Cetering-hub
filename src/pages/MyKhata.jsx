import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Download, Receipt } from 'lucide-react';

const MyKhata = () => {
  const { user } = useAuth();
  const { bookings, providers } = useData();
  const { toast } = useToast();

  const userBookings = bookings.filter(b => b.customerId === user.id);

  const getProviderName = (providerId) => {
    return providers.find(p => p.id === providerId)?.name || 'Unknown Provider';
  };

  const totalAmount = userBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPaid = userBookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const totalPending = userBookings.reduce((sum, b) => sum + b.remainingAmount, 0);

  // Group by month
  const monthlyData = userBookings.reduce((acc, booking) => {
    const month = new Date(booking.eventDate).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = { total: 0, paid: 0, pending: 0, items: [] };
    acc[month].total += booking.totalAmount;
    acc[month].paid += booking.advancePaid;
    acc[month].pending += booking.remainingAmount;
    acc[month].items.push(booking);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>My Khata - Haluwai Booking</title>
        <meta name="description" content="Track your payments and invoices" />
      </Helmet>

      <DashboardLayout role="customer">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Khata (Ledger)</h1>
            <p className="text-gray-600">Track your payments and download invoices</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-600">
              <div className="text-sm text-gray-600 mb-1">Total Lifetime Expense</div>
              <div className="text-3xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="text-sm text-gray-600 mb-1">Total Paid</div>
              <div className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="text-sm text-gray-600 mb-1">Total Pending</div>
              <div className="text-3xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="space-y-6">
            {Object.keys(monthlyData).length === 0 ? (
               <p className="text-center text-gray-500 py-8">No transaction history available.</p>
            ) : (
              Object.entries(monthlyData).map(([month, data]) => (
                <div key={month} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold">{month}</h2>
                    <div className="text-sm font-medium">
                      <span className="mr-4">Spent: ₹{data.total.toLocaleString()}</span>
                      <span className="text-orange-600">Pending: ₹{data.pending.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                     {data.items.map(booking => (
                       <div key={booking.id} className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0">
                         <div>
                           <div className="font-semibold">{getProviderName(booking.providerId)}</div>
                           <div className="text-sm text-gray-500 capitalize">{booking.eventType} • {new Date(booking.eventDate).toLocaleDateString()}</div>
                         </div>
                         <div className="text-right text-sm">
                           <div className="font-medium">₹{booking.totalAmount.toLocaleString()}</div>
                           <div className={`text-xs ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                             {booking.paymentStatus.toUpperCase()}
                           </div>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MyKhata;