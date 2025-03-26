
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ChefHat, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  cookingTime: string;
  servings: number;
  image: string;
}

const RecipeSuggestions = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("any");
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Vegetable Stir Fry",
      description: "A quick and healthy vegetable stir fry using pantry staples.",
      ingredients: ["bell pepper", "carrot", "broccoli", "onion", "garlic", "soy sauce", "rice"],
      cookingTime: "20 mins",
      servings: 2,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: "2",
      name: "Pasta Primavera",
      description: "A light pasta dish loaded with spring vegetables.",
      ingredients: ["pasta", "zucchini", "cherry tomatoes", "asparagus", "parmesan cheese", "olive oil", "garlic"],
      cookingTime: "25 mins",
      servings: 4,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhc3RhfGVufDB8fDB8fHww"
    },
    {
      id: "3",
      name: "Banana Oat Pancakes",
      description: "Healthy pancakes made with ripe bananas and oats.",
      ingredients: ["banana", "oats", "eggs", "milk", "cinnamon", "honey"],
      cookingTime: "15 mins",
      servings: 2,
      image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D"
    }
  ]);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRecipes = () => {
    if (!ingredients.trim()) {
      toast({
        title: "Missing ingredients",
        description: "Please enter at least one ingredient to search",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be a call to an API that uses AI to generate recipes
    // For now, we'll simulate with our predefined recipes and basic filtering
    const searchTerms = ingredients.toLowerCase().split(',').map(i => i.trim());
    
    const results = recipes.filter(recipe => {
      // Check if any of the search terms match with recipe ingredients
      const matchesIngredients = searchTerms.some(term => 
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(term))
      );

      // If dietary preference is set, filter by it
      if (dietaryPreference !== "any") {
        if (dietaryPreference === "vegetarian" && recipe.ingredients.some(ing => ["meat", "chicken", "beef", "pork"].includes(ing.toLowerCase()))) {
          return false;
        }
        if (dietaryPreference === "vegan" && recipe.ingredients.some(ing => ["meat", "chicken", "beef", "pork", "milk", "cheese", "eggs"].includes(ing.toLowerCase()))) {
          return false;
        }
      }

      return matchesIngredients;
    });

    setSearchResults(results);
    setHasSearched(true);

    if (results.length === 0) {
      toast({
        title: "No recipes found",
        description: "Try different ingredients or fewer restrictions",
        variant: "destructive"
      });
    } else {
      toast({
        title: `Found ${results.length} recipes`,
        description: "Check out the suggestions below"
      });
    }
  };

  return (
    <div className="min-h-screen bg-sage-50/50">
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-sage-600 mb-8 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Recipe Suggestions</h1>
          <p className="text-gray-600 mb-8">
            Get personalized recipe ideas based on what's in your pantry to reduce waste and inspire your meals.
          </p>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Find Recipes with Your Ingredients</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients (separate with commas)
                </label>
                <Input
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., chicken, rice, bell pepper"
                />
              </div>
              
              <div>
                <label htmlFor="dietary" className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preference
                </label>
                <select
                  id="dietary"
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="any">Any</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </div>
              
              <Button 
                onClick={searchRecipes}
                className="bg-sage-600 hover:bg-sage-700 text-white w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Find Recipes
              </Button>
            </div>
            
            {hasSearched && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} recipe suggestions` 
                    : "No recipes found with those ingredients"}
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {searchResults.map((recipe) => (
                    <div key={recipe.id} className="bg-sage-50 rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-1">{recipe.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {recipe.cookingTime}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {recipe.servings} servings
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <span 
                                key={idx} 
                                className="bg-sage-100 text-sage-700 text-xs px-2 py-1 rounded"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-sage-600 hover:bg-sage-700 text-white w-full"
                          onClick={() => toast({
                            title: "Recipe details",
                            description: "Full recipe will be available after you sign up!",
                          })}
                        >
                          <ChefHat className="h-4 w-4 mr-2" />
                          View Full Recipe
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestions;
