import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ProviderManageMenu = () => {
  const { user } = useAuth();
  const { menuItems, updateMenuItems } = useData();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    image: ''
  });

  const providerMenuItems = menuItems.filter(m => m.providerId === user.id);
  const categories = ['Starter', 'Main Course', 'Bread', 'Dessert', 'Beverage'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      const updated = menuItems.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      );
      updateMenuItems(updated);
      toast({ title: 'Success', description: 'Menu item updated successfully!' });
    } else {
      const newItem = {
        id: `item${Date.now()}`,
        providerId: user.id,
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      };
      updateMenuItems([...menuItems, newItem]);
      toast({ title: 'Success', description: 'Menu item added successfully!' });
    }

    setDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', category: 'Main Course', price: '', image: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image
    });
    setDialogOpen(true);
  };

  const handleDelete = (itemId) => {
    updateMenuItems(menuItems.filter(item => item.id !== itemId));
    toast({ title: 'Success', description: 'Menu item deleted successfully!' });
  };

  return (
    <>
      <Helmet>
        <title>Manage Menu - Haluwai Booking</title>
        <meta name="description" content="Manage your menu items" />
      </Helmet>

      <DashboardLayout role="provider">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Menu</h1>
              <p className="text-gray-600">Add and manage your food items</p>
            </div>
            <Button 
              onClick={() => {
                setEditingItem(null);
                setFormData({ name: '', category: 'Main Course', price: '', image: '' });
                setDialogOpen(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {categories.map(category => {
            const categoryItems = providerMenuItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categoryItems.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-orange-600 font-bold mb-3">₹{item.price}</p>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(item)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDelete(item.id)}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {providerMenuItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No menu items yet. Add your first item!</p>
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Leave blank for default image"
                />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default ProviderManageMenu;