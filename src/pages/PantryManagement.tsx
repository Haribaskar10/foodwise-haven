
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, X, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PantryItem {
  id: string;
  name: string;
  expiryDate: string;
  quantity: number;
  category: string;
}

const PantryManagement = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<PantryItem[]>([
    {
      id: "1",
      name: "Milk",
      expiryDate: "2023-12-25",
      quantity: 1,
      category: "Dairy"
    },
    {
      id: "2",
      name: "Apples",
      expiryDate: "2023-12-15",
      quantity: 6,
      category: "Fruits"
    },
    {
      id: "3",
      name: "Bread",
      expiryDate: "2023-12-10",
      quantity: 1,
      category: "Bakery"
    }
  ]);
  const [newItem, setNewItem] = useState({
    name: "",
    expiryDate: "",
    quantity: 1,
    category: "Other"
  });
  const [isAdding, setIsAdding] = useState(false);

  const addItem = () => {
    if (!newItem.name || !newItem.expiryDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const item: PantryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      expiryDate: newItem.expiryDate,
      quantity: newItem.quantity,
      category: newItem.category
    };
    
    setItems([...items, item]);
    setNewItem({
      name: "",
      expiryDate: "",
      quantity: 1,
      category: "Other"
    });
    setIsAdding(false);
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to your pantry`
    });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your pantry"
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });

  const isExpiringSoon = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <div className="min-h-screen bg-sage-50/50">
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-sage-600 mb-8 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Smart Pantry Management</h1>
          <p className="text-gray-600 mb-8">
            Keep track of what you have, when it expires, and get notified before food goes bad.
          </p>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Pantry Items</h2>
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-sage-600 hover:bg-sage-700 text-white flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {isAdding && (
              <div className="bg-sage-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Add New Item</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsAdding(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="e.g., Milk"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option>Dairy</option>
                      <option>Fruits</option>
                      <option>Vegetables</option>
                      <option>Meat</option>
                      <option>Bakery</option>
                      <option>Frozen</option>
                      <option>Canned</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <Button 
                  onClick={addItem}
                  className="bg-sage-600 hover:bg-sage-700 text-white"
                >
                  Add to Pantry
                </Button>
              </div>
            )}

            {sortedItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your pantry is empty. Add some items to get started!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium">Item</th>
                      <th className="pb-2 font-medium">Category</th>
                      <th className="pb-2 font-medium">Expiry Date</th>
                      <th className="pb-2 font-medium">Quantity</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.category}</td>
                        <td className="py-3">
                          <div className="flex items-center">
                            {isExpired(item.expiryDate) ? (
                              <span className="flex items-center text-red-500">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Expired
                              </span>
                            ) : isExpiringSoon(item.expiryDate) ? (
                              <span className="flex items-center text-amber-500">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Soon
                              </span>
                            ) : null}
                            <span className={`${isExpired(item.expiryDate) ? 'text-red-500' : isExpiringSoon(item.expiryDate) ? 'text-amber-500' : ''} ml-2`}>
                              {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryManagement;
