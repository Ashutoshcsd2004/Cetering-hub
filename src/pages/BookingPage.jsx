import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Wallet, CreditCard, Banknote } from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { providers, packages, menuItems, updateBookings, bookings, addNotification } = useData();
  const { toast } = useToast();

  const provider = providers.find(p => p.id === id);
  const providerPackages = packages.filter(p => p.providerId === id);
  const providerMenuItems = menuItems.filter(m => m.providerId === id);

  const [bookingType, setBookingType] = useState('package'); // 'package' or 'custom'
  const [formData, setFormData] = useState({
    eventType: 'wedding',
    eventDate: '',
    endDate: '', // For multi-day
    guestCount: '',
    location: '',
    selectedPackage: providerPackages[0]?.id || '',
    customItems: [],
    advanceAmount: '',
    extraCharges: {
      decoration: false,
      liveCounter: false
    }
  });
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Bulk rate calculation logic
  const getDiscountedPrice = (basePrice) => {
    if (formData.guestCount > 500 && provider.bulkDiscount) {
      return basePrice * (1 - provider.bulkDiscount / 100);
    }
    return basePrice;
  };

  const calculateTotal = () => {
    let total = 0;
    if (bookingType === 'package') {
      const pkg = packages.find(p => p.id === formData.selectedPackage);
      const price = pkg ? pkg.pricePerPlate : provider.pricePerPlate;
      total = (parseInt(formData.guestCount) || 0) * getDiscountedPrice(price);
    } else {
      const itemsTotal = formData.customItems.reduce((sum, itemId) => {
        const item = menuItems.find(i => i.id === itemId);
        return sum + (item ? item.price : 0);
      }, 0);
      // Base service charge + item cost
      total = (parseInt(formData.guestCount) || 0) * (itemsTotal + 100); // 100 base service charge
    }

    // Add extra days
    if (formData.eventDate && formData.endDate && formData.endDate > formData.eventDate) {
      const days = (new Date(formData.endDate) - new Date(formData.eventDate)) / (1000 * 60 * 60 * 24) + 1;
      total = total * days;
    }

    // Extra charges
    if (formData.extraCharges.decoration) total += 5000;
    if (formData.extraCharges.liveCounter) total += 3000;

    return Math.round(total);
  };

  const totalAmount = calculateTotal();

  const handleCustomItemToggle = (itemId) => {
    setFormData(prev => {
      const newItems = prev.customItems.includes(itemId)
        ? prev.customItems.filter(id => id !== itemId)
        : [...prev.customItems, itemId];
      return { ...prev, customItems: newItems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.eventDate || !formData.guestCount || !formData.location) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    setShowPaymentModal(true);
  };

  const confirmBooking = () => {
    const advancePaid = parseInt(formData.advanceAmount) || 0;
    
    const newBooking = {
      id: `booking${Date.now()}`,
      customerId: user.id,
      providerId: provider.id,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      endDate: formData.endDate || formData.eventDate,
      guestCount: parseInt(formData.guestCount),
      location: formData.location,
      selectedPackage: bookingType === 'package' ? formData.selectedPackage : null,
      customItems: bookingType === 'custom' ? formData.customItems : [],
      totalAmount,
      advancePaid,
      remainingAmount: totalAmount - advancePaid,
      status: 'pending',
      paymentStatus: advancePaid >= totalAmount ? 'paid' : advancePaid > 0 ? 'partial' : 'pending',
      createdAt: new Date().toISOString(),
      extraCharges: (formData.extraCharges.decoration ? 5000 : 0) + (formData.extraCharges.liveCounter ? 3000 : 0)
    };

    updateBookings([...bookings, newBooking]);

    addNotification({
      userId: provider.id,
      type: 'booking',
      message: `New booking request for ${formData.eventType}`,
      read: false
    });

    // WhatsApp Share
    const waMessage = `Hi, I just booked ${provider.name} for my ${formData.eventType} on ${formData.eventDate}. Total amount: ₹${totalAmount}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, '_blank');

    toast({ title: 'Success', description: 'Booking request submitted successfully!' });
    navigate('/my-bookings');
  };

  if (!provider) return <div className="p-8 text-center">Provider not found</div>;

  return (
    <>
      <Helmet>
        <title>Book {provider.name} - Haluwai Booking</title>
      </Helmet>

      <DashboardLayout role="customer">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Book Catering Service</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <Label htmlFor="eventType">Event Type</Label>
                    <select
                      id="eventType"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    >
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="mundan">Mundan Ceremony</option>
                      <option value="reception">Reception</option>
                      <option value="engagement">Engagement</option>
                    </select>
                  </div>
                   <div>
                    <Label htmlFor="guestCount">Guest Count</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value, endDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label>End Date (Multi-day)</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.eventDate}
                    />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event Venue Address"
                    required
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Menu Selection</Label>
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant={bookingType === 'package' ? 'default' : 'outline'}
                      onClick={() => setBookingType('package')}
                      className={bookingType === 'package' ? 'bg-orange-600' : ''}
                    >
                      Select Package
                    </Button>
                    <Button 
                      type="button"
                      variant={bookingType === 'custom' ? 'default' : 'outline'}
                      onClick={() => setBookingType('custom')}
                      className={bookingType === 'custom' ? 'bg-orange-600' : ''}
                    >
                      Create Custom Menu
                    </Button>
                  </div>

                  {bookingType === 'package' ? (
                    <select
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      value={formData.selectedPackage}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                    >
                      {providerPackages.map(pkg => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} - ₹{pkg.pricePerPlate}/plate
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto border p-4 rounded-lg">
                      {providerMenuItems.map(item => (
                        <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox 
                            checked={formData.customItems.includes(item.id)}
                            onCheckedChange={() => handleCustomItemToggle(item.id)}
                          />
                          <span className="text-sm">{item.name} (₹{item.price})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Extra Services</Label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={formData.extraCharges.decoration}
                        onCheckedChange={(checked) => setFormData({...formData, extraCharges: {...formData.extraCharges, decoration: checked}})}
                      />
                      <span>Decoration (+₹5000)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={formData.extraCharges.liveCounter}
                        onCheckedChange={(checked) => setFormData({...formData, extraCharges: {...formData.extraCharges, liveCounter: checked}})}
                      />
                      <span>Live Counter (+₹3000)</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  Proceed to Payment
                </Button>
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{bookingType === 'package' ? (packages.find(p=>p.id===formData.selectedPackage)?.pricePerPlate || 0) : 'Custom'}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount:</span>
                    <span>{formData.guestCount > 500 ? `${provider.bulkDiscount}%` : '0%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extras:</span>
                    <span>₹{(formData.extraCharges.decoration ? 5000 : 0) + (formData.extraCharges.liveCounter ? 3000 : 0)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                     <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded mt-4">
                    <Label className="mb-2 block">Advance Payment</Label>
                    <Input 
                      type="number" 
                      value={formData.advanceAmount}
                      onChange={(e) => setFormData({...formData, advanceAmount: e.target.value})}
                      placeholder="Min 20%"
                    />
                    <p className="text-xs text-orange-600 mt-1">Remaining: ₹{(totalAmount - (parseInt(formData.advanceAmount)||0)).toLocaleString()}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2" onClick={() => window.print()}>
                    Download Quotation PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Payment Method</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setPaymentMethod('UPI')}>
                <Wallet className="h-8 w-8 text-orange-600" />
                UPI / QR Code
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setPaymentMethod('Card')}>
                <CreditCard className="h-8 w-8 text-blue-600" />
                Debit/Credit Card
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setPaymentMethod('NetBanking')}>
                <Banknote className="h-8 w-8 text-green-600" />
                Net Banking
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setPaymentMethod('Cash')}>
                <Banknote className="h-8 w-8 text-gray-600" />
                Cash / Cheque
              </Button>
            </div>
            {paymentMethod && (
              <Button className="w-full bg-orange-600" onClick={confirmBooking}>
                Pay ₹{(parseInt(formData.advanceAmount) || 0).toLocaleString()} & Confirm
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default BookingPage;