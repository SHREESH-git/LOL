/*
  # Counseling and Booking System

  1. New Tables
    - `counselors` - Available counselors
      - `id` (uuid, primary key)
      - `name` (text)
      - `specialization` (text)
      - `experience_years` (integer)
      - `languages` (text array)
      - `rating` (decimal)
      - `is_available` (boolean)
      - `bio` (text)
      - `created_at` (timestamp)
    
    - `counseling_sessions` - Booked sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `counselor_id` (uuid, references counselors)
      - `session_date` (date)
      - `session_time` (time)
      - `issue_category` (text)
      - `urgency_level` (text)
      - `notes` (text)
      - `status` (text) - scheduled/completed/cancelled
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add appropriate policies
*/

-- Create counselors table
CREATE TABLE IF NOT EXISTS counselors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialization text NOT NULL,
  experience_years integer NOT NULL DEFAULT 0,
  languages text[] DEFAULT '{"English"}',
  rating decimal(3,2) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
  is_available boolean DEFAULT true,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create counseling sessions table
CREATE TABLE IF NOT EXISTS counseling_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  counselor_id uuid REFERENCES counselors(id) NOT NULL,
  session_date date NOT NULL,
  session_time time NOT NULL,
  issue_category text NOT NULL CHECK (issue_category IN ('anxiety', 'depression', 'academic', 'relationships', 'career', 'family', 'other')),
  urgency_level text NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high')),
  notes text,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE counseling_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for counselors (public read access)
CREATE POLICY "Anyone can view available counselors"
  ON counselors
  FOR SELECT
  TO authenticated
  USING (is_available = true);

-- Policies for counseling sessions
CREATE POLICY "Users can view own sessions"
  ON counseling_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON counseling_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON counseling_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample counselors
INSERT INTO counselors (name, specialization, experience_years, languages, rating, bio) VALUES
('Dr. Priya Sharma', 'Anxiety & Depression', 8, '{"Hindi", "English", "Punjabi"}', 4.9, 'Specialized in student mental health with focus on anxiety and depression management.'),
('Dr. Raj Kumar', 'Academic Stress & Career Counseling', 6, '{"Hindi", "English", "Urdu"}', 4.8, 'Expert in academic stress management and career guidance for students.'),
('Dr. Aman Singh', 'Relationship & Social Issues', 5, '{"Hindi", "English"}', 4.7, 'Focuses on relationship counseling and social adjustment issues.');

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS counseling_sessions_user_date_idx ON counseling_sessions(user_id, session_date DESC);
CREATE INDEX IF NOT EXISTS counseling_sessions_counselor_date_idx ON counseling_sessions(counselor_id, session_date);