
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pantry-management" element={<PantryManagement />} />
          <Route path="/recipe-suggestions" element={<RecipeSuggestions />} />
          <Route path="/food-donation" element={<FoodDonation />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/business-solutions" element={<BusinessSolutions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
