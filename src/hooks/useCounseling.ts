import { useState, useEffect } from 'react';
import { getCounselors, bookCounselingSession, getUserSessions } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Counselor {
  id: string;
  name: string;
  specialization: string;
  experience_years: number;
  languages: string[];
  rating: number;
  is_available: boolean;
  bio?: string;
  created_at?: string;
}

export interface CounselingSession {
  id?: string;
  user_id: string;
  counselor_id: string;
  session_date: string;
  session_time: string;
  issue_category: 'anxiety' | 'depression' | 'academic' | 'relationships' | 'career' | 'family' | 'other';
  urgency_level: 'low' | 'medium' | 'high';
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  created_at?: string;
  counselors?: Counselor;
}

export function useCounseling() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [sessions, setSessions] = useState<CounselingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCounselors();
    if (user) {
      loadUserSessions();
    }
  }, [user]);

  const loadCounselors = async () => {
    try {
      const { data, error } = await getCounselors();
      if (error) throw error;
      setCounselors(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load counselors",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadUserSessions = async () => {
    if (!user) return;

    try {
      const { data, error } = await getUserSessions(user.id);
      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load sessions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async (sessionData: Omit<CounselingSession, 'id' | 'user_id' | 'status' | 'created_at'>) => {
    if (!user) return;

    try {
      const newSession = {
        user_id: user.id,
        status: 'scheduled' as const,
        ...sessionData,
      };

      const { data, error } = await bookCounselingSession(newSession);
      if (error) throw error;

      setSessions(prev => [data, ...prev]);

      toast({
        title: "Session booked successfully!",
        description: "You'll receive a confirmation email shortly.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to book session",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const getUpcomingSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    return sessions.filter(session => 
      session.session_date >= today && session.status === 'scheduled'
    ).sort((a, b) => 
      new Date(a.session_date).getTime() - new Date(b.session_date).getTime()
    );
  };

  const getSessionHistory = () => {
    return sessions.filter(session => 
      session.status === 'completed'
    ).sort((a, b) => 
      new Date(b.session_date).getTime() - new Date(a.session_date).getTime()
    );
  };

  return {
    counselors,
    sessions,
    loading,
    bookSession,
    getUpcomingSessions,
    getSessionHistory,
    refreshCounselors: loadCounselors,
    refreshSessions: loadUserSessions,
  };
}