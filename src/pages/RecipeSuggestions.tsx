
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RecipeSuggestions = () => {
  const { toast } = useToast();

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
            <h2 className="text-xl font-semibold mb-4">Discover New Recipes</h2>
            <p className="text-gray-600 mb-6">
              Our AI-powered system will analyze your pantry ingredients and suggest recipes that:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Use ingredients that are about to expire</span>
              </li>
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Match your dietary preferences and restrictions</span>
              </li>
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Offer creative ways to use leftover ingredients</span>
              </li>
            </ul>

            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => toast({
                title: "Feature Coming Soon",
                description: "This feature will be available after you sign up!",
              })}
            >
              Explore Recipes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestions;
