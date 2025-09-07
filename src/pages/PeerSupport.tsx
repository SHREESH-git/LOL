import { useState } from "react";
import { MessageCircle, Users, Heart, Shield, Search, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function PeerSupport() {
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const { toast } = useToast();

  const topics = [
    { name: "Academic Stress", posts: 45, active: "2h ago", color: "bg-blue-100 text-blue-800" },
    { name: "Hostel Life", posts: 32, active: "1h ago", color: "bg-green-100 text-green-800" },
    { name: "Career Anxiety", posts: 28, active: "30m ago", color: "bg-purple-100 text-purple-800" },
    { name: "Relationships", posts: 23, active: "45m ago", color: "bg-pink-100 text-pink-800" },
    { name: "Family Issues", posts: 19, active: "3h ago", color: "bg-orange-100 text-orange-800" },
    { name: "Financial Stress", posts: 15, active: "1h ago", color: "bg-yellow-100 text-yellow-800" }
  ];

  const discussions = [
    {
      id: 1,
      title: "How do you deal with exam stress during finals week?",
      author: "Student_23",
      timeAgo: "2 hours ago",
      replies: 12,
      topic: "Academic Stress",
      preview: "I've been feeling overwhelmed with upcoming finals. Looking for practical tips that have worked for others...",
      isAnonymous: true,
      likes: 8
    },
    {
      id: 2,
      title: "Missing home during hostel life - anyone else feeling this?",
      author: "HostelLife_21",
      timeAgo: "4 hours ago",
      replies: 18,
      topic: "Hostel Life",
      preview: "It's my second year but I still feel homesick sometimes. How do you cope with being away from family?",
      isAnonymous: true,
      likes: 15
    },
    {
      id: 3,
      title: "Confused about career choices after graduation",
      author: "Future_Unclear",
      timeAgo: "6 hours ago",
      replies: 9,
      topic: "Career Anxiety",
      preview: "With placement season approaching, I'm anxious about my career path. Anyone else feeling lost?",
      isAnonymous: true,
      likes: 6
    }
  ];

  const peerMentors = [
    {
      id: 1,
      name: "Mentor_Alpha",
      specialization: "Academic Support",
      year: "Final Year",
      rating: 4.9,
      sessions: 45,
      languages: "Hindi, English",
      available: true
    },
    {
      id: 2,
      name: "Mentor_Beta",
      specialization: "Social & Emotional Support",
      year: "Third Year", 
      rating: 4.8,
      sessions: 32,
      languages: "Hindi, English, Punjabi",
      available: false
    },
    {
      id: 3,
      name: "Mentor_Gamma",
      specialization: "Career Guidance",
      year: "Graduate",
      rating: 4.9,
      sessions: 67,
      languages: "English, Urdu",
      available: true
    }
  ];

  const handleNewPost = () => {
    if (!newPostContent.trim() || !selectedTopic) {
      toast({
        title: "Missing Information",
        description: "Please select a topic and write your post content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post Created Successfully!",
      description: "Your anonymous post has been shared with the community.",
    });

    setNewPostContent("");
    setSelectedTopic("");
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Peer Support Community
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect anonymously with fellow students. Share experiences, seek advice, and support each other
            in a safe, moderated environment.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">892</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">3,456</div>
              <div className="text-sm text-muted-foreground">Peer Interactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Safe Space</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Peer Mentors
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            {/* Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {topics.map((topic) => (
                    <div key={topic.name} className="p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                      <div className="text-sm font-medium mb-1">{topic.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {topic.posts} posts • {topic.active}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
              />
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {discussion.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{discussion.author}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {discussion.timeAgo}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {discussion.topic}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                      {discussion.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {discussion.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {discussion.likes} likes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Anonymous
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect with Peer Mentors</CardTitle>
                <CardDescription>
                  Get guidance from trained senior students who understand your challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peerMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-card transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {mentor.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentor.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{mentor.year}</p>
                        </div>
                      </div>
                      <div className={`h-3 w-3 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-primary">{mentor.specialization}</p>
                      <p className="text-sm text-muted-foreground">Languages: {mentor.languages}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Rating: ⭐ {mentor.rating}</span>
                      <span>{mentor.sessions} sessions</span>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={mentor.available ? "default" : "secondary"}
                      disabled={!mentor.available}
                    >
                      {mentor.available ? "Connect Now" : "Currently Busy"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Share Your Thoughts Anonymously
                </CardTitle>
                <CardDescription>
                  Your identity is protected. Share freely and get support from the community.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Topic</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {topics.map((topic) => (
                      <Button
                        key={topic.name}
                        variant={selectedTopic === topic.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTopic(topic.name)}
                        className="text-xs"
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Message</label>
                  <Textarea
                    placeholder="Share what's on your mind. Remember, this is a safe space and your identity is protected..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={6}
                  />
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-800">
                    Your post will be anonymous and moderated for safety
                  </span>
                </div>
                
                <Button onClick={handleNewPost} size="lg" className="w-full">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Share Anonymously
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}