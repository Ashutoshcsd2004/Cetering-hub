import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useData } from '@/contexts/DataContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, MapPin, Users, Star, IndianRupee, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const SearchProviders = () => {
  const { providers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [filters, setFilters] = useState({
    veg: false,
    jain: false,
    satvik: false
  });

  const approvedProviders = providers.filter(p => p.status === 'approved');

  const filteredProviders = approvedProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !areaFilter || provider.area.toLowerCase().includes(areaFilter.toLowerCase());
    const matchesCapacity = !capacityFilter || provider.capacity >= parseInt(capacityFilter);
    
    // Dietary Filters
    const dietary = provider.dietary || [];
    if (filters.veg && !dietary.includes('Veg')) return false;
    if (filters.jain && !dietary.includes('Jain')) return false;
    if (filters.satvik && !dietary.includes('Satvik')) return false;

    return matchesSearch && matchesArea && matchesCapacity;
  });

  return (
    <>
      <Helmet>
        <title>Search Caterers - Haluwai Booking</title>
        <meta name="description" content="Find and book the best catering services in your area" />
      </Helmet>

      <DashboardLayout role="customer">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Search Caterers</h1>
            <p className="text-gray-600">Find the perfect catering service for your event</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Filter by area..."
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Min capacity..."
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center pt-2 border-t">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters:
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.veg} onChange={(e) => setFilters({...filters, veg: e.target.checked})} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm">Pure Veg</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.jain} onChange={(e) => setFilters({...filters, jain: e.target.checked})} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm">Jain Food</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.satvik} onChange={(e) => setFilters({...filters, satvik: e.target.checked})} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm">Satvik</span>
              </label>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-gray-500 text-sm">({provider.totalBookings} bookings)</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {provider.area}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Capacity: {provider.capacity} guests
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      ₹{provider.pricePerPlate}/plate
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {provider.dietary?.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/provider/${provider.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                    <Link to={`/book/${provider.id}`} className="flex-1">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No caterers found matching your criteria</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default SearchProviders;