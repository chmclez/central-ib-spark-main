
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen } from 'lucide-react';
import { AddSubjectDialog } from './AddSubjectDialog';
import { useSubjects } from '../context/subjects-context';

export const Dashboard = () => {
  const { subjects } = useSubjects();

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          IB Component Progress
        </CardTitle>
        <CardDescription>
          Track your progress across all IB requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
       {subjects.length > 0 ? (
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <BookOpen className="w-4 h-4" />
                My Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <AddSubjectDialog />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Welcome to IB Central!</h3>
            <p className="mb-4">
              Start by adding your subjects so we can track your progress and personalize your dashboard.
            </p>
            <AddSubjectDialog />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
