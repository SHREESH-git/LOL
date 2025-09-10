/*
  # Analytics and Insights System

  1. New Tables
    - `user_analytics` - Aggregated user analytics (anonymized)
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `mood_average` (decimal)
      - `activities_completed` (integer)
      - `journal_entries_count` (integer)
      - `pomodoro_sessions` (integer)
      - `ai_interactions` (integer)
      - `created_at` (timestamp)

  2. Views
    - `daily_mood_trends` - Anonymized mood trends
    - `platform_usage_stats` - Platform usage statistics

  3. Security
    - Enable RLS on `user_analytics` table
    - Create views for anonymized data access
*/

-- Create user analytics table
CREATE TABLE IF NOT EXISTS user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  mood_average decimal(3,2),
  activities_completed integer DEFAULT 0,
  journal_entries_count integer DEFAULT 0,
  pomodoro_sessions integer DEFAULT 0,
  ai_interactions integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  
  -- One analytics record per user per day
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for user analytics
CREATE POLICY "Users can view own analytics"
  ON user_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics"
  ON user_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update analytics"
  ON user_analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create view for anonymized mood trends
CREATE OR REPLACE VIEW daily_mood_trends AS
SELECT 
  date,
  COUNT(*) as total_entries,
  AVG(CASE mood_value 
    WHEN 'terrible' THEN 1
    WHEN 'bad' THEN 2
    WHEN 'neutral' THEN 3
    WHEN 'good' THEN 4
    WHEN 'great' THEN 5
  END) as average_mood,
  COUNT(CASE WHEN mood_value IN ('terrible', 'bad') THEN 1 END) as concerning_entries
FROM mood_entries
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY date
ORDER BY date DESC;

-- Create view for platform usage stats
CREATE OR REPLACE VIEW platform_usage_stats AS
SELECT 
  COUNT(DISTINCT user_id) as active_users,
  COUNT(*) as total_sessions,
  AVG(activities_completed) as avg_activities,
  AVG(journal_entries_count) as avg_journal_entries,
  AVG(pomodoro_sessions) as avg_pomodoro_sessions
FROM user_analytics
WHERE date >= CURRENT_DATE - INTERVAL '7 days';

-- Index for analytics
CREATE INDEX IF NOT EXISTS user_analytics_date_idx ON user_analytics(date DESC);