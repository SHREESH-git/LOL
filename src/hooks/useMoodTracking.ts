import { useState, useEffect } from 'react';
import { getMoodEntries, saveMoodEntry } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface MoodEntry {
  id?: string;
  user_id: string;
  mood_value: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  notes?: string;
  activities?: string[];
  date: string;
  created_at?: string;
}

export function useMoodTracking() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMoodEntries();
    }
  }, [user]);

  const loadMoodEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await getMoodEntries(user.id);
      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load mood entries",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveMood = async (moodData: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const entryData = {
        user_id: user.id,
        ...moodData,
      };

      const { data, error } = await saveMoodEntry(entryData);
      if (error) throw error;

      // Update local state
      setEntries(prev => {
        const filtered = prev.filter(entry => entry.date !== moodData.date);
        return [data, ...filtered].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });

      toast({
        title: "Mood recorded",
        description: "Your mood has been saved successfully.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to save mood",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return entries.find(entry => entry.date === today);
  };

  const getWeeklyMoodData = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return entries.filter(entry => 
      new Date(entry.date) >= weekAgo
    ).slice(0, 7);
  };

  const getMoodAverage = (days = 7) => {
    const recentEntries = entries.slice(0, days);
    if (recentEntries.length === 0) return 0;

    const moodValues = {
      'terrible': 1,
      'bad': 2,
      'neutral': 3,
      'good': 4,
      'great': 5
    };

    const sum = recentEntries.reduce((acc, entry) => 
      acc + moodValues[entry.mood_value], 0
    );

    return sum / recentEntries.length;
  };

  return {
    entries,
    loading,
    saveMood,
    getTodaysMood,
    getWeeklyMoodData,
    getMoodAverage,
    refreshEntries: loadMoodEntries,
  };
}