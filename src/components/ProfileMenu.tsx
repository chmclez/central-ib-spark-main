
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Settings, BookOpen, Plus, X, LogOut } from 'lucide-react';
import { ibSubjects } from '@/data/ibSubjects';
import { logout, getCurrentUser } from '@/auth';
import { useNavigate } from 'react-router-dom';
import { useProfileMenu } from '@/hooks/use-profile-menu';
import { useSubjects } from '../context/subjects-context';

export const ProfileMenu = () => {
  const { open, setOpen } = useProfileMenu();
  const { subjects, addSubject, removeSubject } = useSubjects();
  const [newSubject, setNewSubject] = useState('');
  const [isEditingSubjects, setIsEditingSubjects] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const addSubjectHandler = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      addSubject(newSubject);
      setNewSubject('');
    }
  };

  const removeSubjectHandler = (subjectToRemove: string) => {
    removeSubject(subjectToRemove);
  };

  return (
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold">{user?.name ?? 'New IB Student'}</h3>
            <p className="text-sm text-gray-600">Get started by adding your subjects</p>
          </div>

          {/* Subject Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  My Subjects
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingSubjects(!isEditingSubjects)}
                >
                  <Settings className="w-3 h-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {subject}
                      {isEditingSubjects && (
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeSubjectHandler(subject)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No subjects added yet. Add your IB subjects to get started!
                </div>
              )}
              
              {isEditingSubjects && (
                <div className="flex gap-2">
                  <Select value={newSubject} onValueChange={setNewSubject}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ibSubjects
                        .filter(subject => !subjects.includes(subject))
                        .map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={addSubjectHandler} disabled={!newSubject}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="w-4 h-4 mr-2" />
              Study Preferences
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
