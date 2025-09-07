import { 
  Heart, 
  Zap, 
  Palette, 
  Music, 
  Dumbbell, 
  Camera,
  BookOpen,
  Brain,
  Users,
  Gamepad2,
  Sunrise,
  Moon,
  Waves,
  TreePine,
  Coffee,
  Headphones
} from "lucide-react";
import { Activity } from "@/components/activities/ActivityCard";

export const activityCategories = {
  all: 'All Activities',
  mindfulness: 'Mindfulness & Meditation',
  creative: 'Creative Expression',
  physical: 'Physical Wellness',
  cognitive: 'Cognitive Training',
  social: 'Social Connection',
  relaxation: 'Rest & Relaxation'
} as const;

export const activities: Activity[] = [
  // Mindfulness & Meditation
  {
    id: 'breath-work',
    title: 'Deep Breathing Exercise',
    description: 'Simple 4-7-8 breathing technique to reduce anxiety and promote instant calmness.',
    category: 'mindfulness',
    duration: '5-10 min',
    difficulty: 'Easy',
    benefits: ['Reduces anxiety', 'Improves focus', 'Promotes relaxation', 'Lowers heart rate'],
    icon: Heart,
    color: 'text-pink-500',
    recommendedFor: ['Anxiety relief', 'Before exams', 'Sleep preparation']
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    description: 'Progressive muscle relaxation and mindfulness practice to release tension.',
    category: 'mindfulness',
    duration: '15-25 min',
    difficulty: 'Medium',
    benefits: ['Reduces tension', 'Improves sleep', 'Increases awareness', 'Stress relief'],
    icon: Zap,
    color: 'text-purple-500',
    recommendedFor: ['Evening routine', 'Chronic stress', 'Physical tension']
  },
  {
    id: 'morning-mindfulness',
    title: 'Morning Mindfulness',
    description: 'Start your day with intention through guided morning meditation and gratitude.',
    category: 'mindfulness',
    duration: '10-15 min',
    difficulty: 'Easy',
    benefits: ['Positive mindset', 'Mental clarity', 'Emotional balance', 'Daily structure'],
    icon: Sunrise,
    color: 'text-amber-500',
    recommendedFor: ['Morning routine', 'Goal setting', 'Productivity boost']
  },
  
  // Creative Expression
  {
    id: 'art-therapy',
    title: 'Expressive Art Therapy',
    description: 'Express emotions through free-form drawing, painting, or digital art creation.',
    category: 'creative',
    duration: '20-45 min',
    difficulty: 'Easy',
    benefits: ['Emotional expression', 'Stress relief', 'Self-discovery', 'Creative outlet'],
    icon: Palette,
    color: 'text-orange-500',
    recommendedFor: ['Emotional processing', 'Creative blocks', 'Self-expression']
  },
  {
    id: 'music-therapy',
    title: 'Music & Sound Healing',
    description: 'Listen to or create music to improve mood and emotional well-being.',
    category: 'creative',
    duration: '15-45 min',
    difficulty: 'Easy',
    benefits: ['Mood enhancement', 'Emotional regulation', 'Creativity boost', 'Stress reduction'],
    icon: Music,
    color: 'text-blue-500',
    recommendedFor: ['Mood regulation', 'Creative inspiration', 'Relaxation']
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing Practice',
    description: 'Explore thoughts and feelings through poetry, storytelling, or stream-of-consciousness writing.',
    category: 'creative',
    duration: '20-30 min',
    difficulty: 'Medium',
    benefits: ['Self-reflection', 'Emotional processing', 'Communication skills', 'Mental clarity'],
    icon: BookOpen,
    color: 'text-indigo-500',
    recommendedFor: ['Processing emotions', 'Self-discovery', 'Communication']
  },
  
  // Physical Wellness
  {
    id: 'yoga-flow',
    title: 'Mindful Yoga Flow',
    description: 'Gentle yoga sequence combining movement with mindful breathing for flexibility and calm.',
    category: 'physical',
    duration: '20-45 min',
    difficulty: 'Medium',
    benefits: ['Flexibility', 'Stress reduction', 'Mind-body connection', 'Physical strength'],
    icon: Dumbbell,
    color: 'text-green-500',
    recommendedFor: ['Physical wellness', 'Stress relief', 'Morning energy']
  },
  {
    id: 'nature-walk',
    title: 'Mindful Nature Walk',
    description: 'Mindful walking outdoors to connect with nature and reduce stress through movement.',
    category: 'physical',
    duration: '15-60 min',
    difficulty: 'Easy',
    benefits: ['Vitamin D', 'Mood boost', 'Physical activity', 'Nature connection'],
    icon: TreePine,
    color: 'text-emerald-500',
    recommendedFor: ['Fresh air', 'Exercise', 'Mood enhancement']
  },
  {
    id: 'desk-stretches',
    title: 'Desk Yoga & Stretches',
    description: 'Simple stretches and movements you can do at your desk to release tension.',
    category: 'physical',
    duration: '5-15 min',
    difficulty: 'Easy',
    benefits: ['Posture improvement', 'Tension relief', 'Energy boost', 'Focus enhancement'],
    icon: Zap,
    color: 'text-green-500',
    recommendedFor: ['Study breaks', 'Office work', 'Physical tension']
  },
  
  // Cognitive Training
  {
    id: 'gratitude-journal',
    title: 'Gratitude Practice',
    description: 'Daily gratitude journaling to cultivate positive thinking and appreciation.',
    category: 'cognitive',
    duration: '10-15 min',
    difficulty: 'Easy',
    benefits: ['Positive mindset', 'Self-reflection', 'Emotional balance', 'Life satisfaction'],
    icon: BookOpen,
    color: 'text-amber-500',
    recommendedFor: ['Morning routine', 'Positive thinking', 'Mental wellness']
  },
  {
    id: 'brain-training',
    title: 'Brain Training Games',
    description: 'Engage in memory games, puzzles, or logic challenges to boost cognitive function.',
    category: 'cognitive',
    duration: '15-30 min',
    difficulty: 'Medium',
    benefits: ['Cognitive function', 'Problem-solving', 'Mental agility', 'Focus improvement'],
    icon: Brain,
    color: 'text-indigo-500',
    recommendedFor: ['Study prep', 'Mental sharpness', 'Problem-solving']
  },
  {
    id: 'mindful-reading',
    title: 'Mindful Reading',
    description: 'Slow, intentional reading practice to improve focus and comprehension.',
    category: 'cognitive',
    duration: '20-40 min',
    difficulty: 'Easy',
    benefits: ['Focus improvement', 'Knowledge gain', 'Mental stimulation', 'Relaxation'],
    icon: BookOpen,
    color: 'text-blue-500',
    recommendedFor: ['Learning', 'Focus training', 'Relaxation']
  },
  
  // Social Connection
  {
    id: 'peer-support',
    title: 'Virtual Support Group',
    description: 'Join online peer support discussions and share experiences with fellow students.',
    category: 'social',
    duration: '30-60 min',
    difficulty: 'Medium',
    benefits: ['Social connection', 'Peer support', 'Reduced isolation', 'Shared experiences'],
    icon: Users,
    color: 'text-cyan-500',
    recommendedFor: ['Social support', 'Shared experiences', 'Community']
  },
  {
    id: 'mindful-gaming',
    title: 'Collaborative Gaming',
    description: 'Play cooperative or mindfulness-based games with others for social connection.',
    category: 'social',
    duration: '20-45 min',
    difficulty: 'Easy',
    benefits: ['Social interaction', 'Fun & enjoyment', 'Stress relief', 'Team building'],
    icon: Gamepad2,
    color: 'text-violet-500',
    recommendedFor: ['Social fun', 'Stress relief', 'Team building']
  },
  {
    id: 'study-buddy',
    title: 'Study Buddy Session',
    description: 'Connect with peers for collaborative studying and mutual support.',
    category: 'social',
    duration: '45-90 min',
    difficulty: 'Easy',
    benefits: ['Academic support', 'Social connection', 'Motivation', 'Accountability'],
    icon: Users,
    color: 'text-blue-500',
    recommendedFor: ['Academic support', 'Motivation', 'Social learning']
  },
  
  // Rest & Relaxation
  {
    id: 'tea-meditation',
    title: 'Mindful Tea Ceremony',
    description: 'Slow, intentional tea drinking as a form of meditation and self-care.',
    category: 'relaxation',
    duration: '15-25 min',
    difficulty: 'Easy',
    benefits: ['Mindfulness', 'Relaxation', 'Self-care', 'Present moment awareness'],
    icon: Coffee,
    color: 'text-amber-500',
    recommendedFor: ['Self-care', 'Afternoon break', 'Mindfulness']
  },
  {
    id: 'sound-bath',
    title: 'Sound Bath Relaxation',
    description: 'Immersive sound experience with healing frequencies and nature sounds.',
    category: 'relaxation',
    duration: '20-45 min',
    difficulty: 'Easy',
    benefits: ['Deep relaxation', 'Stress relief', 'Mental clarity', 'Emotional healing'],
    icon: Headphones,
    color: 'text-purple-500',
    recommendedFor: ['Stress relief', 'Relaxation', 'Sleep preparation']
  },
  {
    id: 'evening-routine',
    title: 'Evening Wind-Down',
    description: 'Gentle evening routine combining relaxation techniques for better sleep.',
    category: 'relaxation',
    duration: '25-40 min',
    difficulty: 'Easy',
    benefits: ['Better sleep', 'Stress relief', 'Relaxation', 'Daily closure'],
    icon: Moon,
    color: 'text-indigo-500',
    recommendedFor: ['Sleep improvement', 'Evening routine', 'Stress relief']
  }
];

export const getActivitiesByCategory = (category: keyof typeof activityCategories) => {
  if (category === 'all') return activities;
  return activities.filter(activity => activity.category === category);
};

export const getRecommendedActivities = (mood?: string, timeAvailable?: number) => {
  let recommended = activities;
  
  // Filter by mood
  if (mood) {
    switch (mood) {
      case 'stressed':
        recommended = activities.filter(a => 
          a.category === 'mindfulness' || 
          a.category === 'relaxation' ||
          a.benefits.some(b => b.toLowerCase().includes('stress'))
        );
        break;
      case 'anxious':
        recommended = activities.filter(a => 
          a.benefits.some(b => b.toLowerCase().includes('anxiety')) ||
          a.category === 'mindfulness'
        );
        break;
      case 'low-energy':
        recommended = activities.filter(a => 
          a.category === 'physical' || 
          a.benefits.some(b => b.toLowerCase().includes('energy'))
        );
        break;
      case 'creative':
        recommended = activities.filter(a => a.category === 'creative');
        break;
    }
  }
  
  // Filter by available time
  if (timeAvailable) {
    recommended = recommended.filter(activity => {
      const maxTime = parseInt(activity.duration.split('-')[1] || activity.duration);
      return maxTime <= timeAvailable;
    });
  }
  
  return recommended.slice(0, 6); // Return top 6 recommendations
};