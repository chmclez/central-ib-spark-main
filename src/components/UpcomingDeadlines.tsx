
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { textColorMap } from '@/lib/colorClasses';

const deadlines = [
  { 
    title: 'Physics IA Draft', 
    date: '2024-01-15', 
    daysLeft: 3, 
    priority: 'high',
    type: 'IA',
    subject: 'Physics'
  },
  { 
    title: 'TOK Essay Outline', 
    date: '2024-01-20', 
    daysLeft: 8, 
    priority: 'medium',
    type: 'TOK',
    subject: 'Theory of Knowledge'
  },
  { 
    title: 'CAS Reflection #3', 
    date: '2024-01-25', 
    daysLeft: 13, 
    priority: 'low',
    type: 'CAS',
    subject: 'CAS'
  },
  { 
    title: 'Math Mock Exam', 
    date: '2024-01-28', 
    daysLeft: 16, 
    priority: 'high',
    type: 'Exam',
    subject: 'Mathematics'
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'yellow';
    case 'low': return 'green';
    default: return 'gray';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high': return AlertTriangle;
    case 'medium': return Clock;
    case 'low': return CheckCircle;
    default: return Clock;
  }
};

export const UpcomingDeadlines = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-600" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map((deadline, index) => {
          const IconComponent = getPriorityIcon(deadline.priority);
          const priorityColor = getPriorityColor(deadline.priority);
          
          return (
            <div 
              key={deadline.title}
              className="p-3 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm text-gray-800">{deadline.title}</h3>
                <IconComponent className={`w-4 h-4 ${textColorMap[priorityColor]} flex-shrink-0`} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {deadline.type}
                  </Badge>
                  <span className="text-xs text-gray-500">{deadline.subject}</span>
                </div>
                
                <div className="text-right">
                <div className={`text-xs font-medium ${textColorMap[priorityColor]}`}>
                    {deadline.daysLeft} days left
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(deadline.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
