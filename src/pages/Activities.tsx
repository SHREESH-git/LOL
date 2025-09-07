import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ActivityCard, Activity } from "@/components/activities/ActivityCard";
import { activities, activityCategories, getRecommendedActivities } from "@/data/activities";
import { 
  Gamepad2, 
  Search, 
  Filter,
  TrendingUp,
  Target,
  Clock,
  Brain,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = 'mind-matters-completed-activities';

export default function Activities() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof activityCategories>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [recommendedMood, setRecommendedMood] = useState<string>('');

  // Load completed activities from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedActivities(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load completed activities:', error);
    }
  }, []);

  // Save completed activities to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedActivities));
    } catch (error) {
      console.error('Failed to save completed activities:', error);
    }
  }, [completedActivities]);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase())) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleCompleted = (activityId: string) => {
    setCompletedActivities(prev => {
      const newCompleted = prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId];
      
      const activity = activities.find(a => a.id === activityId);
      
      if (!prev.includes(activityId)) {
        toast({
          title: "Activity completed! 🎉",
          description: `Great job completing "${activity?.title}". Keep up the wellness journey!`,
        });
      }
      
      return newCompleted;
    });
  };

  const handleStartActivity = (activity: Activity) => {
    toast({
      title: `Starting: ${activity.title}`,
      description: `Duration: ${activity.duration} • Difficulty: ${activity.difficulty}`,
    });
    // Here you could implement activity-specific logic
  };

  // Calculate stats
  const todayCompleted = completedActivities.length; // Simplified for demo
  const weekStreak = Math.min(todayCompleted, 7); // Simplified streak calculation
  const totalCategories = Object.keys(activityCategories).length - 1; // Exclude 'all'

  const recommendedActivities = getRecommendedActivities(recommendedMood);

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Gamepad2}
          title={t('activities.title')}
          description={t('activities.description')}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title={t('activities.available')}
            value={activities.length}
            description={t('activities.available.desc')}
            icon={Target}
            variant="primary"
          />
          <StatCard
            title={t('activities.completed')}
            value={todayCompleted}
            description={t('activities.completed.desc')}
            icon={TrendingUp}
            variant="success"
            trend={todayCompleted > 0 ? { value: 12, isPositive: true } : undefined}
          />
          <StatCard
            title={t('activities.categories')}
            value={totalCategories}
            description={t('activities.categories.desc')}
            icon={Brain}
            variant="warning"
          />
          <StatCard
            title={t('activities.streak')}
            value={`${weekStreak}/7`}
            description={t('activities.streak.desc')}
            icon={Sparkles}
            variant="default"
          />
        </div>

        {/* Quick Recommendations */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t('activities.recommendations')}
            </CardTitle>
            <CardDescription>
              {t('activities.recommendations.desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap mb-4">
              {['stressed', 'anxious', 'low-energy', 'creative'].map((mood) => (
                <Button
                  key={mood}
                  variant={recommendedMood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRecommendedMood(recommendedMood === mood ? '' : mood)}
                  className="capitalize"
                >
                  {mood === 'low-energy' ? 'Low Energy' : mood}
                </Button>
              ))}
            </div>
            
            {recommendedActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="p-3 bg-background/60 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <activity.icon className={cn("h-4 w-4", activity.color)} />
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground ml-auto">{activity.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => {
                        setSelectedCategory(activity.category as keyof typeof activityCategories);
                        setSearchQuery(activity.title);
                      }}
                    >
                      {t('activities.find.activity')}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t('activities.recommendations.desc')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('activities.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:ring-2 focus:ring-primary transition-all duration-200"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                ×
              </Button>
            )}
          </div>

          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as keyof typeof activityCategories)}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
              {Object.entries(activityCategories).map(([key, label]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="text-xs px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {label.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Activity Grid */}
        <div className="mb-8">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isCompleted={completedActivities.includes(activity.id)}
                  onToggleComplete={toggleCompleted}
                  onStartActivity={handleStartActivity}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Filter}
              title={t('activities.no.found')}
              description={t('activities.no.found.desc')}
              action={{
                label: t('activities.clear.filters'),
                onClick: () => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }
              }}
            />
          )}
        </div>

        {/* Tips and Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {t('activities.tips.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary">🎯</span>
                <span>Start with easy activities and gradually increase difficulty</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">⏰</span>
                <span>Consistency matters more than duration - even 5 minutes helps</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">🧠</span>
                <span>Mix different types of activities for holistic wellness</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">📱</span>
                <span>Set reminders to make activities part of your routine</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t('activities.time.suggestions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-success mb-1">🌅 Morning (5-15 min)</h4>
                <p className="text-muted-foreground text-xs">Mindfulness, gratitude practice, gentle stretches</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-primary mb-1">🎯 Study Breaks (5-10 min)</h4>
                <p className="text-muted-foreground text-xs">Deep breathing, desk stretches, brain games</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-warning mb-1">🌆 Evening (15-30 min)</h4>
                <p className="text-muted-foreground text-xs">Creative activities, relaxation, wind-down routines</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}