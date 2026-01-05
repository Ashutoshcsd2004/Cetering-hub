import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Haluwai Booking</title>
        <meta name="description" content="Terms and conditions for using Haluwai Booking platform" />
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
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Haluwai Booking platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. User Responsibilities</h2>
              <p className="text-gray-700 mb-2">Users must:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the confidentiality of account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Booking Policy</h2>
              <p className="text-gray-700 mb-2">
                All bookings are subject to availability and confirmation by the catering provider. The platform acts as an intermediary and is not responsible for service delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-2">
                Payments must be made as per the agreed terms with the catering provider. Advance payments are non-refundable unless specified in the cancellation policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                The platform is not liable for any damages arising from the use of services, including but not limited to food quality, service delivery, or any disputes between users and providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;