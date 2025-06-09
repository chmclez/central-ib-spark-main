
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Clock, Play, Pause, RotateCcw, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface StudySession {
  subject: string;
  topic: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
}

const defaultSessions: StudySession[] = [
  { subject: 'Mathematics HL', topic: 'Calculus Integration', duration: 25, difficulty: 'Hard', completed: false },
  { subject: 'Physics HL', topic: 'Wave Properties', duration: 20, difficulty: 'Medium', completed: false },
  { subject: 'Chemistry SL', topic: 'Organic Reactions', duration: 15, difficulty: 'Easy', completed: false },
];

export const SmartRevisionPlanner = () => {
  const [sessions, setSessions] = useState<StudySession[]>(defaultSessions);
  const [currentSession, setCurrentSession] = useState(0);
  const [timeLeft, setTimeLeft] = useState(sessions[0]?.duration * 60 || 1500);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      completeSession();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessions[currentSession]?.duration * 60 || 1500);
  };

  const completeSession = () => {
    const updatedSessions = [...sessions];
    updatedSessions[currentSession].completed = true;
    setSessions(updatedSessions);
    setCompletedSessions(completedSessions + 1);
    
    toast({
      title: "🎉 Session Complete!",
      description: `Great job on ${sessions[currentSession].topic}! Take a 5-minute break.`,
    });

    if (currentSession < sessions.length - 1) {
      setTimeout(() => {
        setCurrentSession(currentSession + 1);
        setTimeLeft(sessions[currentSession + 1].duration * 60);
      }, 2000);
    }
  };

  const addCustomSession = (newSession: StudySession) => {
    setSessions([...sessions, newSession]);
  };

  const CustomSessionDialog = () => {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [duration, setDuration] = useState('25');
    const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

    const handleSubmit = () => {
      if (subject && topic) {
        addCustomSession({
          subject,
          topic,
          duration: parseInt(duration),
          difficulty,
          completed: false
        });
        toast({
          title: "Session Added",
          description: `${topic} has been added to your study plan.`,
        });
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Study Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              placeholder="Topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Select value={difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setDifficulty(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit} className="w-full">Add Session</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const currentSessionData = sessions[currentSession];
  const progress = currentSessionData ? ((currentSessionData.duration * 60 - timeLeft) / (currentSessionData.duration * 60)) * 100 : 0;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Smart Revision Planner
          </span>
          <CustomSessionDialog />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentSessionData && (
          <>
            {/* Current Session */}
            <div className="text-center space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{currentSessionData.topic}</h3>
                <Badge variant="secondary">{currentSessionData.subject}</Badge>
                <Badge 
                  variant={currentSessionData.difficulty === 'Hard' ? 'destructive' : 
                          currentSessionData.difficulty === 'Medium' ? 'default' : 'secondary'}
                >
                  {currentSessionData.difficulty}
                </Badge>
              </div>
              
              {/* Timer */}
              <div className="space-y-4">
                <div className="text-4xl font-mono font-bold text-purple-600">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="w-full" />
                
                {/* Timer Controls */}
                <div className="flex justify-center gap-3">
                  <Button onClick={toggleTimer} variant={isRunning ? "destructive" : "default"}>
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button onClick={resetTimer} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button onClick={completeSession} variant="outline">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Session Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Session {currentSession + 1} of {sessions.length}</span>
                <span>{completedSessions} completed today</span>
              </div>
              
              {/* Upcoming Sessions */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Upcoming Sessions</h4>
                {sessions.slice(currentSession + 1, currentSession + 3).map((session, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{session.topic}</span>
                      <span className="text-gray-500">{session.duration}min</span>
                    </div>
                    <span className="text-gray-600">{session.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
