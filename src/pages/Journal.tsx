import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { JournalEntry, JournalEntryData } from "@/components/journal/JournalEntry";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { JournalStats } from "@/components/journal/JournalStats";
import { MoodValue } from "@/components/ui/mood-selector";
import { 
  BookOpen, 
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = 'mind-matters-journal-entries';

export default function Journal() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState<JournalEntryData | null>(null);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY);
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error('Failed to load journal entries:', error);
      toast({
        title: t('journal.toast.errorLoading'),
        description: t('journal.toast.errorLoadingDesc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, t]);

  // Save entries to localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.error('Failed to save journal entries:', error);
        toast({
          title: t('journal.toast.errorSaving'),
          description: t('journal.toast.errorSavingDesc'),
          variant: "destructive",
        });
      }
    }
  }, [entries, isLoading, toast, t]);

  const handleSaveEntry = (entryData: {
    mood: MoodValue;
    content: string;
    tags?: string[];
  }) => {
    if (editingEntry) {
      // Update existing entry
      const updatedEntry: JournalEntryData = {
        ...editingEntry,
        ...entryData,
      };
      
      setEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id ? updatedEntry : entry
      ));
      
      setEditingEntry(null);
      
      toast({
        title: t('journal.toast.entryUpdated'),
        description: t('journal.toast.entryUpdatedDesc'),
      });
    } else {
      // Create new entry
      const newEntry: JournalEntryData = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: selectedDate.toISOString().split('T')[0],
        ...entryData,
      };

      setEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: t('journal.toast.entrySaved'),
        description: t('journal.toast.entrySavedDesc'),
      });
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast({
      title: t('journal.toast.entryDeleted'),
      description: t('journal.toast.entryDeletedDesc'),
    });
  };

  const handleEditEntry = (entry: JournalEntryData) => {
    setEditingEntry(entry);
    // Scroll to editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const selectedDateEntries = entries.filter(
    entry => entry.date === selectedDate.toISOString().split('T')[0]
  );

  const recentEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={BookOpen}
          title={t('journal.title')}
          description={t('journal.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Journal Editor */}
            <JournalEditor
              onSave={handleSaveEntry}
              isEditing={!!editingEntry}
              onCancel={editingEntry ? handleCancelEdit : undefined}
              initialData={editingEntry ? {
                mood: editingEntry.mood,
                content: editingEntry.content,
                tags: editingEntry.tags
              } : undefined}
            />

            {/* Recent Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {t('journal.recentEntries')}
                </CardTitle>
                <CardDescription>
                  {t('journal.recentEntries')} • {entries.length} {t('journal.totalEntries')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEntries.length === 0 ? (
                  <EmptyState
                    icon={BookOpen}
                    title={t('journal.noEntries')}
                    description={t('journal.noEntriesDescription')}
                    action={{
                      label: t('journal.writeFirst'),
                      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                ) : (
                  recentEntries.map((entry) => (
                    <JournalEntry
                      key={entry.id}
                      entry={entry}
                      onDelete={handleDeleteEntry}
                      onEdit={handleEditEntry}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {t('journal.calendar')}
                </CardTitle>
                <CardDescription>
                  {t('journal.calendarDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border w-full"
                  modifiers={{
                    hasEntry: entries.map(entry => new Date(entry.date))
                  }}
                  modifiersStyles={{
                    hasEntry: { 
                      backgroundColor: 'hsl(var(--primary))', 
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                />
                
                {/* Selected Date Entries */}
                {selectedDateEntries.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">
                      {t('journal.entriesFor')} {selectedDate.toLocaleDateString()}:
                    </h4>
                    {selectedDateEntries.map((entry) => {
                      const moodOption = require("@/components/ui/mood-selector").moodOptions
                        .find((m: any) => m.value === entry.mood);
                      return (
                        <div 
                          key={entry.id} 
                          className="text-xs p-2 bg-muted/30 rounded cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleEditEntry(entry)}
                        >
                          {moodOption?.label} • {entry.content.slice(0, 50)}...
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Journal Stats */}
            <JournalStats entries={entries} />

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>{t('journal.tips.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary">💡</span>
                  <span>{t('journal.tips.regular')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">🎯</span>
                  <span>{t('journal.tips.honest')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">🌱</span>
                  <span>{t('journal.tips.growth')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">📝</span>
                  <span>{t('journal.tips.grammar')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">🔒</span>
                  <span>{t('journal.tips.private')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}