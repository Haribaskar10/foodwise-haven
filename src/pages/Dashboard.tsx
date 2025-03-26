
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-sage-50/50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-sage-800 flex items-center">
            <span className="text-sage-600 mr-1">Food</span>Wise
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-600">Manage your food inventory and reduce waste</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Your Pantry</h2>
            <p className="text-gray-600 mb-4">Start by adding items to your pantry to track expiration dates.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => navigate("/pantry-management")}
            >
              Add Items
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recipe Suggestions</h2>
            <p className="text-gray-600 mb-4">Get personalized recipes based on what's in your pantry.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => navigate("/recipe-suggestions")}
            >
              Find Recipes
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Food Donation</h2>
            <p className="text-gray-600 mb-4">Connect with local food banks to donate surplus food.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => navigate("/food-donation")}
            >
              Find Donation Centers
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Meal Planning</h2>
            <p className="text-gray-600 mb-4">Plan your meals in advance to reduce food waste.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => navigate("/meal-planning")}
            >
              Plan Meals
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Community Forum</h2>
            <p className="text-gray-600 mb-4">Share tips and get advice from the community.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => navigate("/community-forum")}
            >
              Join Discussion
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Your Impact</h2>
            <p className="text-gray-600 mb-4">Track your progress in reducing food waste.</p>
            <Button 
              className="bg-sage-600 hover:bg-sage-700 text-white"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "Impact tracking will be available in the next update!",
                });
              }}
            >
              View Stats
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
