import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

const ProviderManagePackages = () => {
  const { user } = useAuth();
  const { packages } = useData();
  const { toast } = useToast();

  const providerPackages = packages.filter(p => p.providerId === user.id);

  const handleAction = () => {
    toast({
      title: '🚧 Feature Coming Soon',
      description: 'Package management features will be available soon!'
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Packages - Haluwai Booking</title>
        <meta name="description" content="Create and manage your catering packages" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Packages</h1>
              <p className="text-gray-600">Create custom menu packages for your customers</p>
            </div>
            <Button onClick={handleAction} className="bg-orange-600 hover:bg-orange-700">
              Add Package
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {providerPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-2xl font-bold text-orange-600 mb-4">
                  ₹{pkg.pricePerPlate}/plate
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAction} variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button onClick={handleAction} variant="outline" className="flex-1 text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProviderManagePackages;