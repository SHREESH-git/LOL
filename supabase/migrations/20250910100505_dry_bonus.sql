/*
  # Mood Tracking System

  1. New Tables
    - `mood_entries` - Daily mood tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `mood_value` (text) - great/good/neutral/bad/terrible
      - `notes` (text, optional)
      - `activities` (text array, optional)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `mood_entries` table
    - Add policies for users to manage their own mood data
*/

-- Create mood entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_value text NOT NULL CHECK (mood_value IN ('great', 'good', 'neutral', 'bad', 'terrible')),
  notes text,
  activities text[] DEFAULT '{}',
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure one mood entry per user per day
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Policies for mood entries
CREATE POLICY "Users can view own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries"
  ON mood_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries"
  ON mood_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for better performance
CREATE INDEX IF NOT EXISTS mood_entries_user_date_idx ON mood_entries(user_id, date DESC);