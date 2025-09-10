/*
  # Mental Health Assessments System

  1. New Tables
    - `assessment_results` - Store assessment results
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `assessment_type` (text) - phq9/gad7/ghq12/complete
      - `responses` (jsonb) - question responses
      - `scores` (jsonb) - calculated scores and results
      - `risk_level` (text) - low/medium/high
      - `requires_followup` (boolean)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on `assessment_results` table
    - Add policies for users to manage their own assessment data
*/

-- Create assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type text NOT NULL CHECK (assessment_type IN ('phq9', 'gad7', 'ghq12', 'complete')),
  responses jsonb NOT NULL,
  scores jsonb NOT NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  requires_followup boolean DEFAULT false,
  completed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- Policies for assessment results
CREATE POLICY "Users can view own assessment results"
  ON assessment_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment results"
  ON assessment_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Index for better performance
CREATE INDEX IF NOT EXISTS assessment_results_user_date_idx ON assessment_results(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS assessment_results_risk_idx ON assessment_results(risk_level, completed_at DESC);