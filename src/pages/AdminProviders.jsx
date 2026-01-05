import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

const AdminProviders = () => {
  const { providers, updateProviders } = useData();
  const { toast } = useToast();

  const handleApprove = (providerId) => {
    const updated = providers.map(p =>
      p.id === providerId ? { ...p, status: 'approved' } : p
    );
    updateProviders(updated);
    toast({ title: 'Success', description: 'Provider approved!' });
  };

  const handleBlock = (providerId) => {
    const updated = providers.map(p =>
      p.id === providerId ? { ...p, status: 'blocked' } : p
    );
    updateProviders(updated);
    toast({ title: 'Provider Blocked', description: 'Provider has been blocked' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Providers - Admin</title>
        <meta name="description" content="Approve or block catering providers" />
      </Helmet>

      <DashboardLayout role="admin">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Manage Providers</h1>

          <div className="space-y-4">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img src={provider.image} alt={provider.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="text-xl font-bold">{provider.name}</h3>
                      <p className="text-gray-600">{provider.area}</p>
                      <p className="text-sm text-gray-500">{provider.email}</p>
                      <div className="mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          provider.status === 'approved' ? 'bg-green-100 text-green-800' :
                          provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {provider.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {provider.status !== 'approved' && (
                      <Button onClick={() => handleApprove(provider.id)} className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                    )}
                    {provider.status !== 'blocked' && (
                      <Button onClick={() => handleBlock(provider.id)} variant="outline" className="text-red-600">
                        Block
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminProviders;