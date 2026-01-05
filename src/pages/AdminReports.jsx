import React from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';

const AdminReports = () => {
  const { bookings, providers } = useData();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  
  // Calculate P&L based on mock commission
  const totalCommission = totalRevenue * 0.10; // 10% average commission
  const platformExpenses = 50000; // Mock fixed monthly expense
  const netProfit = totalCommission - platformExpenses;

  const monthlyBookings = bookings.filter(b => {
    const bookingDate = new Date(b.createdAt);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
  }).length;

  const topProviders = providers
    .map(provider => ({
      ...provider,
      bookingCount: bookings.filter(b => b.providerId === provider.id).length
    }))
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Reports & Analytics - Admin</title>
        <meta name="description" content="Platform analytics and reports" />
      </Helmet>

      <DashboardLayout role="admin">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Platform Reports & Analytics</h1>

          {/* Financial Summary */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="text-sm text-gray-600 mb-1">Total Revenue (GMV)</div>
              <div className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="text-sm text-gray-600 mb-1">Total Commission (est.)</div>
              <div className="text-2xl font-bold text-blue-600">₹{totalCommission.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="text-sm text-gray-600 mb-1">Platform Expenses</div>
              <div className="text-2xl font-bold text-red-600">₹{platformExpenses.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="text-sm text-gray-600 mb-1">Net Profit</div>
              <div className="text-2xl font-bold text-purple-600">₹{netProfit.toLocaleString()}</div>
            </div>
          </div>
          
          {/* Simple Charts (CSS) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Booking Trend (Last 6 Months)</h2>
              <div className="flex items-end justify-between h-48 space-x-2">
                {[45, 60, 35, 80, 50, monthlyBookings].map((val, i) => (
                  <div key={i} className="flex flex-col items-center w-full group">
                    <div className="w-full bg-blue-100 rounded-t-lg relative group-hover:bg-blue-200 transition-all" style={{ height: `${val}%` }}>
                       <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100">{val}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{['Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Top Performing Caterers</h2>
              <div className="space-y-4">
                {topProviders.map((provider, index) => (
                  <div key={provider.id} className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-400 w-6">#{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{provider.name}</span>
                        <span className="text-sm text-gray-600">{provider.bookingCount} bookings</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(provider.bookingCount / 20) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminReports;