
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Clock, Star, Filter, Plus, Upload, ArrowUpDown, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { badgeColorMap } from '@/lib/colorClasses';
import { useSubjects } from '@/context/subjects-context';
import { getCurrentUser } from '@/auth';
import { usePastPapers, UploadedPaper } from '@/context/past-papers-context';

const baseSubjects = [
  { name: 'Physics HL', difficulty: 'Hard' },
  { name: 'Physics SL', difficulty: 'Medium' },
  { name: 'Geography HL', difficulty: 'Medium' },
  { name: 'English Language and Literature SL', difficulty: 'Easy' },
  { name: 'Chemistry HL', difficulty: 'Hard' },
  { name: 'Economics HL', difficulty: 'Medium' },
  { name: 'Computer Science HL', difficulty: 'Hard' },
  { name: 'Mathematics Analysis and Approaches SL', difficulty: 'Hard' },
  { name: 'Mathematics Analysis and Approaches HL', difficulty: 'Hard' },
  { name: 'Arabic Language and Literature SL', difficulty: 'Easy' },
];
interface RecentPaper {
  subject: string;
  paper: string;
  year: string;
  downloaded: boolean;
}

const recentPapers: RecentPaper[] = [];

const getLatestInfo = (papers: UploadedPaper[]): string => {
  if (!papers.length) return 'N/A';
  let latest = papers[0];
  for (const p of papers) {
    if (p.year > latest.year) latest = p;
    else if (p.year === latest.year && p.session === 'November' && latest.session === 'May') latest = p;
  }
  return `${latest.year} ${latest.session}`;
};

const PastPapers = () => {
  const { subjects: selectedSubjects } = useSubjects();
  const { pastPapers, addPastPaper } = usePastPapers();
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recent');
  const { toast } = useToast();
  const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 2025 - i);

  const [uSubject, setUSubject] = useState('');
  const [uPaper, setUPaper] = useState('');
  const [uYear, setUYear] = useState('');
  const [uSession, setUSession] = useState('');

  const allSubjects = baseSubjects.map(s => {
    const papers = pastPapers[s.name] || [];
    return { ...s, papers: papers.length, recent: getLatestInfo(papers) };
  });

  const filteredSubjects = isAdmin ? allSubjects : allSubjects.filter(s => selectedSubjects.includes(s.name));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'yellow';
      case 'Hard': return 'red';
      default: return 'gray';
    }
  };

  const handleFilter = (value: string) => {
    setSelectedFilter(value);
    toast({
      title: "Filter Applied",
      description: `Showing papers filtered by: ${value}`,
    });
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    toast({
      title: "Sort Applied", 
      description: `Papers sorted by: ${value}`,
    });
  };

  const handleUploadPaper = (paper: UploadedPaper) => {
    addPastPaper(paper);
    toast({
      title: 'Past Paper Uploaded',
      description: `${paper.subject} ${paper.paper} (${paper.year} ${paper.session}) has been uploaded successfully.`,
    });
  };



  const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 2025 - i);

  const PastPaperBrowserDialog = ({ subject }: { subject: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Link to={`/past-papers/${encodeURIComponent(subject.name)}`} className="w-full">
          <Button size="sm" className="w-full">Browse Papers</Button>
            </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {subject} Past Papers
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {years.map(year => (
            <div key={year} className="border rounded p-2">
              <p className="font-medium mb-1">{year}</p>
              <div className="ml-4 flex gap-2">
                <Badge variant="secondary">May</Badge>
                <Badge variant="secondary">November</Badge>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  const UploadPaperDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Past Paper
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Past Paper
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
              <Select value={uSubject} onValueChange={setUSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject..." />
            </SelectTrigger>
            <SelectContent>
              {baseSubjects.map(s => (
                <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
                   <Select value={uPaper} onValueChange={setUPaper}>
            <SelectTrigger>
              <SelectValue placeholder="Paper type..." />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="Paper 1">Paper 1</SelectItem>
              <SelectItem value="Paper 2">Paper 2</SelectItem>
              <SelectItem value="Paper 3">Paper 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Select value={uYear} onValueChange={setUYear}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={uSession} onValueChange={setUSession}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="November">November</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input type="file" accept=".pdf" />
          <Button
            disabled={!uSubject || !uPaper || !uYear || !uSession}
            onClick={() => handleUploadPaper({ subject: uSubject, paper: uPaper, year: parseInt(uYear), session: uSession as 'May' | 'November' })}
            className="w-full"
          >
            Upload Paper
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Past Papers Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Access and download past papers for all your IB subjects. Practice makes perfect!
            </p>
          </div>
          {isAdmin && <UploadPaperDialog />}
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search subjects, papers, or years..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedFilter} onValueChange={handleFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="HL">HL Only</SelectItem>
                    <SelectItem value="SL">SL Only</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className="w-40">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recent">Most Recent</SelectItem>
                    <SelectItem value="Oldest">Oldest First</SelectItem>
                    <SelectItem value="Name">By Name</SelectItem>
                    <SelectItem value="Difficulty">By Difficulty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subjects Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredSubjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredSubjects.map((subject, index) => (
                    <div
                      key={subject.name}
                      className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 text-sm">{subject.name}</h3>
                        <Badge 
                          variant="secondary"
                          className={badgeColorMap[getDifficultyColor(subject.difficulty)]}
                        >
                          {subject.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{subject.papers} papers available</span>
                          <span>Latest: {subject.recent}</span>
                        </div>
                        
                        <PastPaperBrowserDialog subject={subject.name} />
                      </div>
                    </div>
                  ))}
                </div>
                  ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    Add subjects to view available past papers.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Downloads */}
          <div>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPapers.map((paper, index) => (
                  <div 
                    key={`${paper.subject}-${paper.paper}`}
                    className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-gray-800">{paper.subject}</p>
                        <p className="text-xs text-gray-600">{paper.paper} • {paper.year}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    {paper.downloaded && (
                      <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                        Downloaded
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PastPapers;
