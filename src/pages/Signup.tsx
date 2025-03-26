
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords don't match",
          description: "Please make sure your passwords match."
        });
        setIsLoading(false);
        return;
      }

      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just check if fields are not empty
      if (name && email && password) {
        toast({
          title: "Account created successfully",
          description: "Welcome to FoodWise!"
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "Please fill in all fields"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Something went wrong. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50/50 px-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="inline-flex items-center text-sage-600 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create a FoodWise account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-sage-600 hover:bg-sage-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span>Or sign up with</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Already have an account?{" "}
            <Link to="/login" className="text-sage-600 hover:text-sage-800 font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
