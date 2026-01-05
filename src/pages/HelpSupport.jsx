import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ChefHat, ArrowLeft, Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';

const HelpSupport = () => {
  const { toast } = useToast();

  const handleContact = (method) => {
    toast({
      title: '🚧 Feature Coming Soon',
      description: `${method} support will be available soon! For now, please email support@haluwaibooking.com`
    });
  };

  const faqs = [
    {
      question: 'How do I book a catering service?',
      answer: 'Search for caterers in your area, view their profiles and menus, then click "Book Now" to create a booking request.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major payment methods including UPI, credit/debit cards, and net banking.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking according to our cancellation policy. Refund amounts depend on the cancellation timing.'
    },
    {
      question: 'How do I become a catering provider?',
      answer: 'Sign up as a provider, complete your profile, and wait for admin approval. Once approved, you can start accepting bookings.'
    },
    {
      question: 'What if the caterer cancels my booking?',
      answer: 'You will receive a full refund and we will assist you in finding an alternative provider.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help & Support - Haluwai Booking</title>
        <meta name="description" content="Get help and support for Haluwai Booking platform" />
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
          <h1 className="text-4xl font-bold mb-8">Help & Support</h1>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleContact('Email')}
            >
              <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">support@haluwaibooking.com</p>
            </div>
            <div 
              className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleContact('Phone')}
            >
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </div>
            <div 
              className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleContact('Chat')}
            >
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Available 9 AM - 6 PM</p>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-orange-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;