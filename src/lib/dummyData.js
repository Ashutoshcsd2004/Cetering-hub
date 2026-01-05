export const generateDummyData = () => {
  const providers = [
    {
      id: 'provider1',
      name: 'Royal Haluwai Services',
      email: 'royal@haluwai.com',
      mobile: '9876543210',
      role: 'provider',
      area: 'Laxmi Nagar, Delhi',
      capacity: 500,
      specialty: 'Wedding Catering',
      description: 'Premium wedding catering with traditional Indian cuisine. We have been serving since 1995.',
      pricePerPlate: 350,
      bulkDiscount: 10,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
      kitchenPhotos: [
        'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=400',
        'https://images.unsplash.com/photo-1512485800893-b08ec5a7a61d?w=400',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
      ],
      certificates: [
        'https://images.unsplash.com/photo-1589330694653-5d5424842b00?w=400'
      ],
      dietary: ['Veg', 'Jain'],
      status: 'approved',
      rating: 4.5,
      totalBookings: 45,
      commissionRate: 10
    },
    {
      id: 'provider2',
      name: 'Sharma Catering',
      email: 'sharma@catering.com',
      mobile: '9876543211',
      role: 'provider',
      area: 'Rajouri Garden, Delhi',
      capacity: 300,
      specialty: 'Birthday Parties',
      description: 'Specialized in birthday party catering with variety of cuisines including Chinese and Italian.',
      pricePerPlate: 250,
      bulkDiscount: 8,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800',
      kitchenPhotos: [
        'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400'
      ],
      certificates: [],
      dietary: ['Veg', 'Non-Veg'],
      status: 'approved',
      rating: 4.2,
      totalBookings: 32,
      commissionRate: 12
    },
    {
      id: 'provider3',
      name: 'Maharaja Caterers',
      email: 'maharaja@caterers.com',
      mobile: '9876543212',
      role: 'provider',
      area: 'Pitampura, Delhi',
      capacity: 1000,
      specialty: 'Corporate Events',
      description: 'Large scale corporate event catering with multi-cuisine options. Professional service guaranteed.',
      pricePerPlate: 400,
      bulkDiscount: 15,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      kitchenPhotos: [],
      certificates: [],
      dietary: ['Veg', 'Satvik'],
      status: 'approved',
      rating: 4.7,
      totalBookings: 67,
      commissionRate: 15
    }
  ];

  const menuItems = [
    // Provider 1 items
    { id: 'item1', providerId: 'provider1', name: 'Paneer Butter Masala', category: 'Main Course', price: 150, image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400', type: 'Veg' },
    { id: 'item2', providerId: 'provider1', name: 'Dal Makhani', category: 'Main Course', price: 120, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400', type: 'Veg' },
    { id: 'item3', providerId: 'provider1', name: 'Naan', category: 'Bread', price: 30, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', type: 'Veg' },
    { id: 'item4', providerId: 'provider1', name: 'Gulab Jamun', category: 'Dessert', price: 50, image: 'https://images.unsplash.com/photo-1589119908995-c6e5c6d0e060?w=400', type: 'Veg' },
    
    // Provider 2 items
    { id: 'item5', providerId: 'provider2', name: 'Veg Biryani', category: 'Main Course', price: 180, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', type: 'Veg' },
    { id: 'item6', providerId: 'provider2', name: 'Pasta', category: 'Main Course', price: 160, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', type: 'Veg' },
    { id: 'item7', providerId: 'provider2', name: 'Spring Roll', category: 'Starter', price: 80, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', type: 'Veg' },
    
    // Provider 3 items
    { id: 'item8', providerId: 'provider3', name: 'Chicken Tikka', category: 'Starter', price: 200, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', type: 'Non-Veg' },
    { id: 'item9', providerId: 'provider3', name: 'Mutton Curry', category: 'Main Course', price: 250, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', type: 'Non-Veg' },
    { id: 'item10', providerId: 'provider3', name: 'Ice Cream', category: 'Dessert', price: 60, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', type: 'Veg' }
  ];

  const packages = [
    {
      id: 'pkg1',
      providerId: 'provider1',
      name: 'Wedding Special Package',
      items: ['item1', 'item2', 'item3', 'item4'],
      pricePerPlate: 350,
      description: 'Complete wedding menu with premium items'
    },
    {
      id: 'pkg2',
      providerId: 'provider2',
      name: 'Birthday Bash Package',
      items: ['item5', 'item6', 'item7'],
      pricePerPlate: 250,
      description: 'Fun birthday party menu with variety'
    },
    {
      id: 'pkg3',
      providerId: 'provider3',
      name: 'Corporate Premium Package',
      items: ['item8', 'item9', 'item10'],
      pricePerPlate: 400,
      description: 'High-end corporate catering package'
    }
  ];

  const bookings = [
    {
      id: 'booking1',
      customerId: 'customer1',
      providerId: 'provider1',
      eventType: 'wedding',
      eventDate: '2025-01-15',
      endDate: '2025-01-15',
      guestCount: 200,
      location: 'Banquet Hall, Connaught Place',
      selectedPackage: 'pkg1',
      customItems: [],
      totalAmount: 70000,
      advancePaid: 20000,
      remainingAmount: 50000,
      status: 'confirmed',
      paymentStatus: 'partial',
      createdAt: '2024-12-20',
      extraCharges: 0
    },
    {
      id: 'booking2',
      customerId: 'customer2',
      providerId: 'provider2',
      eventType: 'birthday',
      eventDate: '2025-01-10',
      endDate: '2025-01-10',
      guestCount: 50,
      location: 'Home, Rohini',
      selectedPackage: 'pkg2',
      customItems: [],
      totalAmount: 12500,
      advancePaid: 12500,
      remainingAmount: 0,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: '2024-12-22',
      extraCharges: 0
    }
  ];

  const reviews = [
    {
      id: 'review1',
      bookingId: 'booking1',
      customerId: 'customer1',
      providerId: 'provider1',
      rating: 5,
      comment: 'Excellent service! Food was delicious and presentation was perfect.',
      createdAt: '2024-12-25',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=400'
    }
  ];

  const notifications = [
    {
      id: 'notif1',
      userId: 'provider1',
      type: 'booking',
      message: 'New booking request received for wedding on 15th Jan',
      read: false,
      createdAt: '2024-12-20'
    }
  ];

  const complaints = [];
  const favorites = []; // Stores provider IDs for customers

  return { providers, menuItems, packages, bookings, reviews, notifications, complaints, favorites };
};