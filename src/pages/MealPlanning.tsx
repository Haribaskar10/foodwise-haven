
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Plus, Trash2, ShoppingCart, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MealPlan {
  id: string;
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  purchased: boolean;
}

const MealPlanning = () => {
  const { toast } = useToast();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: "1",
      day: "Monday",
      breakfast: "Oatmeal with fruit",
      lunch: "Quinoa salad with roasted vegetables",
      dinner: "Grilled salmon with steamed broccoli"
    },
    {
      id: "2",
      day: "Tuesday",
      breakfast: "Yogurt with granola",
      lunch: "Leftover quinoa salad",
      dinner: "Chicken stir-fry with vegetables"
    },
    {
      id: "3",
      day: "Wednesday",
      breakfast: "Avocado toast",
      lunch: "Lentil soup with bread",
      dinner: "Vegetarian pasta with tomato sauce"
    }
  ]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: "1", name: "Oatmeal", quantity: "1 pack", purchased: false },
    { id: "2", name: "Yogurt", quantity: "32 oz", purchased: false },
    { id: "3", name: "Quinoa", quantity: "2 cups", purchased: false },
    { id: "4", name: "Salmon", quantity: "1 lb", purchased: false },
    { id: "5", name: "Chicken breast", quantity: "1 lb", purchased: false },
    { id: "6", name: "Broccoli", quantity: "1 head", purchased: false },
    { id: "7", name: "Mixed vegetables", quantity: "1 bag", purchased: false },
    { id: "8", name: "Pasta", quantity: "1 box", purchased: false },
    { id: "9", name: "Tomato sauce", quantity: "1 jar", purchased: false },
    { id: "10", name: "Avocado", quantity: "3", purchased: false },
    { id: "11", name: "Bread", quantity: "1 loaf", purchased: false },
    { id: "12", name: "Lentils", quantity: "2 cups", purchased: false }
  ]);
  const [activeView, setActiveView] = useState<"plan" | "shopping">("plan");
  const [editingMealPlan, setEditingMealPlan] = useState<MealPlan | null>(null);
  const [newShoppingItem, setNewShoppingItem] = useState({ name: "", quantity: "" });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const startEditingMealPlan = (day: string) => {
    const existingPlan = mealPlans.find(plan => plan.day === day);
    
    if (existingPlan) {
      setEditingMealPlan({ ...existingPlan });
    } else {
      setEditingMealPlan({
        id: Date.now().toString(),
        day,
        breakfast: "",
        lunch: "",
        dinner: ""
      });
    }
  };

  const saveMealPlan = () => {
    if (!editingMealPlan) return;
    
    const updatedPlans = [...mealPlans];
    const existingIndex = mealPlans.findIndex(plan => plan.day === editingMealPlan.day);
    
    if (existingIndex >= 0) {
      updatedPlans[existingIndex] = editingMealPlan;
    } else {
      updatedPlans.push(editingMealPlan);
    }
    
    setMealPlans(updatedPlans);
    setEditingMealPlan(null);
    
    toast({
      title: "Meal plan saved",
      description: `Your meal plan for ${editingMealPlan.day} has been saved`
    });
  };

  const toggleItemPurchased = (id: string) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const addShoppingItem = () => {
    if (!newShoppingItem.name.trim() || !newShoppingItem.quantity.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both an item name and quantity",
        variant: "destructive"
      });
      return;
    }
    
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newShoppingItem.name,
      quantity: newShoppingItem.quantity,
      purchased: false
    };
    
    setShoppingList([...shoppingList, newItem]);
    setNewShoppingItem({ name: "", quantity: "" });
    
    toast({
      title: "Item added",
      description: `${newShoppingItem.name} has been added to your shopping list`
    });
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const getMealPlanForDay = (day: string) => {
    return mealPlans.find(plan => plan.day === day);
  };

  const generateShoppingList = () => {
    toast({
      title: "Shopping list generated",
      description: "Based on your meal plan, we've updated your shopping list"
    });
  };

  return (
    <div className="min-h-screen bg-sage-50/50">
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-sage-600 mb-8 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Meal Planning</h1>
          <p className="text-gray-600 mb-8">
            Plan your meals in advance, generate shopping lists, and track your food waste reduction progress.
          </p>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex border-b mb-6">
              <button
                className={`pb-2 px-4 font-medium ${activeView === 'plan' 
                  ? 'border-b-2 border-sage-600 text-sage-700' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveView("plan")}
              >
                <Calendar className="h-4 w-4 inline-block mr-2" />
                Meal Plan
              </button>
              <button
                className={`pb-2 px-4 font-medium ${activeView === 'shopping' 
                  ? 'border-b-2 border-sage-600 text-sage-700' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveView("shopping")}
              >
                <ShoppingCart className="h-4 w-4 inline-block mr-2" />
                Shopping List
              </button>
            </div>
            
            {/* Meal Plan View */}
            {activeView === "plan" && (
              <div>
                {editingMealPlan ? (
                  <div className="bg-sage-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">Edit Meal Plan for {editingMealPlan.day}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Breakfast
                        </label>
                        <Input
                          value={editingMealPlan.breakfast}
                          onChange={(e) => setEditingMealPlan({...editingMealPlan, breakfast: e.target.value})}
                          placeholder="e.g., Oatmeal with fruit"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lunch
                        </label>
                        <Input
                          value={editingMealPlan.lunch}
                          onChange={(e) => setEditingMealPlan({...editingMealPlan, lunch: e.target.value})}
                          placeholder="e.g., Quinoa salad with vegetables"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dinner
                        </label>
                        <Input
                          value={editingMealPlan.dinner}
                          onChange={(e) => setEditingMealPlan({...editingMealPlan, dinner: e.target.value})}
                          placeholder="e.g., Grilled salmon with steamed broccoli"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingMealPlan(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="bg-sage-600 hover:bg-sage-700 text-white"
                          onClick={saveMealPlan}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4">
                      {days.map((day) => {
                        const mealPlan = getMealPlanForDay(day);
                        
                        return (
                          <div key={day} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold">{day}</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-sage-600 hover:text-sage-800 hover:bg-sage-50"
                                onClick={() => startEditingMealPlan(day)}
                              >
                                {mealPlan ? "Edit" : "Add Meals"}
                              </Button>
                            </div>
                            
                            {mealPlan ? (
                              <div className="grid gap-2">
                                <div>
                                  <span className="text-xs font-medium text-gray-500">Breakfast:</span>
                                  <p className="text-sm">{mealPlan.breakfast || "Not planned"}</p>
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-gray-500">Lunch:</span>
                                  <p className="text-sm">{mealPlan.lunch || "Not planned"}</p>
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-gray-500">Dinner:</span>
                                  <p className="text-sm">{mealPlan.dinner || "Not planned"}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 italic">No meals planned yet</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        className="bg-sage-600 hover:bg-sage-700 text-white w-full"
                        onClick={generateShoppingList}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Generate Shopping List
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Shopping List View */}
            {activeView === "shopping" && (
              <div>
                <div className="flex space-x-3 mb-6">
                  <Input
                    placeholder="Item name"
                    value={newShoppingItem.name}
                    onChange={(e) => setNewShoppingItem({...newShoppingItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="Quantity"
                    value={newShoppingItem.quantity}
                    onChange={(e) => setNewShoppingItem({...newShoppingItem, quantity: e.target.value})}
                  />
                  <Button 
                    className="bg-sage-600 hover:bg-sage-700 text-white whitespace-nowrap"
                    onClick={addShoppingItem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {shoppingList.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">Your shopping list is empty</p>
                  ) : (
                    shoppingList.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={item.purchased}
                            onChange={() => toggleItemPurchased(item.id)}
                            className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded mr-3"
                          />
                          <div className={item.purchased ? 'text-gray-400 line-through' : ''}>
                            <span className="font-medium">{item.name}</span>
                            <span className="ml-2 text-sm text-gray-500">{item.quantity}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeShoppingItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;
