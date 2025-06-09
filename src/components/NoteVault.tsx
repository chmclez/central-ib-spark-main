
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Upload, Sparkles, Tag, FileText, Brain } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Note {
  title: string;
  subject: string;
  topic: string;
  tags: string[];
  lastModified: string;
  hasAISummary: boolean;
  content?: string;
}

const initialNotes: Note[] = [
  { 
    title: 'Ionic Bonding Fundamentals', 
    subject: 'Chemistry SL', 
    topic: '4.1 Ionic Bonding', 
    tags: ['bonds', 'electrons', 'lattice'], 
    lastModified: '2 days ago',
    hasAISummary: true 
  },
  { 
    title: 'Differentiation Techniques', 
    subject: 'Mathematics HL', 
    topic: '2.3 Calculus', 
    tags: ['derivatives', 'chain rule', 'product rule'], 
    lastModified: '1 week ago',
    hasAISummary: false 
  },
  { 
    title: 'Newton\'s Laws Analysis', 
    subject: 'Physics HL', 
    topic: '1.2 Mechanics', 
    tags: ['forces', 'acceleration', 'momentum'], 
    lastModified: '3 days ago',
    hasAISummary: true 
  },
  { 
    title: 'Literary Device Examples', 
    subject: 'English A SL', 
    topic: 'Paper 1 Analysis', 
    tags: ['metaphor', 'symbolism', 'imagery'], 
    lastModified: '5 days ago',
    hasAISummary: false 
  },
];

const aiSuggestions = [
  'Review notes on "Periodic Trends" for tomorrow\'s Chemistry quiz',
  'Create flashcards from your "Trigonometry" notes',
  'Your "World War I" notes might help with the History IA',
];

export const NoteVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(initialNotes);
  const { toast } = useToast();

  React.useEffect(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const handleUpload = (newNote: Partial<Note>) => {
    const note: Note = {
      title: newNote.title || 'Untitled Note',
      subject: newNote.subject || 'General',
      topic: newNote.topic || 'General',
      tags: newNote.tags || [],
      lastModified: 'Just now',
      hasAISummary: false,
      content: newNote.content || ''
    };
    setNotes([note, ...notes]);
    toast({
      title: "Note Uploaded",
      description: `${note.title} has been added to your vault.`,
    });
  };

  const generateAISummary = (noteTitle: string) => {
    const updatedNotes = notes.map(note =>
      note.title === noteTitle ? { ...note, hasAISummary: true } : note
    );
    setNotes(updatedNotes);
    toast({
      title: "AI Summary Generated",
      description: `Summary created for ${noteTitle}`,
    });
  };

  const UploadDialog = () => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = () => {
      if (title && subject) {
        handleUpload({
          title,
          subject,
          topic,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        });
        setTitle('');
        setSubject('');
        setTopic('');
        setTags('');
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Notes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
              placeholder="Tags (comma separated)..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Input type="file" accept=".pdf,.doc,.docx,.txt" />
            <Button onClick={handleSubmit} className="w-full">Upload Note</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Note Vault
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Upload */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search notes by subject, topic, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <UploadDialog />
        </div>

        {/* AI Suggestions */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <h3 className="font-semibold text-gray-800 flex items-center mb-3">
            <Brain className="w-4 h-4 mr-2 text-purple-600" />
            AI Study Suggestions
          </h3>
          <div className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-2 bg-white/60 rounded-lg text-sm text-gray-700">
                <Sparkles className="w-3 h-3 inline mr-2 text-purple-500" />
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredNotes.map((note, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{note.title}</h3>
                  {note.hasAISummary && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-medium">{note.subject}</span>
                    <span>{note.lastModified}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500">{note.topic}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    View
                  </Button>
                  {!note.hasAISummary && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-xs"
                      onClick={() => generateAISummary(note.title)}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Summarize
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No notes found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
