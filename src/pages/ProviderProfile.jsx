import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { MapPin, Users, Star, IndianRupee, Heart, Award, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProviderProfile = () => {
  const { id } = useParams();
  const { providers, menuItems, packages, reviews, favorites, toggleFavorite } = useData();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const provider = providers.find(p => p.id === id);
  const providerMenuItems = menuItems.filter(m => m.providerId === id);
  const providerPackages = packages.filter(p => p.providerId === id);
  const providerReviews = reviews.filter(r => r.providerId === id);
  
  // Dynamic Rating Calculation
  const averageRating = providerReviews.length > 0 
    ? (providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length).toFixed(1)
    : provider?.rating || 'New';

  const isFavorite = favorites.some(f => f.userId === user?.id && f.providerId === id);

  const handleFavorite = () => {
    toggleFavorite(user.id, id);
    toast({
      title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      description: isFavorite ? 'Provider removed from your favorites list.' : 'Provider saved to your favorites list.'
    });
  };

  if (!provider) {
    return (
      <DashboardLayout role="customer">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Provider not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{provider.name} - Haluwai Booking</title>
        <meta name="description" content={provider.description} />
      </Helmet>

      <DashboardLayout role="customer">
        <div className="space-y-6">
          {/* Provider Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-64">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className={`rounded-full shadow-lg ${isFavorite ? 'text-red-500 bg-white' : 'text-gray-600 bg-white'}`}
                  onClick={handleFavorite}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    {provider.name}
                    {provider.certificates?.length > 0 && (
                      <CheckCircle2 className="h-6 w-6 text-blue-500" title="Verified Provider" />
                    )}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-lg">{averageRating}</span>
                    <span className="text-gray-500">({providerReviews.length} reviews)</span>
                    <span className="mx-2 text-gray-300">|</span>
                    {provider.dietary?.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                   <Button variant="outline" onClick={() => window.open(`https://wa.me/?text=Check out ${provider.name} on Haluwai Booking!`, '_blank')}>
                    Share
                  </Button>
                  <Link to={`/book/${provider.id}`}>
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-5 w-5" />
                  {provider.area}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-5 w-5" />
                  Capacity: {provider.capacity} guests
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <IndianRupee className="h-5 w-5" />
                  ₹{provider.pricePerPlate}/plate
                </div>
              </div>
              
              <p className="text-gray-700">{provider.description}</p>
            </div>
          </div>

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="w-full justify-start bg-white p-2 rounded-lg shadow-sm mb-4">
              <TabsTrigger value="menu">Menu & Packages</TabsTrigger>
              <TabsTrigger value="photos">Kitchen Photos</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-6">
              {/* Packages */}
              {providerPackages.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Available Packages</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {providerPackages.map((pkg) => (
                      <div key={pkg.id} className="border rounded-lg p-4">
                        <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                        <div className="font-bold text-orange-600">₹{pkg.pricePerPlate}/plate</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menu Items */}
              {providerMenuItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {providerMenuItems.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                        <div className="p-3">
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                            <span className={`h-2 w-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          </div>
                          <p className="font-bold text-orange-600 mt-2">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="photos">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Kitchen & Facility Photos</h2>
                {provider.kitchenPhotos && provider.kitchenPhotos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {provider.kitchenPhotos.map((photo, idx) => (
                      <img key={idx} src={photo} alt={`Kitchen ${idx}`} className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer" />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No photos available.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="space-y-6">
                  {providerReviews.length > 0 ? providerReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.image && (
                        <img src={review.image} alt="Review" className="w-32 h-32 object-cover rounded-lg" />
                      )}
                    </div>
                  )) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="h-6 w-6 text-orange-600"/> Certifications</h2>
                 {provider.certificates && provider.certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {provider.certificates.map((photo, idx) => (
                      <div key={idx} className="border p-2 rounded-lg">
                        <img src={photo} alt={`Certificate ${idx}`} className="w-full h-auto object-contain rounded" />
                        <p className="text-center text-sm mt-2 font-medium">FSSAI / Health License</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No certificates uploaded.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderProfile;