import { FeatureCard } from "@/components/FeatureCard";
import { QuoteCard } from "@/components/QuoteCard";
import { QuoteOfTheDayPopup } from "@/components/QuoteOfTheDayPopup";
import { SlideshowBackground } from "@/components/SlideshowBackground";
import { IssueCard } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import { getDailyQuote } from "@/data/dailyQuotes";
import { 
  Brain, 
  Heart, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Timer,
  TrendingUp,
  Shield,
  Globe,
  Award,
  Zap,
  Trophy,
  UserX,
  Home,
  HeartHandshake,
  IndianRupee,
  DollarSign,
  Phone
} from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const dailyQuote = getDailyQuote('urban');

  const getNavigationPath = (title: string) => {
    switch (title) {
      case "AI Mental Health Support":
        return "/ai-chat";
      case "Mood Tracking & Analytics":
        return "/mood";
      case "Confidential Counselling":
        return "/booking";
      case "Wellness Resources Hub":
        return "/resources";
      case "Peer Support Community":
        return "/community";
      case "Pomodoro Wellness Coach":
        return "/pomodoro";
      default:
        return "/";
    }
  };
  const features = [
    {
      title: t('feature.ai.title'),
      description: t('feature.ai.description'),
      icon: MessageCircle,
      action: t('feature.ai.action'),
      gradient: "primary" as const,
    },
    {
      title: t('feature.mood.title'), 
      description: t('feature.mood.description'),
      icon: Heart,
      action: t('feature.mood.action'),
      gradient: "wellness" as const,
    },
    {
      title: t('feature.counselling.title'),
      description: t('feature.counselling.description'),
      icon: Calendar,
      action: t('feature.counselling.action'),
      gradient: "calm" as const,
    },
    {
      title: t('feature.resources.title'),
      description: t('feature.resources.description'),
      icon: BookOpen,
      action: t('feature.resources.action'),
      gradient: "primary" as const,
    },
    {
      title: t('feature.community.title'),
      description: t('feature.community.description'),
      icon: Users,
      action: t('feature.community.action'),
      gradient: "wellness" as const,
    },
    {
      title: t('feature.pomodoro.title'),
      description: t('feature.pomodoro.description'),
      icon: Timer,
      action: t('feature.pomodoro.action'),
      gradient: "calm" as const,
    },
  ];

  const differentiators = [
    { icon: Globe, title: "Multilingual & Cultural", desc: "Content in regional languages" },
    { icon: Shield, title: "Privacy First", desc: "Anonymous analytics & quick exit" },
    { icon: Zap, title: "Works Offline", desc: "PWA support for rural areas" },
    { icon: Award, title: "Gamified Wellness", desc: "Points & badges for self-care" },
  ];

  const issueCards = [
    {
      title: "Competition",
      icon: Trophy,
      bulletPoints: [
        "Manage academic pressure effectively",
        "Build healthy competitive mindset",
        "Focus on personal growth over comparison"
      ],
      actionLabel: "Get Support",
      gradient: "primary" as const
    },
    {
      title: "FOMO",
      icon: UserX,
      bulletPoints: [
        "Combat fear of missing out",
        "Practice digital wellness",
        "Build authentic connections"
      ],
      actionLabel: "Learn More",
      gradient: "wellness" as const
    },
    {
      title: "Homesickness",
      icon: Home,
      bulletPoints: [
        "Cope with being away from family",
        "Create new support systems",
        "Stay connected while independent"
      ],
      actionLabel: "Find Resources",
      gradient: "calm" as const
    },
    {
      title: "Financial Stress",
      icon: IndianRupee,
      bulletPoints: [
        "Manage education expenses wisely",
        "Find scholarships and financial aid",
        "Build healthy money habits"
      ],
      actionLabel: "Get Guidance",
      gradient: "primary" as const
    },
    {
      title: "Relationships",
      icon: HeartHandshake,
      bulletPoints: [
        "Navigate relationship challenges",
        "Build healthy boundaries",
        "Communicate effectively"
      ],
      actionLabel: "Explore Tools",
      gradient: "primary" as const
    },
    {
      title: "Financial Burden",
      icon: DollarSign,
      bulletPoints: [
        "Manage financial stress",
        "Access support resources",
        "Learn budgeting skills"
      ],
      actionLabel: "Get Help",
      gradient: "wellness" as const
    }
  ];

  // Add smooth scroll to assessment section
  useEffect(() => {
    if (window.location.hash === '#assessment') {
      const element = document.getElementById('assessment');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <QuoteOfTheDayPopup />
      <div className="min-h-screen">

      {/* Hero Section with Slideshow Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-16">
      <SlideshowBackground />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center text-white space-y-6 animate-slide-up">
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              {t('dashboard.hero.title')}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed drop-shadow-md">
              {t('dashboard.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4 shadow-glow"
                onClick={() => {
                  const element = document.getElementById('assessment');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Brain className="mr-2 h-5 w-5" />
                {t('dashboard.hero.cta')}
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/booking')}
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('dashboard.hero.emergency')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{t('dashboard.daily.inspiration')}</h2>
            <p className="text-muted-foreground">
              {t('dashboard.daily.subtitle')}
            </p>
          </div>
          <Card className="hover:shadow-card transition-all duration-300">
            <CardContent className="pt-6">
              <blockquote className="text-center space-y-4">
                <p className="text-lg italic">"{dailyQuote.text}"</p>
                <footer className="text-sm text-muted-foreground">
                  — {dailyQuote.author}
                  <Badge variant="secondary" className="ml-2">
                    {dailyQuote.category}
                  </Badge>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Student Issues */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.challenges.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.challenges.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {issueCards.map((issue, index) => (
              <IssueCard
                key={index}
                title={issue.title}
                icon={issue.icon}
                bulletPoints={issue.bulletPoints}
                actionLabel={issue.actionLabel}
                gradient={issue.gradient}
                onAction={() => navigate('/resources')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.differentiators.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.differentiators.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {differentiators.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="assessment" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.features.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                action={feature.action}
                gradient={feature.gradient}
                onAction={() => {
                  navigate(getNavigationPath(feature.title));
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Impact */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">24/7</CardTitle>
                <CardDescription>AI Support Available</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-success">100%</CardTitle>
                <CardDescription>Anonymous & Confidential</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-warning">15+</CardTitle>
                <CardDescription>Regional Languages Supported</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-calm text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{t('dashboard.cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('dashboard.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              {t('dashboard.cta.get_started')}
            </Button>
            <Button variant="glass" size="lg">
              {t('dashboard.cta.learn_more')}
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}