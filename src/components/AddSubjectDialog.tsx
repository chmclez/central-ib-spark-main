import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ibSubjects } from '@/data/ibSubjects';
import { useSubjects } from '../context/subjects-context';

export const AddSubjectDialog = () => {
  const { addSubject, subjects } = useSubjects();
  const [subject, setSubject] = useState('');

  const handleAdd = () => {
    if (subject) {
      addSubject(subject);
      setSubject('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Subjects
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Subject</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject..." />
            </SelectTrigger>
            <SelectContent>
              {ibSubjects.filter(s => !subjects.includes(s)).map(s => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!subject} className="w-full">
            Add Subject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};