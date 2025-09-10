import { useState, useEffect } from 'react';
import { getUserActivities, saveActivityCompletion } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface UserActivity {
  id?: string;
  user_id: string;
  activity_id: string;
  completed_at?: string;
  notes?: string;
}

export function useActivities() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedActivities, setCompletedActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserActivities();
    }
  }, [user]);

  const loadUserActivities = async () => {
    if (!user) return;

    try {
      const { data, error } = await getUserActivities(user.id);
      if (error) throw error;
      setCompletedActivities(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load activities",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeActivity = async (activityId: string, notes?: string) => {
    if (!user) return;

    try {
      const activityData = {
        user_id: user.id,
        activity_id: activityId,
        notes,
      };

      const { data, error } = await saveActivityCompletion(activityData);
      if (error) throw error;

      setCompletedActivities(prev => [data, ...prev]);

      toast({
        title: "Activity completed!",
        description: "Great job on completing this wellness activity.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to save activity",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const isActivityCompleted = (activityId: string, date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return completedActivities.some(activity => 
      activity.activity_id === activityId &&
      activity.completed_at?.split('T')[0] === targetDate
    );
  };

  const getTodaysActivities = () => {
    const today = new Date().toISOString().split('T')[0];
    return completedActivities.filter(activity => 
      activity.completed_at?.split('T')[0] === today
    );
  };

  const getActivityStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const todayCount = getTodaysActivities().length;
    const weekCount = completedActivities.filter(activity => 
      new Date(activity.completed_at || '') >= weekAgo
    ).length;

    // Calculate streak (simplified)
    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const hasActivity = completedActivities.some(activity => 
        activity.completed_at?.split('T')[0] === dateStr
      );
      
      if (hasActivity) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    return {
      todayCount,
      weekCount,
      streak,
      totalActivities: completedActivities.length,
    };
  };

  return {
    completedActivities,
    loading,
    completeActivity,
    isActivityCompleted,
    getTodaysActivities,
    getActivityStats,
    refreshActivities: loadUserActivities,
  };
}