
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload, Calendar, Users, FileText, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const quickActions = [
  { icon: Plus, label: 'Add Task', color: 'blue', action: 'add-task' },
  { icon: Upload, label: 'Upload Notes', color: 'green', action: 'upload-notes' },
  { icon: Calendar, label: 'Schedule Event', color: 'purple', action: 'schedule-event' },
  { icon: Users, label: 'Start Collaboration', color: 'orange', action: 'start-collaboration' },
  { icon: FileText, label: 'Create Flashcards', color: 'pink', action: 'create-flashcards' },
  { icon: Lightbulb, label: 'Daily Reflection', color: 'yellow', action: 'daily-reflection' },
];

export const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case 'add-task':
        toast({
          title: "Task Added",
          description: "Your new task has been added to your to-do list.",
        });
        break;
      case 'upload-notes':
        toast({
          title: "Notes Uploaded",
          description: "Your study notes have been uploaded successfully.",
        });
        break;
      case 'schedule-event':
        toast({
          title: "Event Scheduled",
          description: "Your event has been added to the calendar.",
        });
        break;
      case 'start-collaboration':
        toast({
          title: "Collaboration Started",
          description: "Study room created! Share the link with your friends.",
        });
        break;
      case 'create-flashcards':
        toast({
          title: "Flashcards Created",
          description: "Your flashcard deck is ready for studying.",
        });
        break;
      case 'daily-reflection':
        toast({
          title: "Reflection Saved",
          description: "Your daily reflection has been recorded.",
        });
        break;
      default:
        break;
    }
  };

  const QuickActionDialog = ({ action, icon: Icon, label }: { action: string, icon: any, label: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center space-y-1 hover:scale-105 transition-all duration-200 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        >
          <Icon className={`w-5 h-5 text-blue-600`} />
          <span className="text-xs font-medium text-gray-700">{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {label}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {action === 'add-task' && (
            <>
              <Input placeholder="Task title..." />
              <Textarea placeholder="Task description..." />
              <Button onClick={() => handleAction(action)} className="w-full">Add Task</Button>
            </>
          )}
          {action === 'upload-notes' && (
            <>
              <Input type="file" accept=".pdf,.doc,.docx,.txt" />
              <Input placeholder="Subject..." />
              <Input placeholder="Topic..." />
              <Button onClick={() => handleAction(action)} className="w-full">Upload Notes</Button>
            </>
          )}
          {action === 'schedule-event' && (
            <>
              <Input placeholder="Event title..." />
              <Input type="datetime-local" />
              <Textarea placeholder="Event description..." />
              <Button onClick={() => handleAction(action)} className="w-full">Schedule Event</Button>
            </>
          )}
          {action === 'start-collaboration' && (
            <>
              <Input placeholder="Study room name..." />
              <Input placeholder="Subject..." />
              <Button onClick={() => handleAction(action)} className="w-full">Create Room</Button>
            </>
          )}
          {action === 'create-flashcards' && (
            <>
              <Input placeholder="Deck name..." />
              <Input placeholder="Subject..." />
              <Textarea placeholder="Add your first flashcard content..." />
              <Button onClick={() => handleAction(action)} className="w-full">Create Deck</Button>
            </>
          )}
          {action === 'daily-reflection' && (
            <>
              <Textarea placeholder="How did your study session go today?" />
              <Textarea placeholder="What did you learn?" />
              <Textarea placeholder="What will you focus on tomorrow?" />
              <Button onClick={() => handleAction(action)} className="w-full">Save Reflection</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <QuickActionDialog 
              key={action.label}
              action={action.action}
              icon={action.icon}
              label={action.label}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
