
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Target, BookOpen, Users } from 'lucide-react';

export const MotivationalWidget = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0 shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="ml-2 text-2xl font-bold">0</span>
            </div>
            <p className="text-sm opacity-90">Study Streak</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-green-400" />
              <span className="ml-2 text-2xl font-bold">0</span>
            </div>
            <p className="text-sm opacity-90">Notes Uploaded</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold">0</span>
            </div>
            <p className="text-sm opacity-90">Goals Completed</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">0%</span>
            </div>
            <p className="text-sm opacity-90">Collaboration Score</p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold mb-2">Welcome to Your IB Journey! 🎓</h2>
          <p className="opacity-90">Start by adding your subjects and uploading your first notes to begin tracking your progress.</p>
        </div>
      </CardContent>
    </Card>
  );
};
