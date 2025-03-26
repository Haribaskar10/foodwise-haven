
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MealPlanning = () => {
  const { toast } = useToast();

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
            <h2 className="text-xl font-semibold mb-4">Plan Ahead, Waste Less</h2>
            <p className="text-gray-600 mb-6">
              Our meal planning tools help you:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Create weekly meal plans based on what you have</span>
              </li>
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Generate smart shopping lists that prevent over-buying</span>
              </li>
              <li className="flex items-start">
                <div className="bg-sage-100 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sage-600">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Track your food waste reduction progress over time</span>
              </li>
            </ul>

            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => toast({
                title: "Feature Coming Soon",
                description: "This feature will be available after you sign up!",
              })}
            >
              Start Planning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;
