import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  DollarSign, 
  Shield, 
  Users, 
  CheckCircle,
  CreditCard,
  Wallet,
  Building2
} from "lucide-react";

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleDonation = async () => {
    const amount = getFinalAmount();
    
    if (amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowThankYou(true);
      toast({
        title: "Thank You!",
        description: "Your donation has been processed successfully.",
        variant: "default"
      });
    }, 2000);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="bg-gradient-wellness p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Thank You!</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your generous donation of ₹{getFinalAmount()} will help us continue providing vital mental health support to students who need it most.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Lives Impacted</h3>
                    <p className="text-sm text-muted-foreground">Your donation helps provide support to students in crisis</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gradient-wellness p-3 rounded-full w-fit mx-auto">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Safe Spaces</h3>
                    <p className="text-sm text-muted-foreground">Funding confidential counseling and peer support</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gradient-calm p-3 rounded-full w-fit mx-auto">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Wellness Resources</h3>
                    <p className="text-sm text-muted-foreground">Supporting 24/7 AI assistance and crisis intervention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button 
                variant="default" 
                onClick={() => {
                  setShowThankYou(false);
                  setSelectedAmount(null);
                  setCustomAmount("");
                }}
                className="mr-4"
              >
                Make Another Donation
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Heart}
          title="Support Mental Health"
          description="Your donation helps us provide vital mental health resources, crisis support, and counseling services to students in need. Every contribution makes a meaningful difference in someone's wellness journey."
        />

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Crisis Intervention</h3>
              <p className="text-sm text-muted-foreground">24/7 AI support and emergency assistance</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-gradient-wellness p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Confidential Counseling</h3>
              <p className="text-sm text-muted-foreground">Professional therapy sessions and support</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardContent className="pt-6">
              <div className="bg-gradient-calm p-3 rounded-full w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Wellness Resources</h3>
              <p className="text-sm text-muted-foreground">Educational content and peer support</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <span className="h-6 w-6 text-primary text-xl font-bold flex items-center justify-center">₹</span>
              Choose Your Donation Amount
            </CardTitle>
            <CardDescription>
              Select a preset amount or enter your own to support mental health initiatives
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Predefined Amounts */}
            <div>
              <Label className="text-base font-medium mb-3 block">Quick Amounts (INR)</Label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className="h-12 text-lg font-semibold transition-all duration-300"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount" className="text-base font-medium mb-3 block">
                Or Enter Custom Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10 text-lg h-12"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Selected Amount Display */}
            {getFinalAmount() > 0 && (
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Donation Amount</p>
                <p className="text-2xl font-bold text-primary">₹{getFinalAmount()}</p>
              </div>
            )}

            {/* Payment Methods */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Secure Payment Options</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={handleDonation}
                  disabled={getFinalAmount() < 1 || isProcessing}
                  className="h-12 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-soft"
                >
                  <CreditCard className="h-5 w-5" />
                  {isProcessing ? "Processing..." : "Stripe"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDonation}
                  disabled={getFinalAmount() < 1 || isProcessing}
                  className="h-12 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-soft"
                >
                  <Wallet className="h-5 w-5" />
                  PayPal
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDonation}
                  disabled={getFinalAmount() < 1 || isProcessing}
                  className="h-12 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-soft"
                >
                  <Building2 className="h-5 w-5" />
                  Razorpay
                </Button>
              </div>
            </div>

            {/* Main Donate Button */}
            <Button
              variant="hero"
              size="lg"
              onClick={handleDonation}
              disabled={getFinalAmount() < 1 || isProcessing}
              className="w-full h-14 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Donation...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  Donate ₹{getFinalAmount() || "0"} Now
                </>
              )}
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your donation is secure and encrypted</span>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 text-center space-y-4">
          <h3 className="text-xl font-semibold">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="font-medium text-foreground">₹100 - ₹500</p>
              <p>Supports AI crisis intervention responses and immediate assistance to students in need</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">₹1000 - ₹5000</p>
              <p>Funds counseling sessions and professional mental health resources for multiple students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}