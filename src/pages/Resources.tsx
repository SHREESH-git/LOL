import { useState } from "react";
import { Search, Play, Download, BookOpen, Headphones, Video, FileText, Heart, Brain, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Resources() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const resources = {
    videos: [
      {
        id: 1,
        title: "Understanding Exam Anxiety",
        description: "Learn effective techniques to manage exam stress and anxiety",
        duration: "15 min",
        language: "Hindi/English",
        category: "Academic Stress",
        thumbnail: "🎓"
      },
      {
        id: 2,
        title: "Hostel Life Adjustment",
        description: "Tips for adapting to hostel life and building social connections",
        duration: "12 min",
        language: "Hindi",
        category: "Social Issues",
        thumbnail: "🏠"
      },
      {
        id: 3,
        title: "Career Planning & Future Anxiety",
        description: "Navigate career uncertainty with confidence",
        duration: "20 min",
        language: "English",
        category: "Career Guidance",
        thumbnail: "💼"
      },
      {
        id: 4,
        title: "Relationship Issues",
        description: "Understanding and managing relationship challenges in college",
        duration: "18 min",
        language: "Hindi/English",
        category: "Social Issues",
        thumbnail: "💕"
      }
    ],
    audio: [
      {
        id: 1,
        title: "Guided Meditation for Students",
        description: "10-minute daily meditation practice for mental clarity",
        duration: "10 min",
        language: "Hindi/English",
        category: "Meditation",
        thumbnail: "🧘"
      },
      {
        id: 2,
        title: "Sleep Stories for Better Rest",
        description: "Calming stories to help you fall asleep peacefully",
        duration: "25 min",
        language: "Hindi",
        category: "Sleep",
        thumbnail: "😴"
      },
      {
        id: 3,
        title: "Breathing Exercises",
        description: "Quick breathing techniques for instant stress relief",
        duration: "8 min",
        language: "English",
        category: "Stress Relief",
        thumbnail: "🌬️"
      }
    ],
    articles: [
      {
        id: 1,
        title: "Managing Homesickness in College",
        description: "Practical strategies to cope with being away from home",
        readTime: "5 min read",
        language: "Hindi/English",
        category: "Emotional Wellness",
        thumbnail: "📝"
      },
      {
        id: 2,
        title: "Building Healthy Study Habits",
        description: "Evidence-based techniques for effective learning",
        readTime: "8 min read",
        language: "English",
        category: "Academic Success",
        thumbnail: "📚"
      },
      {
        id: 3,
        title: "Dealing with Peer Pressure",
        description: "How to stay true to yourself in social situations",
        readTime: "6 min read",
        language: "Hindi",
        category: "Social Skills",
        thumbnail: "👥"
      }
    ],
    guides: [
      {
        id: 1,
        title: "Complete Mental Health Toolkit",
        description: "Comprehensive guide with exercises, techniques, and resources",
        pages: "45 pages",
        language: "Hindi/English",
        category: "Complete Guide",
        thumbnail: "📖"
      },
      {
        id: 2,
        title: "Crisis Management Handbook",
        description: "Step-by-step guide for handling mental health emergencies",
        pages: "20 pages",
        language: "Hindi/English",
        category: "Crisis Support",
        thumbnail: "🆘"
      },
      {
        id: 3,
        title: "Daily Wellness Planner",
        description: "Printable planner for tracking mood, habits, and goals",
        pages: "30 pages",
        language: "Hindi/English",
        category: "Self-Care",
        thumbnail: "📅"
      }
    ]
  };

  const categories = [
    { name: "Academic Stress", icon: "🎓", color: "bg-blue-100 text-blue-800" },
    { name: "Social Issues", icon: "👥", color: "bg-green-100 text-green-800" },
    { name: "Emotional Wellness", icon: "❤️", color: "bg-red-100 text-red-800" },
    { name: "Career Guidance", icon: "💼", color: "bg-purple-100 text-purple-800" },
    { name: "Self-Care", icon: "🌸", color: "bg-pink-100 text-pink-800" },
    { name: "Crisis Support", icon: "🆘", color: "bg-orange-100 text-orange-800" }
  ];

  const ResourceCard = ({ resource, type }: { resource: any, type: string }) => {
    const getIcon = () => {
      switch (type) {
        case 'videos': return <Video className="h-5 w-5" />;
        case 'audio': return <Headphones className="h-5 w-5" />;
        case 'articles': return <FileText className="h-5 w-5" />;
        case 'guides': return <BookOpen className="h-5 w-5" />;
        default: return <FileText className="h-5 w-5" />;
      }
    };

    return (
      <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="text-3xl mb-2">{resource.thumbnail}</div>
            <Badge variant="secondary" className="text-xs">
              {resource.language}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
          <CardDescription className="text-sm">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{resource.duration || resource.readTime || resource.pages}</span>
            <Badge variant="outline" className="text-xs">
              {resource.category}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              {getIcon()}
              <span className="ml-2">
                {type === 'videos' ? 'Watch' : type === 'audio' ? 'Listen' : type === 'articles' ? 'Read' : 'Download'}
              </span>
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            {t('resources.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('resources.description')}
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
            <Input
              placeholder={t('resources.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category, index) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto p-3 flex-col space-y-2 hover:scale-105 transition-all duration-300 hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs text-center leading-tight">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video) => (
                <ResourceCard key={video.id} resource={video} type="videos" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.audio.map((audio) => (
                <ResourceCard key={audio.id} resource={audio} type="audio" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.articles.map((article) => (
                <ResourceCard key={article.id} resource={article} type="articles" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.guides.map((guide) => (
                <ResourceCard key={guide.id} resource={guide} type="guides" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mental Health Resources - Relationship Issues */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Relationship Issues
              </CardTitle>
              <CardDescription>
                Resources for navigating relationship challenges in student life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Healthy Relationships Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Communication Skills Workshop
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Headphones className="h-4 w-4 mr-2" />
                  Relationship Counseling Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Resources */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Heart className="h-5 w-5" />
                Emergency Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h3 className="font-semibold text-red-800 mb-2">Crisis Helpline</h3>
                  <p className="text-sm text-red-700 mb-2">24/7 Support Available</p>
                  <Button variant="destructive" size="sm">
                    Call Now: 1800-599-0019
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-red-800 mb-2">Campus Counselor</h3>
                  <p className="text-sm text-red-700 mb-2">On-site professional help</p>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700">
                    Book Emergency Session
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-red-800 mb-2">Peer Support</h3>
                  <p className="text-sm text-red-700 mb-2">Talk to trained students</p>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700">
                    Connect Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}