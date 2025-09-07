import { useState } from "react";
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function BookingSession() {
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    urgency: "",
    notes: ""
  });
  const { toast } = useToast();

  const counselors = [
    {
      id: "dr-sharma",
      name: "Dr. Priya Sharma",
      specialization: "Anxiety & Depression",
      experience: "8 years",
      languages: "Hindi, English, Punjabi",
      rating: 4.9
    },
    {
      id: "dr-kumar",
      name: "Dr. Raj Kumar",
      specialization: "Academic Stress & Career Counseling",
      experience: "6 years",
      languages: "Hindi, English, Urdu",
      rating: 4.8
    },
    {
      id: "dr-singh",
      name: "Dr. Aman Singh",
      specialization: "Relationship & Social Issues",
      experience: "5 years",
      languages: "Hindi, English",
      rating: 4.7
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCounselor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select counselor, date and time slot.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Session Booked Successfully!",
      description: "You'll receive a confirmation email shortly.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      issue: "",
      urgency: "",
      notes: ""
    });
    setSelectedCounselor("");
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Book Counseling Session
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our qualified mental health professionals for confidential, supportive guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Counselor Selection */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Select Counselor
                </CardTitle>
                <CardDescription>
                  Choose a counselor based on their specialization and availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCounselor === counselor.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{counselor.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-yellow-500">★</span>
                        <span className="text-sm font-medium">{counselor.rating}</span>
                      </div>
                    </div>
                    <p className="text-primary font-medium mb-2">{counselor.specialization}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Experience: {counselor.experience}</p>
                      <p>Languages: {counselor.languages}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="justify-start"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your information is kept strictly confidential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="urgency">Session Urgency</Label>
                      <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General Support</SelectItem>
                          <SelectItem value="medium">Medium - Need Guidance</SelectItem>
                          <SelectItem value="high">High - Urgent Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="issue">Main Concern *</Label>
                    <Select value={formData.issue} onValueChange={(value) => setFormData({...formData, issue: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main concern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anxiety">Anxiety & Stress</SelectItem>
                        <SelectItem value="depression">Depression & Mood</SelectItem>
                        <SelectItem value="academic">Academic Pressure</SelectItem>
                        <SelectItem value="relationships">Relationships & Social Issues</SelectItem>
                        <SelectItem value="career">Career & Future Planning</SelectItem>
                        <SelectItem value="family">Family Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Any specific details you'd like to share..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Book Session
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">50 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Student Counseling Center, Room 201</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Emergency</p>
                    <p className="text-sm text-muted-foreground">Call: 1800-599-0019</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium mb-1">✓ Confidential Environment</p>
                  <p className="text-muted-foreground">Your privacy is our priority</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">✓ Professional Support</p>
                  <p className="text-muted-foreground">Qualified mental health professionals</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">✓ Personalized Care</p>
                  <p className="text-muted-foreground">Tailored to your specific needs</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-wellness">
              <CardContent className="p-4">
                <div className="text-white text-center">
                  <Mail className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium mb-1">Need Immediate Help?</p>
                  <p className="text-sm opacity-90">Contact our 24/7 crisis helpline</p>
                  <Button variant="glass" size="sm" className="mt-3">
                    Get Help Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}