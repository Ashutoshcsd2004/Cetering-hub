import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, ArrowLeft } from 'lucide-react';

const CancellationPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cancellation Policy - Haluwai Booking</title>
        <meta name="description" content="Cancellation and refund policy for Haluwai Booking platform" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold text-gray-900">Haluwai Booking</span>
              </Link>
              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Cancellation by Customer</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg">More than 30 days before event</h3>
                  <p className="text-gray-700">100% refund of advance payment</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-lg">15-30 days before event</h3>
                  <p className="text-gray-700">50% refund of advance payment</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg">7-14 days before event</h3>
                  <p className="text-gray-700">25% refund of advance payment</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-lg">Less than 7 days before event</h3>
                  <p className="text-gray-700">No refund</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cancellation by Provider</h2>
              <p className="text-gray-700 mb-2">
                If a catering provider cancels a confirmed booking, the customer is entitled to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>100% refund of all payments made</li>
                <li>Assistance in finding an alternative provider</li>
                <li>Compensation as per platform policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Force Majeure</h2>
              <p className="text-gray-700">
                In case of events beyond control (natural disasters, government restrictions, etc.), both parties can mutually agree on rescheduling or cancellation terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
              <p className="text-gray-700">
                Approved refunds will be processed within 7-10 business days to the original payment method.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancellationPolicy;