import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar, Target, Heart } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    locality: "",
    personalNotes: "",
    goals: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <PageHeader
          icon={User}
          title="My Profile"
          description="Manage your personal information and track your mental wellness journey"
        />

        <div className="grid gap-6">
          {/* Personal Information Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={profile.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                </div>
              </div>

              {/* Second row for locality */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locality" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Locality
                  </Label>
                  <Select value={profile.locality} onValueChange={(value) => handleInputChange("locality", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your locality type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="rural">Rural</SelectItem>
                      <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                      <SelectItem value="urban">Urban</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Journey Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                My Wellness Journey
              </CardTitle>
              <CardDescription>
                Track your personal mental health goals and reflections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goals" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Personal Goals
                </Label>
                <Textarea
                  id="goals"
                  placeholder="What are your mental wellness goals? (e.g., practice mindfulness daily, improve sleep quality, manage stress better...)"
                  value={profile.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalNotes">Personal Notes & Reflections</Label>
                <Textarea
                  id="personalNotes"
                  placeholder="Share your thoughts, experiences, or anything you'd like to remember about your mental health journey..."
                  value={profile.personalNotes}
                  onChange={(e) => handleInputChange("personalNotes", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-primary hover:shadow-glow transition-all">
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;