import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, MapPin, Users, IndianRupee, Star, Download, AlertTriangle, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MyBookings = () => {
  const { user } = useAuth();
  const { bookings, providers, updateReviews, updateComplaints, complaints } = useData();
  const { toast } = useToast();
  
  // Review State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [reviewOpen, setReviewOpen] = useState(false);

  // Complaint State
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [complaintText, setComplaintText] = useState('');

  const userBookings = bookings.filter(b => b.customerId === user.id);

  const getProviderName = (providerId) => {
    return providers.find(p => p.id === providerId)?.name || 'Unknown Provider';
  };

  const handleReviewSubmit = () => {
    const newReview = {
      id: `review${Date.now()}`,
      bookingId: selectedBooking.id,
      customerId: user.id,
      providerId: selectedBooking.providerId,
      rating,
      comment,
      image: reviewImage,
      createdAt: new Date().toISOString()
    };
    updateReviews(prev => [...prev, newReview]); // Need to fetch existing first, assumed handled in context
    setReviewOpen(false);
    toast({ title: 'Review Submitted', description: 'Thank you for your feedback!' });
  };

  const handleComplaintSubmit = () => {
    const newComplaint = {
      id: `complaint${Date.now()}`,
      bookingId: selectedBooking.id,
      userId: user.id,
      message: complaintText,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    updateComplaints([...complaints, newComplaint]);
    setComplaintOpen(false);
    toast({ title: 'Complaint Filed', description: 'Our support team will contact you shortly.' });
  };

  const generateInvoice = (booking) => {
    // Simple mock invoice generation
    const invoiceContent = `
      INVOICE #${booking.id.toUpperCase()}
      Date: ${new Date().toLocaleDateString()}
      --------------------------------
      Provider: ${getProviderName(booking.providerId)}
      Customer: ${user.name}
      Event: ${booking.eventType} on ${booking.eventDate}
      
      Total Amount: ₹${booking.totalAmount}
      Advance Paid: ₹${booking.advancePaid}
      --------------------------------
      Balance Due:  ₹${booking.remainingAmount}
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${booking.id}.txt`;
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>My Bookings - Haluwai Booking</title>
      </Helmet>

      <DashboardLayout role="customer">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

          {userBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
              <Button onClick={() => window.location.href = '/search'} className="bg-orange-600">Search Caterers</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{getProviderName(booking.providerId)}</h3>
                      <p className="text-gray-600 capitalize">{booking.eventType} • {new Date(booking.eventDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm" onClick={() => generateInvoice(booking)}>
                        <Download className="h-4 w-4 mr-2" /> Invoice
                      </Button>
                      {booking.status === 'completed' && (
                        <Button size="sm" onClick={() => { setSelectedBooking(booking); setReviewOpen(true); }} className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="h-4 w-4 mr-2" /> Review
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedBooking(booking); setComplaintOpen(true); }} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-5 w-5" /> {booking.guestCount} guests
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-5 w-5" /> {booking.location}
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-between font-medium pt-2 border-t border-gray-200">
                       <span className="text-green-600">Paid: ₹{booking.advancePaid.toLocaleString()}</span>
                       <span className="text-orange-600">Due: ₹{booking.remainingAmount.toLocaleString()}</span>
                       <span className="font-bold">Total: ₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Review Dialog */}
        <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Rate & Review</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-8 w-8 cursor-pointer ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <Textarea 
                placeholder="Share your experience..." 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
              />
              <div>
                <Label>Upload Photo</Label>
                <div className="mt-2 flex items-center gap-2">
                   <Input 
                    placeholder="Image URL" 
                    value={reviewImage} 
                    onChange={(e) => setReviewImage(e.target.value)} 
                   />
                </div>
              </div>
              <Button onClick={handleReviewSubmit} className="w-full bg-orange-600">Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Complaint Dialog */}
        <Dialog open={complaintOpen} onOpenChange={setComplaintOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>File a Complaint</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea 
                placeholder="Describe your issue..." 
                value={complaintText} 
                onChange={(e) => setComplaintText(e.target.value)}
                className="min-h-[100px]" 
              />
              <Button onClick={handleComplaintSubmit} variant="destructive" className="w-full">Submit Complaint</Button>
            </div>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default MyBookings;