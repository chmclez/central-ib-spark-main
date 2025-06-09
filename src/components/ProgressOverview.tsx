
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Award } from 'lucide-react';
import { badgeColorMap, progressColorMap } from '@/lib/colorClasses';

const subjects = [
  { name: 'Mathematics HL', grade: 'A', progress: 85, notes: 24, color: 'blue' },
  { name: 'Physics HL', grade: 'A-', progress: 78, notes: 18, color: 'purple' },
  { name: 'Chemistry SL', grade: 'B+', progress: 82, notes: 22, color: 'green' },
  { name: 'English A SL', grade: 'A', progress: 90, notes: 16, color: 'orange' },
  { name: 'Spanish B SL', grade: 'B', progress: 75, notes: 12, color: 'pink' },
  { name: 'History SL', grade: 'A-', progress: 88, notes: 20, color: 'yellow' },
];

export const ProgressOverview = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Subject Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((subject, index) => (
            <div 
              key={subject.name}
              className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-sm">{subject.name}</h3>
                <Badge 
                  variant="secondary"
                  className={badgeColorMap[subject.color]}
                >
                  {subject.grade}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {subject.progress}% complete
                  </span>
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {subject.notes} notes
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`${progressColorMap[subject.color]} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
