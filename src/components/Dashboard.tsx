
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProfileMenu } from '@/hooks/use-profile-menu';
import { FileText, Calendar, Users, CheckCircle, BookOpen, Plus } from 'lucide-react';

export const Dashboard = () => {
  const { setOpen } = useProfileMenu();
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
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Welcome to IB Central!</h3>
          <p className="mb-4">Start by adding your subjects so we can track your progress and personalize your dashboard.</p>
          <div className="text-sm text-gray-400 mb-4">
            Click the profile icon in the top right to get started
          </div>
           <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Subject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
