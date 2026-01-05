import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateDummyData } from '@/lib/dummyData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Initialize data from localStorage or generate dummy data
    const storedProviders = localStorage.getItem('providers');
    
    if (storedProviders) {
      setProviders(JSON.parse(storedProviders));
      setBookings(JSON.parse(localStorage.getItem('bookings') || '[]'));
      setMenuItems(JSON.parse(localStorage.getItem('menuItems') || '[]'));
      setPackages(JSON.parse(localStorage.getItem('packages') || '[]'));
      setReviews(JSON.parse(localStorage.getItem('reviews') || '[]'));
      setNotifications(JSON.parse(localStorage.getItem('notifications') || '[]'));
      setComplaints(JSON.parse(localStorage.getItem('complaints') || '[]'));
      setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    } else {
      const dummyData = generateDummyData();
      setProviders(dummyData.providers);
      setBookings(dummyData.bookings);
      setMenuItems(dummyData.menuItems);
      setPackages(dummyData.packages);
      setReviews(dummyData.reviews);
      setNotifications(dummyData.notifications);
      setComplaints(dummyData.complaints);
      setFavorites(dummyData.favorites);
      
      localStorage.setItem('providers', JSON.stringify(dummyData.providers));
      localStorage.setItem('bookings', JSON.stringify(dummyData.bookings));
      localStorage.setItem('menuItems', JSON.stringify(dummyData.menuItems));
      localStorage.setItem('packages', JSON.stringify(dummyData.packages));
      localStorage.setItem('reviews', JSON.stringify(dummyData.reviews));
      localStorage.setItem('notifications', JSON.stringify(dummyData.notifications));
      localStorage.setItem('complaints', JSON.stringify(dummyData.complaints));
      localStorage.setItem('favorites', JSON.stringify(dummyData.favorites));
    }
  }, []);

  const updateProviders = (newProviders) => {
    setProviders(newProviders);
    localStorage.setItem('providers', JSON.stringify(newProviders));
  };

  const updateBookings = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const updateMenuItems = (newMenuItems) => {
    setMenuItems(newMenuItems);
    localStorage.setItem('menuItems', JSON.stringify(newMenuItems));
  };

  const updatePackages = (newPackages) => {
    setPackages(newPackages);
    localStorage.setItem('packages', JSON.stringify(newPackages));
  };

  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('reviews', JSON.stringify(newReviews));
  };

  const updateComplaints = (newComplaints) => {
    setComplaints(newComplaints);
    localStorage.setItem('complaints', JSON.stringify(newComplaints));
  };

  const toggleFavorite = (userId, providerId) => {
    let newFavorites = [...favorites];
    const index = newFavorites.findIndex(f => f.userId === userId && f.providerId === providerId);
    
    if (index > -1) {
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push({ userId, providerId });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addNotification = (notification) => {
    const newNotifications = [{ ...notification, id: Date.now(), createdAt: new Date().toISOString() }, ...notifications];
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  return (
    <DataContext.Provider value={{
      providers,
      bookings,
      menuItems,
      packages,
      reviews,
      notifications,
      complaints,
      favorites,
      updateProviders,
      updateBookings,
      updateMenuItems,
      updatePackages,
      updateReviews,
      updateComplaints,
      toggleFavorite,
      addNotification
    }}>
      {children}
    </DataContext.Provider>
  );
};