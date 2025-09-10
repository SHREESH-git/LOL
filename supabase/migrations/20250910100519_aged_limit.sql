/*
  # Activities and Wellness System

  1. New Tables
    - `user_activities` - Track completed activities
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `activity_id` (text) - matches frontend activity IDs
      - `completed_at` (timestamp)
      - `notes` (text, optional)
    
    - `pomodoro_sessions` - Track pomodoro sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `session_type` (text) - work/shortBreak/longBreak
      - `duration_minutes` (integer)
      - `completed` (boolean)
      - `started_at` (timestamp)
      - `completed_at` (timestamp, optional)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own data
*/

-- Create user activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_id text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  notes text,
  
  -- Prevent duplicate completions on same day
  UNIQUE(user_id, activity_id, DATE(completed_at))
);

-- Create pomodoro sessions table
CREATE TABLE IF NOT EXISTS pomodoro_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type text NOT NULL CHECK (session_type IN ('work', 'shortBreak', 'longBreak')),
  duration_minutes integer NOT NULL DEFAULT 25,
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for user activities
CREATE POLICY "Users can view own activities"
  ON user_activities
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON user_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON user_activities
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for pomodoro sessions
CREATE POLICY "Users can view own pomodoro sessions"
  ON pomodoro_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pomodoro sessions"
  ON pomodoro_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pomodoro sessions"
  ON pomodoro_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS user_activities_user_date_idx ON user_activities(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS pomodoro_sessions_user_date_idx ON pomodoro_sessions(user_id, started_at DESC);