import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Brain, 
  Award,
  TrendingUp,
  Heart,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";

type PomodoroState = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroStats {
  todayPomodoros: number;
  totalPomodoros: number;
  currentStreak: number;
  longestStreak: number;
  totalFocusTime: number;
}

export default function PomodoroWellnessCoach() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentState, setCurrentState] = useState<PomodoroState>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [stats, setStats] = useState<PomodoroStats>({
    todayPomodoros: 0,
    totalPomodoros: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalFocusTime: 0
  });

  const durations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalDuration = durations[currentState];
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const completePomodoro = useCallback(() => {
    playNotificationSound();
    
    if (currentState === 'work') {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        todayPomodoros: prev.todayPomodoros + 1,
        totalPomodoros: prev.totalPomodoros + 1,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        totalFocusTime: prev.totalFocusTime + 25
      }));

      // Determine next break type
      const nextState = newCompletedPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak';
      setCurrentState(nextState);
      setTimeLeft(durations[nextState]);
    } else {
      // Break completed, back to work
      setCurrentState('work');
      setTimeLeft(durations.work);
    }
    
    setIsRunning(false);
  }, [currentState, completedPomodoros, durations]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completePomodoro();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, completePomodoro]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[currentState]);
  };

  const switchState = (state: PomodoroState) => {
    setCurrentState(state);
    setTimeLeft(durations[state]);
    setIsRunning(false);
  };

  const mindfulnessExercises = [
    {
      title: "Deep Breathing",
      description: "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6 counts.",
      duration: "1-2 minutes"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release muscle groups starting from your toes to your head.",
      duration: "3-5 minutes"
    },
    {
      title: "Mindful Observation",
      description: "Focus on 5 things you can see, 4 things you can hear, 3 things you can feel.",
      duration: "2-3 minutes"
    },
    {
      title: "Gratitude Reflection",
      description: "Think of 3 things you're grateful for in this moment.",
      duration: "1-2 minutes"
    }
  ];

  const getStateInfo = () => {
    switch (currentState) {
      case 'work':
        return {
          title: 'Focus Time',
          description: 'Stay focused on your current task',
          color: 'text-primary',
          bgColor: 'bg-gradient-primary',
          icon: Brain
        };
      case 'shortBreak':
        return {
          title: 'Short Break',
          description: 'Take a quick mental break',
          color: 'text-success',
          bgColor: 'bg-gradient-wellness',
          icon: Coffee
        };
      case 'longBreak':
        return {
          title: 'Long Break',
          description: 'Relax and recharge completely',
          color: 'text-calm',
          bgColor: 'bg-gradient-calm',
          icon: Heart
        };
    }
  };

  const stateInfo = getStateInfo();
  const StateIcon = stateInfo.icon;

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Timer className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Pomodoro Wellness Coach</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Boost productivity with mindful breaks and wellness tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StateIcon className={`h-6 w-6 ${stateInfo.color}`} />
                  <CardTitle className={stateInfo.color}>{stateInfo.title}</CardTitle>
                </div>
                <CardDescription>{stateInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Timer Display */}
                <div className={`relative p-8 rounded-full ${stateInfo.bgColor} text-white mx-auto w-fit`}>
                  <div className="text-6xl font-bold font-mono">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-lg opacity-90 mt-2">
                    Session #{completedPomodoros + 1}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress value={getProgress()} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(getProgress())}% complete
                  </p>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    variant={isRunning ? "secondary" : "default"}
                    className="px-8"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>

                {/* State Switcher */}
                <div className="flex justify-center gap-2">
                  <Button
                    variant={currentState === 'work' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => switchState('work')}
                  >
                    Focus (25m)
                  </Button>
                  <Button
                    variant={currentState === 'shortBreak' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => switchState('shortBreak')}
                  >
                    Short Break (5m)
                  </Button>
                  <Button
                    variant={currentState === 'longBreak' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => switchState('longBreak')}
                  >
                    Long Break (15m)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mindfulness Exercises for Breaks */}
            {currentState !== 'work' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-success" />
                    Mindfulness Exercises
                  </CardTitle>
                  <CardDescription>
                    Use your break time for mindful wellness activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mindfulnessExercises.map((exercise, index) => (
                      <Card key={index} className="p-4 hover:shadow-soft transition-all duration-200">
                        <h4 className="font-semibold mb-2">{exercise.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {exercise.duration}
                        </Badge>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stats.todayPomodoros}
                  </div>
                  <p className="text-sm text-muted-foreground">Pomodoros Completed</p>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Daily Goal: 8</span>
                  <span>{Math.round((stats.todayPomodoros / 8) * 100)}%</span>
                </div>
                <Progress value={(stats.todayPomodoros / 8) * 100} />
              </CardContent>
            </Card>

            {/* Wellness Streaks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-warning" />
                  Wellness Streaks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-warning">{stats.currentStreak}</span>
                    <Award className="h-4 w-4 text-warning" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Longest Streak</span>
                  <span className="font-bold text-success">{stats.longestStreak}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Focus Time</span>
                  <span className="font-bold text-primary">{stats.totalFocusTime}h</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-success" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${stats.todayPomodoros >= 1 ? 'text-success' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium">First Focus</p>
                    <p className="text-xs text-muted-foreground">Complete 1 pomodoro</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${stats.currentStreak >= 5 ? 'text-success' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium">Consistent Learner</p>
                    <p className="text-xs text-muted-foreground">5 day streak</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${stats.totalPomodoros >= 50 ? 'text-success' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium">Focus Master</p>
                    <p className="text-xs text-muted-foreground">50 total pomodoros</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Productivity Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Keep your phone in another room during focus sessions</p>
                <p>• Use breaks for physical movement or stretching</p>
                <p>• Stay hydrated and maintain good posture</p>
                <p>• Practice gratitude during mindfulness breaks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}