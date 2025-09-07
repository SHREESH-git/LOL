import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Coffee, 
  Dumbbell, 
  Palette,
  Heart,
  Users,
  Stethoscope,
  Search,
  Navigation,
  ExternalLink
} from "lucide-react";

interface SupportLocation {
  id: string;
  name: string;
  type: 'cafe' | 'gym' | 'spa' | 'counseling' | 'community' | 'wellness';
  address: string;
  phone?: string;
  hours: string;
  rating: number;
  distance: string;
  description: string;
  services: string[];
  emergencyAvailable?: boolean;
  image?: string;
}

const supportLocations: SupportLocation[] = [
  // Mental Health & Counseling
  {
    id: '1',
    name: 'Campus Counseling Center',
    type: 'counseling',
    address: '123 University Avenue, Campus Block A',
    phone: '+91-11-2345-6789',
    hours: '9:00 AM - 6:00 PM',
    rating: 4.8,
    distance: '0.2 km',
    description: 'Professional counseling services with trained psychologists specializing in student mental health.',
    services: ['Individual Counseling', 'Group Therapy', 'Crisis Support', 'Academic Stress Management'],
    emergencyAvailable: true
  },
  {
    id: '2',
    name: 'Mindfulness Meditation Center',
    type: 'wellness',
    address: '45 Wellness Street, Near Metro Station',
    phone: '+91-11-2345-6790',
    hours: '7:00 AM - 9:00 PM',
    rating: 4.6,
    distance: '1.2 km',
    description: 'Peaceful center offering meditation classes, yoga, and mindfulness workshops.',
    services: ['Meditation Classes', 'Yoga Sessions', 'Stress Relief Workshops', 'Breathing Techniques'],
    emergencyAvailable: false
  },
  
  // Cat Cafés & Relaxing Spaces
  {
    id: '3',
    name: 'Purrfect Café',
    type: 'cafe',
    address: '78 Cat Lane, Student District',
    phone: '+91-11-2345-6791',
    hours: '10:00 AM - 8:00 PM',
    rating: 4.7,
    distance: '0.8 km',
    description: 'Therapeutic cat café where you can relax with friendly cats while enjoying coffee and snacks.',
    services: ['Cat Therapy', 'Quiet Study Space', 'Organic Coffee', 'Pet Interaction'],
    emergencyAvailable: false
  },
  {
    id: '4',
    name: 'Zen Garden Café',
    type: 'cafe',
    address: '12 Peaceful Park Road',
    phone: '+91-11-2345-6792',
    hours: '8:00 AM - 10:00 PM',
    rating: 4.5,
    distance: '1.5 km',
    description: 'Tranquil café with indoor plants and calming ambiance, perfect for studying or relaxation.',
    services: ['Study-Friendly Environment', 'Herbal Teas', 'Healthy Snacks', 'WiFi'],
    emergencyAvailable: false
  },
  
  // Fitness & Wellness
  {
    id: '5',
    name: 'FitMind Gym & Wellness',
    type: 'gym',
    address: '90 Fitness Boulevard',
    phone: '+91-11-2345-6793',
    hours: '5:00 AM - 11:00 PM',
    rating: 4.4,
    distance: '2.1 km',
    description: 'Modern gym with mental health focus, offering exercise therapy and stress-relief workouts.',
    services: ['Exercise Therapy', 'Mental Health Fitness', 'Group Classes', 'Personal Training'],
    emergencyAvailable: false
  },
  
  // Spa & Relaxation
  {
    id: '6',
    name: 'Serenity Spa & Wellness',
    type: 'spa',
    address: '56 Relaxation Avenue',
    phone: '+91-11-2345-6794',
    hours: '9:00 AM - 8:00 PM',
    rating: 4.9,
    distance: '3.2 km',
    description: 'Full-service spa offering therapeutic massages and relaxation treatments for stress relief.',
    services: ['Therapeutic Massage', 'Aromatherapy', 'Stress Relief Treatments', 'Meditation Rooms'],
    emergencyAvailable: false
  },
  
  // Community Centers
  {
    id: '7',
    name: 'Student Support Hub',
    type: 'community',
    address: '33 Community Center Road',
    phone: '+91-11-2345-6795',
    hours: '24/7',
    rating: 4.3,
    distance: '0.5 km',
    description: 'Community center with peer support groups, workshops, and social activities for students.',
    services: ['Peer Support Groups', 'Social Activities', 'Workshops', '24/7 Helpline'],
    emergencyAvailable: true
  }
];

const typeIcons = {
  cafe: Coffee,
  gym: Dumbbell,
  spa: Palette,
  counseling: Stethoscope,
  community: Users,
  wellness: Heart
};

const typeLabels = {
  cafe: 'Cafés & Relaxation',
  gym: 'Fitness & Wellness',
  spa: 'Spa & Therapy',
  counseling: 'Counseling Services',
  community: 'Community Centers',
  wellness: 'Wellness Centers'
};

export default function LocalSupport() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    // Get user's location (mock implementation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          setUserLocation('Near Campus, Delhi');
        },
        (error) => {
          setUserLocation('Location not available');
        }
      );
    }
  }, []);

  const filteredLocations = supportLocations.filter(location => {
    const matchesType = selectedType === 'all' || location.type === selectedType;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const emergencyLocations = supportLocations.filter(location => location.emergencyAvailable);

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Local Support Network</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find nearby mental health resources, relaxing spaces, and support services in your area.
          </p>
          {userLocation && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
              <Navigation className="h-4 w-4" />
              <span>{userLocation}</span>
            </div>
          )}
        </div>

        {/* Emergency Support Card */}
        <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              24/7 Emergency Support
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-300">
              Need immediate help? These services are available round the clock.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyLocations.map(location => (
                <div key={location.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div>
                    <h4 className="font-medium text-sm">{location.name}</h4>
                    <p className="text-xs text-muted-foreground">{location.phone}</p>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Call Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for services, locations, or amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="all">All</TabsTrigger>
              {Object.entries(typeLabels).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {label.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLocations.map((location) => {
            const TypeIcon = typeIcons[location.type];
            
            return (
              <Card key={location.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{typeLabels[location.type]}</Badge>
                          {location.emergencyAvailable && (
                            <Badge className="bg-red-100 text-red-800 text-xs">24/7</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{location.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{location.address}</span>
                      <Badge variant="secondary" className="ml-auto">{location.distance}</Badge>
                    </div>
                    
                    {location.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{location.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{location.hours}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    {location.phone && (
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No locations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or explore different categories.
            </p>
          </div>
        )}

        {/* Tips Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Finding Local Support</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">🎯 When to Seek Help</h4>
              <ul className="space-y-1">
                <li>• Feeling overwhelmed or stressed</li>
                <li>• Need someone to talk to</li>
                <li>• Looking for relaxation activities</li>
                <li>• Want to connect with others</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">💡 Making the Most of It</h4>
              <ul className="space-y-1">
                <li>• Call ahead to check availability</li>
                <li>• Bring a friend for support</li>
                <li>• Ask about student discounts</li>
                <li>• Keep emergency numbers handy</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}