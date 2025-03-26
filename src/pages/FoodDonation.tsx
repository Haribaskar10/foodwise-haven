
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Calendar, Package, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DonationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  distance: string;
  acceptingItems: string[];
}

const FoodDonation = () => {
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [donationCenters, setDonationCenters] = useState<DonationCenter[]>([
    {
      id: "1",
      name: "Community Food Bank",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
      website: "https://communityfoodbank.org",
      hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm",
      distance: "1.2 miles",
      acceptingItems: ["Canned goods", "Pasta", "Rice", "Cereal", "Peanut butter"]
    },
    {
      id: "2",
      name: "City Harvest Center",
      address: "456 Oak Ave, Anytown, USA",
      phone: "(555) 987-6543",
      website: "https://cityharvestcenter.org",
      hours: "Mon-Sat: 8am-7pm",
      distance: "2.5 miles",
      acceptingItems: ["Fresh produce", "Dairy products", "Bread", "Meat", "Frozen meals"]
    },
    {
      id: "3",
      name: "Hope Pantry",
      address: "789 Pine Rd, Anytown, USA",
      phone: "(555) 456-7890",
      website: "https://hopepantry.org",
      hours: "Tue-Thu: 10am-6pm, Sat: 9am-1pm",
      distance: "3.8 miles",
      acceptingItems: ["Baby food", "Formula", "Diapers", "Toiletries", "Canned goods"]
    }
  ]);
  const [searchResults, setSearchResults] = useState<DonationCenter[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);
  const [schedulingDonation, setSchedulingDonation] = useState(false);
  const [donationDate, setDonationDate] = useState("");
  const [donationItems, setDonationItems] = useState("");

  const searchCenters = () => {
    if (!zipCode.trim() || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      toast({
        title: "Invalid ZIP code",
        description: "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API to find nearby donation centers
    // For now, we'll simulate with our predefined centers
    setSearchResults(donationCenters);
    setHasSearched(true);
    setSelectedCenter(null);

    toast({
      title: `Found ${donationCenters.length} donation centers`,
      description: "View the list below for details"
    });
  };

  const scheduleDonation = () => {
    if (!selectedCenter) {
      toast({
        title: "No center selected",
        description: "Please select a donation center first",
        variant: "destructive"
      });
      return;
    }

    if (!donationDate || !donationItems.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API to schedule the donation
    toast({
      title: "Donation scheduled",
      description: `Your donation to ${selectedCenter.name} has been scheduled for ${new Date(donationDate).toLocaleDateString()}`
    });

    setSchedulingDonation(false);
    setDonationDate("");
    setDonationItems("");
  };

  return (
    <div className="min-h-screen bg-sage-50/50">
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-sage-600 mb-8 hover:text-sage-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Food Donation Hub</h1>
          <p className="text-gray-600 mb-8">
            Connect with local food banks and donation centers to share surplus food with those in need.
          </p>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Find Donation Centers Near You</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your ZIP code
                </label>
                <Input
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="e.g., 12345"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={searchCenters}
                  className="bg-sage-600 hover:bg-sage-700 text-white h-10 w-full md:w-auto"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Centers
                </Button>
              </div>
            </div>
            
            {hasSearched && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} donation centers near ${zipCode}` 
                    : "No donation centers found in your area"}
                </h3>
                
                <div className="space-y-4">
                  {searchResults.map((center) => (
                    <div 
                      key={center.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedCenter?.id === center.id ? 'border-sage-500 bg-sage-50' : 'border-gray-200 hover:border-sage-300'}`}
                      onClick={() => setSelectedCenter(center)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{center.name}</h4>
                          <p className="text-gray-600 text-sm">{center.address}</p>
                          <p className="text-gray-500 text-sm mt-1">{center.distance} away</p>
                        </div>
                        <div className="bg-sage-100 text-sage-700 px-2 py-1 rounded text-xs font-medium">
                          Open Today
                        </div>
                      </div>
                      
                      {selectedCenter?.id === center.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Hours:</p>
                              <p className="text-sm text-gray-600">{center.hours}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Contact:</p>
                              <p className="text-sm text-gray-600">{center.phone}</p>
                              <a 
                                href={center.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-sage-600 flex items-center hover:underline mt-1"
                              >
                                Website <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-1">Currently Accepting:</p>
                            <div className="flex flex-wrap gap-1">
                              {center.acceptingItems.map((item, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-sage-100 text-sage-700 text-xs px-2 py-1 rounded"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              className="bg-sage-600 hover:bg-sage-700 text-white"
                              onClick={() => setSchedulingDonation(true)}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Donation
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {schedulingDonation && selectedCenter && (
              <div className="mt-6 bg-sage-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Schedule Donation to {selectedCenter.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSchedulingDonation(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <Input
                      id="donationDate"
                      type="date"
                      value={donationDate}
                      onChange={(e) => setDonationDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="donationItems" className="block text-sm font-medium text-gray-700 mb-1">
                      Items to Donate (separated by commas)
                    </label>
                    <Input
                      id="donationItems"
                      value={donationItems}
                      onChange={(e) => setDonationItems(e.target.value)}
                      placeholder="e.g., canned soup, rice, pasta"
                    />
                  </div>
                  
                  <Button 
                    className="bg-sage-600 hover:bg-sage-700 text-white w-full"
                    onClick={scheduleDonation}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Schedule Donation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDonation;
