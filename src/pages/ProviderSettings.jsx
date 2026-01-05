import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Checkbox } from '@/components/ui/checkbox';

const ProviderSettings = () => {
  const { user } = useAuth();
  const { providers, updateProviders } = useData();
  const { toast } = useToast();
  
  const currentProvider = providers.find(p => p.id === user.id) || {};

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    capacity: '',
    pricePerPlate: '',
    bulkDiscount: '',
    area: '',
    description: '',
    image: '',
    dietary: { veg: false, jain: false, satvik: false, nonveg: false }
  });

  useEffect(() => {
    if (currentProvider.id) {
      setFormData({
        name: currentProvider.name || '',
        specialty: currentProvider.specialty || '',
        capacity: currentProvider.capacity || '',
        pricePerPlate: currentProvider.pricePerPlate || '',
        bulkDiscount: currentProvider.bulkDiscount || '',
        area: currentProvider.area || '',
        description: currentProvider.description || '',
        image: currentProvider.image || '',
        dietary: {
          veg: currentProvider.dietary?.includes('Veg') || false,
          jain: currentProvider.dietary?.includes('Jain') || false,
          satvik: currentProvider.dietary?.includes('Satvik') || false,
          nonveg: currentProvider.dietary?.includes('Non-Veg') || false,
        }
      });
    }
  }, [currentProvider]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct dietary array
    const dietaryArray = [];
    if (formData.dietary.veg) dietaryArray.push('Veg');
    if (formData.dietary.jain) dietaryArray.push('Jain');
    if (formData.dietary.satvik) dietaryArray.push('Satvik');
    if (formData.dietary.nonveg) dietaryArray.push('Non-Veg');

    const updatedProvider = {
      ...currentProvider,
      ...formData,
      dietary: dietaryArray,
      capacity: parseInt(formData.capacity),
      pricePerPlate: parseInt(formData.pricePerPlate),
      bulkDiscount: parseInt(formData.bulkDiscount)
    };

    const updatedProvidersList = providers.map(p => p.id === user.id ? updatedProvider : p);
    updateProviders(updatedProvidersList);
    
    toast({
      title: 'Business Profile Updated',
      description: 'Your business details have been saved successfully.',
    });
  };

  const handleDietaryChange = (key) => {
    setFormData(prev => ({
      ...prev,
      dietary: { ...prev.dietary, [key]: !prev.dietary[key] }
    }));
  };

  return (
    <>
      <Helmet>
        <title>Business Settings - Haluwai Booking</title>
      </Helmet>

      <DashboardLayout role="provider">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Business Profile</h1>
          <p className="text-gray-600">Manage your catering business details visible to customers</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Business Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input 
                  id="specialty" 
                  value={formData.specialty} 
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})} 
                  placeholder="e.g. Wedding Catering"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Location / Area</Label>
                <Input 
                  id="area" 
                  value={formData.area} 
                  onChange={(e) => setFormData({...formData, area: e.target.value})} 
                  placeholder="e.g. Laxmi Nagar, Delhi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Max Capacity (Guests)</Label>
                <Input 
                  id="capacity" 
                  type="number" 
                  value={formData.capacity} 
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerPlate">Base Price Per Plate (₹)</Label>
                <Input 
                  id="pricePerPlate" 
                  type="number" 
                  value={formData.pricePerPlate} 
                  onChange={(e) => setFormData({...formData, pricePerPlate: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bulkDiscount">Bulk Discount (%)</Label>
                <Input 
                  id="bulkDiscount" 
                  type="number" 
                  value={formData.bulkDiscount} 
                  onChange={(e) => setFormData({...formData, bulkDiscount: e.target.value})} 
                  placeholder="For >500 guests"
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input 
                  id="image" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Dietary Options Offered</Label>
                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.dietary.veg} onCheckedChange={() => handleDietaryChange('veg')} />
                    <span>Pure Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.dietary.nonveg} onCheckedChange={() => handleDietaryChange('nonveg')} />
                    <span>Non-Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.dietary.jain} onCheckedChange={() => handleDietaryChange('jain')} />
                    <span>Jain Food</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.dietary.satvik} onCheckedChange={() => handleDietaryChange('satvik')} />
                    <span>Satvik</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">About Your Business</Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="h-32"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
              Save Business Details
            </Button>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderSettings;