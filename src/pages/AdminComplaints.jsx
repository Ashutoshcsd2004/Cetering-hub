import React from 'react';
import { Helmet } from 'react-helmet';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const AdminComplaints = () => {
  const { complaints, updateComplaints } = useData();
  const { toast } = useToast();

  const handleResolve = (id) => {
    const updated = complaints.map(c => c.id === id ? { ...c, status: 'resolved' } : c);
    updateComplaints(updated);
    toast({ title: 'Success', description: 'Complaint marked as resolved' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Complaints - Admin</title>
      </Helmet>

      <DashboardLayout role="admin">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Customer Complaints</h1>

          <div className="bg-white rounded-xl shadow-md p-6">
            {complaints.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No complaints found.</p>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border p-4 rounded-lg flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                         <span className={`px-2 py-0.5 text-xs rounded-full uppercase font-bold ${complaint.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {complaint.status}
                         </span>
                         <span className="text-sm text-gray-500">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-800">{complaint.message}</p>
                      <p className="text-sm text-gray-500 mt-1">Booking ID: {complaint.bookingId}</p>
                    </div>
                    {complaint.status === 'open' && (
                      <Button size="sm" onClick={() => handleResolve(complaint.id)} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" /> Resolve
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminComplaints;