import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Check, X } from 'lucide-react';

const ProviderManageBookings = () => {
  const { user } = useAuth();
  const { bookings, updateBookings } = useData();
  const { toast } = useToast();

  const providerBookings = bookings.filter(b => b.providerId === user.id);

  const handleAccept = (bookingId) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'confirmed' } : b
    );
    updateBookings(updated);
    toast({ title: 'Success', description: 'Booking confirmed!' });
  };

  const handleReject = (bookingId) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    updateBookings(updated);
    toast({ title: 'Booking Rejected', description: 'Booking has been cancelled' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Bookings - Haluwai Booking</title>
        <meta name="description" content="Manage your catering bookings" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
            <p className="text-gray-600">Accept or reject booking requests</p>
          </div>

          {providerBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {providerBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold capitalize">{booking.eventType}</h3>
                      <p className="text-gray-600">Date: {new Date(booking.eventDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Guests:</span>
                      <p className="font-medium">{booking.guestCount}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <p className="font-medium">{booking.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Advance:</span>
                      <p className="font-medium text-green-600">₹{booking.advancePaid.toLocaleString()}</p>
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleAccept(booking.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button 
                        onClick={() => handleReject(booking.id)}
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderManageBookings;