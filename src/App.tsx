
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PantryManagement from "./pages/PantryManagement";
import RecipeSuggestions from "./pages/RecipeSuggestions";
import FoodDonation from "./pages/FoodDonation";
import MealPlanning from "./pages/MealPlanning";
import CommunityForum from "./pages/CommunityForum";
import BusinessSolutions from "./pages/BusinessSolutions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/pantry-management" element={<ProtectedRoute><PantryManagement /></ProtectedRoute>} />
            <Route path="/recipe-suggestions" element={<ProtectedRoute><RecipeSuggestions /></ProtectedRoute>} />
            <Route path="/food-donation" element={<ProtectedRoute><FoodDonation /></ProtectedRoute>} />
            <Route path="/meal-planning" element={<ProtectedRoute><MealPlanning /></ProtectedRoute>} />
            <Route path="/community-forum" element={<ProtectedRoute><CommunityForum /></ProtectedRoute>} />
            
            <Route path="/business-solutions" element={<BusinessSolutions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
