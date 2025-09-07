import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoodSelector, MoodValue } from "@/components/ui/mood-selector";
import { Plus, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface JournalEditorProps {
  onSave: (entry: {
    mood: MoodValue;
    content: string;
    tags?: string[];
  }) => void;
  isEditing?: boolean;
  onCancel?: () => void;
  initialData?: {
    mood: MoodValue;
    content: string;
    tags?: string[];
  };
  className?: string;
}

export function JournalEditor({ 
  onSave, 
  isEditing = false, 
  onCancel,
  initialData,
  className 
}: JournalEditorProps) {
  const { t } = useLanguage();
  const [mood, setMood] = useState<MoodValue>(initialData?.mood || 'neutral');
  const [content, setContent] = useState(initialData?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleSave = () => {
    if (!content.trim()) return;
    
    onSave({
      mood,
      content: content.trim(),
      tags: tags.length > 0 ? tags : undefined,
    });
    
    // Reset form if not editing
    if (!isEditing) {
      setContent('');
      setMood('neutral');
      setTags([]);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags(prev => [...prev, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          {isEditing ? t('journal.editor.editTitle') : t('journal.editor.title')}
        </CardTitle>
        <CardDescription>
          {t('journal.editor.moodLabel')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">{t('journal.editor.moodLabel')}</Label>
          <MoodSelector 
            value={mood} 
            onChange={setMood}
            size="md"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <Label htmlFor="journal-content" className="text-sm font-medium">
            {t('journal.editor.title')}
          </Label>
          <Textarea
            id="journal-content"
            placeholder={t('journal.editor.placeholder')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-32 resize-none focus:ring-2 focus:ring-primary transition-all duration-200"
          />
          <p className="text-xs text-muted-foreground">
            {content.length}/1000 • Ctrl+Enter
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label htmlFor="tag-input" className="text-sm font-medium">
            {t('journal.editor.tagsLabel')}
          </Label>
          <div className="flex gap-2">
            <Input
              id="tag-input"
              placeholder={t('journal.editor.tagsPlaceholder')}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1"
              maxLength={20}
            />
            <Button 
              onClick={handleAddTag} 
              variant="outline" 
              size="sm"
              disabled={!tagInput.trim() || tags.length >= 5}
            >
              {t('common.add') || 'Add'}
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive transition-colors"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleSave} 
            disabled={!content.trim()}
            className="flex-1"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? t('journal.editor.save') : t('journal.editor.save')}
          </Button>
          
          {isEditing && onCancel && (
            <Button 
              onClick={onCancel} 
              variant="outline"
              size="lg"
            >
              {t('journal.editor.cancel')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}