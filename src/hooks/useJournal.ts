import { useState, useEffect } from 'react';
import { 
  getJournalEntries, 
  saveJournalEntry, 
  updateJournalEntry, 
  deleteJournalEntry 
} from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface JournalEntry {
  id?: string;
  user_id: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export function useJournal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadJournalEntries();
    }
  }, [user]);

  const loadJournalEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await getJournalEntries(user.id);
      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load journal entries",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async (entryData: Omit<JournalEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const newEntry = {
        user_id: user.id,
        ...entryData,
      };

      const { data, error } = await saveJournalEntry(newEntry);
      if (error) throw error;

      setEntries(prev => [data, ...prev]);

      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to save entry",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<JournalEntry>) => {
    try {
      const { data, error } = await updateJournalEntry(entryId, updates);
      if (error) throw error;

      setEntries(prev => prev.map(entry => 
        entry.id === entryId ? data : entry
      ));

      toast({
        title: "Entry updated",
        description: "Your journal entry has been updated successfully.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to update entry",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { error } = await deleteJournalEntry(entryId);
      if (error) throw error;

      setEntries(prev => prev.filter(entry => entry.id !== entryId));

      toast({
        title: "Entry deleted",
        description: "Your journal entry has been deleted.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Failed to delete entry",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const getEntriesByDate = (date: string) => {
    return entries.filter(entry => 
      entry.created_at?.split('T')[0] === date
    );
  };

  const getEntryStats = () => {
    const totalEntries = entries.length;
    const thisWeekEntries = entries.filter(entry => {
      const entryDate = new Date(entry.created_at || '');
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }).length;

    // Calculate streak
    let currentStreak = 0;
    const sortedDates = [...new Set(entries.map(e => e.created_at?.split('T')[0]))].sort().reverse();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (sortedDates[i] === expectedDateStr) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalEntries,
      thisWeekEntries,
      currentStreak,
    };
  };

  return {
    entries,
    loading,
    saveEntry,
    updateEntry,
    deleteEntry,
    getEntriesByDate,
    getEntryStats,
    refreshEntries: loadJournalEntries,
  };
}