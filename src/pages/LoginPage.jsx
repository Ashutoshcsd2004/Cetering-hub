import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ChefHat, Mail, Phone, User, Shield, Lock } from 'lucide-react';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = () => {
    if (loginType === 'email' && !email) {
      toast({ title: 'Error', description: 'Please enter email', variant: 'destructive' });
      return;
    }

    if (loginType === 'mobile' && !mobile) {
      toast({ title: 'Error', description: 'Please enter mobile number', variant: 'destructive' });
      return;
    }

    if (!password) {
      toast({ title: 'Error', description: 'Please enter password', variant: 'destructive' });
      return;
    }

    // 🔐 DEMO PASSWORD CHECK
    if (password !== 'admin123') {
      toast({
        title: 'Invalid Password',
        description: 'Demo password is admin123',
        variant: 'destructive',
      });
      return;
    }

    const userData = {
      id: role + '1',
      email: email || `${mobile}@demo.com`,
      mobile: mobile || '9876543210',
      role,
      name:
        role === 'customer'
          ? 'Demo Customer'
          : role === 'provider'
          ? 'Royal Haluwai Services'
          : 'Admin User',
    };

    login(userData);
    toast({ title: 'Success', description: 'Login successful!' });

    navigate(
      role === 'customer'
        ? '/dashboard'
        : role === 'provider'
        ? '/provider/dashboard'
        : '/admin/dashboard'
    );
  };

  return (
    <>
      <Helmet>
        <title>Login - Haluwai & Catering Booking System</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* HEADER */}
            <div className="flex items-center justify-center mb-8">
              <ChefHat className="h-12 w-12 text-orange-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            </div>

            {/* ROLE SELECTION */}
            <Tabs value={role} onValueChange={setRole} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="customer"
                  className="border transition-all
                    data-[state=active]:bg-orange-100
                    data-[state=active]:text-orange-700
                    data-[state=active]:border-orange-400"
                >
                  <User className="h-4 w-4 mr-2" />
                  Customer
                </TabsTrigger>

                <TabsTrigger
                  value="provider"
                  className="border transition-all
                    data-[state=active]:bg-orange-100
                    data-[state=active]:text-orange-700
                    data-[state=active]:border-orange-400"
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Provider
                </TabsTrigger>

                <TabsTrigger
                  value="admin"
                  className="border transition-all
                    data-[state=active]:bg-orange-100
                    data-[state=active]:text-orange-700
                    data-[state=active]:border-orange-400"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* EMAIL / MOBILE */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setLoginType('email')}
                className={`flex-1 transition-all
                  ${loginType === 'email'
                    ? 'bg-orange-100 text-orange-700 border border-orange-400'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>

              <Button
                onClick={() => setLoginType('mobile')}
                className={`flex-1 transition-all
                  ${loginType === 'mobile'
                    ? 'bg-orange-100 text-orange-700 border border-orange-400'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <Phone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>

            {/* INPUTS */}
            <div className="space-y-4">
              {loginType === 'email' ? (
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <Label>Mobile Number</Label>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              )}

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Demo password: <b>admin123</b>
                </p>
              </div>

              <Button onClick={handleLogin} className="w-full bg-orange-600 hover:bg-orange-700">
                <Lock className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
