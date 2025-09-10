import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Auth helpers
export const signUp = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({ id: userId, ...updates })
    .select()
    .single();
  return { data, error };
};

// Mood tracking helpers
export const getMoodEntries = async (userId: string, limit = 30) => {
  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const saveMoodEntry = async (moodData: any) => {
  const { data, error } = await supabase
    .from('mood_entries')
    .upsert(moodData)
    .select()
    .single();
  return { data, error };
};

// Journal helpers
export const getJournalEntries = async (userId: string, limit = 50) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const saveJournalEntry = async (entryData: any) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert(entryData)
    .select()
    .single();
  return { data, error };
};

export const updateJournalEntry = async (entryId: string, updates: any) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .update(updates)
    .eq('id', entryId)
    .select()
    .single();
  return { data, error };
};

export const deleteJournalEntry = async (entryId: string) => {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', entryId);
  return { error };
};

// Activities helpers
export const getUserActivities = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_activities')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
  return { data, error };
};

export const saveActivityCompletion = async (activityData: any) => {
  const { data, error } = await supabase
    .from('user_activities')
    .insert(activityData)
    .select()
    .single();
  return { data, error };
};

// Assessment helpers
export const saveAssessmentResult = async (assessmentData: any) => {
  const { data, error } = await supabase
    .from('assessment_results')
    .insert(assessmentData)
    .select()
    .single();
  return { data, error };
};

export const getAssessmentHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
  return { data, error };
};

// Counseling helpers
export const getCounselors = async () => {
  const { data, error } = await supabase
    .from('counselors')
    .select('*')
    .eq('is_available', true)
    .order('rating', { ascending: false });
  return { data, error };
};

export const bookCounselingSession = async (sessionData: any) => {
  const { data, error } = await supabase
    .from('counseling_sessions')
    .insert(sessionData)
    .select()
    .single();
  return { data, error };
};

export const getUserSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from('counseling_sessions')
    .select(`
      *,
      counselors (
        name,
        specialization,
        languages
      )
    `)
    .eq('user_id', userId)
    .order('session_date', { ascending: false });
  return { data, error };
};

// Pomodoro helpers
export const savePomodoroSession = async (sessionData: any) => {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .insert(sessionData)
    .select()
    .single();
  return { data, error };
};

export const updatePomodoroSession = async (sessionId: string, updates: any) => {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();
  return { data, error };
};

export const getPomodoroStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)
    .gte('started_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
  return { data, error };
};