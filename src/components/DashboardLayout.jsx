import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat, Home, Search, Calendar, Receipt, Menu as MenuIcon, X, LogOut, UtensilsCrossed, Package, Users, BarChart3, Settings, Bell, HelpCircle, UserCircle, MessageSquare as MessageSquareWarning } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const customerLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: UserCircle, label: 'My Profile', path: '/profile' },
    { icon: Search, label: 'Search Caterers', path: '/search' },
    { icon: Calendar, label: 'My Bookings', path: '/my-bookings' },
    { icon: Receipt, label: 'My Khata', path: '/my-khata' }
  ];

  const providerLinks = [
    { icon: Home, label: 'Dashboard', path: '/provider/dashboard' },
    { icon: Settings, label: 'Business Profile', path: '/provider/settings' },
    { icon: UtensilsCrossed, label: 'Manage Menu', path: '/provider/menu' },
    { icon: Package, label: 'Packages', path: '/provider/packages' },
    { icon: Calendar, label: 'Bookings', path: '/provider/bookings' },
    { icon: Receipt, label: 'Khata', path: '/provider/khata' },
    { icon: BarChart3, label: 'Earnings', path: '/provider/earnings' }
  ];

  const adminLinks = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Providers', path: '/admin/providers' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: MessageSquareWarning, label: 'Complaints', path: '/admin/complaints' }
  ];

  const links = role === 'customer' ? customerLinks : role === 'provider' ? providerLinks : adminLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X /> : <MenuIcon />}
              </Button>
              <Link to="/" className="flex items-center gap-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Haluwai Booking</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/help">
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <div className="text-right">
                  <div className="font-medium text-sm">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          mt-16 lg:mt-0
        `}>
          <nav className="p-4 space-y-2">
            {links.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={index} to={link.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start ${isActive ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden mt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;