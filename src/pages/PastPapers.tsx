
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Clock, Star, Filter, Plus, Upload, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { badgeColorMap } from '@/lib/colorClasses';
import { useSubjects } from '@/context/subjects-context';

const allSubjects = [
  { name: 'Mathematics HL', papers: 15, recent: '2024 Nov', difficulty: 'Hard' },
  { name: 'Physics HL', papers: 12, recent: '2024 Nov', difficulty: 'Medium' },
  { name: 'Chemistry SL', papers: 10, recent: '2024 May', difficulty: 'Medium' },
  { name: 'English A SL', papers: 8, recent: '2024 Nov', difficulty: 'Easy' },
  { name: 'Spanish B SL', papers: 6, recent: '2024 May', difficulty: 'Easy' },
  { name: 'History SL', papers: 9, recent: '2024 Nov', difficulty: 'Hard' },
];

const recentPapers = [
  { subject: 'Mathematics HL', paper: 'Paper 2', year: '2024 Nov', downloaded: true },
  { subject: 'Physics HL', paper: 'Paper 1', year: '2024 Nov', downloaded: false },
  { subject: 'Chemistry SL', paper: 'Paper 2', year: '2024 May', downloaded: true },
  { subject: 'English A SL', paper: 'Paper 1', year: '2024 Nov', downloaded: false },
];

const PastPapers = () => {
  const { subjects: selectedSubjects } = useSubjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recent');
  const { toast } = useToast();
  const filteredSubjects = allSubjects.filter(s => selectedSubjects.includes(s.name));

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

  const handleUploadPaper = (subject: string, paperType: string, year: string) => {
    toast({
      title: "Past Paper Uploaded",
      description: `${subject} ${paperType} (${year}) has been uploaded successfully.`,
    });
  };

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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select subject..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math-hl">Mathematics HL</SelectItem>
              <SelectItem value="physics-hl">Physics HL</SelectItem>
              <SelectItem value="chemistry-sl">Chemistry SL</SelectItem>
              <SelectItem value="english-sl">English A SL</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Paper type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paper-1">Paper 1</SelectItem>
              <SelectItem value="paper-2">Paper 2</SelectItem>
              <SelectItem value="paper-3">Paper 3</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Year and session..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-nov">2024 November</SelectItem>
              <SelectItem value="2024-may">2024 May</SelectItem>
              <SelectItem value="2023-nov">2023 November</SelectItem>
            </SelectContent>
          </Select>
          <Input type="file" accept=".pdf" />
          <Button onClick={() => handleUploadPaper("Mathematics HL", "Paper 1", "2024 Nov")} className="w-full">
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
          <UploadPaperDialog />
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
                        
                        <Button size="sm" className="w-full">
                          Browse Papers
                        </Button>
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
