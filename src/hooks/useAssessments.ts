import { useState, useEffect } from 'react';
import { saveAssessmentResult, getAssessmentHistory } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AssessmentResult, calculateAllScores } from '@/data/assessmentTools';

export interface StoredAssessment {
  id?: string;
  user_id: string;
  assessment_type: 'phq9' | 'gad7' | 'ghq12' | 'complete';
  responses: { [key: string]: number };
  scores: AssessmentResult[];
  risk_level: 'low' | 'medium' | 'high';
  requires_followup: boolean;
  completed_at?: string;
}

export function useAssessments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<StoredAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAssessmentHistory();
    }
  }, [user]);

  const loadAssessmentHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await getAssessmentHistory(user.id);
      if (error) throw error;
      setAssessments(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load assessment history",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAssessment = async (
    assessmentType: StoredAssessment['assessment_type'],
    responses: { [key: string]: number }
  ) => {
    if (!user) return;

    try {
      // Calculate scores
      const scores = calculateAllScores(responses);
      
      // Determine overall risk level
      const hasHighRisk = scores.some(s => s.severity === 'severe' || s.severity === 'moderately-severe');
      const hasMediumRisk = scores.some(s => s.severity === 'moderate');
      const riskLevel = hasHighRisk ? 'high' : hasMediumRisk ? 'medium' : 'low';
      
      const requiresFollowup = scores.some(s => s.requiresFollowUp);

      const assessmentData = {
        user_id: user.id,
        assessment_type: assessmentType,
        responses,
        scores,
        risk_level: riskLevel,
        requires_followup: requiresFollowup,
      };

      const { data, error } = await saveAssessmentResult(assessmentData);
      if (error) throw error;

      setAssessments(prev => [data, ...prev]);

      toast({
        title: "Assessment completed",
        description: "Your assessment results have been saved.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Failed to save assessment",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const getLatestAssessment = () => {
    return assessments[0] || null;
  };

  const getAssessmentsByType = (type: StoredAssessment['assessment_type']) => {
    return assessments.filter(assessment => assessment.assessment_type === type);
  };

  const getAssessmentTrends = () => {
    const recentAssessments = assessments.slice(0, 5);
    
    if (recentAssessments.length < 2) return null;

    const latest = recentAssessments[0];
    const previous = recentAssessments[1];

    // Compare risk levels
    const riskLevels = { low: 1, medium: 2, high: 3 };
    const latestRisk = riskLevels[latest.risk_level];
    const previousRisk = riskLevels[previous.risk_level];

    return {
      improving: latestRisk < previousRisk,
      stable: latestRisk === previousRisk,
      declining: latestRisk > previousRisk,
      riskChange: latestRisk - previousRisk,
    };
  };

  return {
    assessments,
    loading,
    saveAssessment,
    getLatestAssessment,
    getAssessmentsByType,
    getAssessmentTrends,
    refreshAssessments: loadAssessmentHistory,
  };
}