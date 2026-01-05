import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Calendar, Users, Star, TrendingUp, Shield } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Professional Caterers',
      description: 'Connect with verified and experienced catering professionals'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book your event catering in just a few clicks'
    },
    {
      icon: Users,
      title: 'Flexible Capacity',
      description: 'From intimate gatherings to large celebrations'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Rated services with customer reviews and ratings'
    },
    {
      icon: TrendingUp,
      title: 'Transparent Pricing',
      description: 'Clear pricing with no hidden charges'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment options'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Haluwai & Catering Booking System - Book Best Caterers</title>
        <meta name="description" content="Book professional catering services for weddings, birthdays, and events. Find the best haluwai and caterers in your area with transparent pricing." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold text-gray-900">Haluwai Booking</span>
              </div>
              <Link to="/login">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Login / Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Book Premium <span className="text-orange-600">Catering Services</span> for Your Events
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Connect with the best haluwai and caterers in your city. From weddings to birthday parties, we've got you covered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/help">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img 
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  alt="Professional catering service setup"
                 src="https://images.unsplash.com/photo-1681497886121-eeebd5dc67a5" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600">Everything you need to make your event memorable</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-pink-50 hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Book Your Event Catering?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of satisfied customers who trusted us for their special occasions
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Start Booking Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ChefHat className="h-6 w-6 text-orange-600" />
                  <span className="text-lg font-bold">Haluwai Booking</span>
                </div>
                <p className="text-gray-400">
                  Your trusted platform for booking professional catering services
                </p>
              </div>
              <div>
                <span className="font-semibold mb-4 block">Quick Links</span>
                <div className="flex flex-col gap-2">
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                  <Link to="/cancellation-policy" className="text-gray-400 hover:text-white transition-colors">
                    Cancellation Policy
                  </Link>
                  <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                    Help & Support
                  </Link>
                </div>
              </div>
              <div>
                <span className="font-semibold mb-4 block">Contact</span>
                <p className="text-gray-400">Email: support@haluwaibooking.com</p>
                <p className="text-gray-400">Phone: +91 98765 43210</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Haluwai Booking. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;