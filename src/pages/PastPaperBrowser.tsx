import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, ChevronRight, ChevronLeft, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePastPapers } from '@/context/past-papers-context';

const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 2025 - i);

const getPapers = (subject: string, year: number): string[] => {
  if (/physics/i.test(subject) || /chemistry/i.test(subject)) {
    return year >= 2025 ? ['Paper 1', 'Paper 2'] : ['Paper 1', 'Paper 2', 'Paper 3'];
  }
  if (/english/i.test(subject) || /arabic/i.test(subject)) {
    return ['Paper 1', 'Paper 2'];
  }
  if (/geography/i.test(subject)) {
    return ['Paper 1', 'Paper 2', 'Paper 3'];
  }
  if (/analysis and approaches hl/i.test(subject)) {
    return ['Paper 1', 'Paper 2', 'Paper 3'];
  }
  if (/analysis and approaches sl/i.test(subject)) {
    return year >= 2025 ? ['Paper 1', 'Paper 2'] : ['Paper 1', 'Paper 2', 'Paper 3'];
  }
  return ['Paper 1', 'Paper 2'];
};

const PastPaperBrowser = () => {
  const { subject } = useParams<{ subject: string }>();
  const subjectName = decodeURIComponent(subject || '');
  const { pastPapers } = usePastPapers();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<{ year: number; session: string } | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const papers = selectedZone ? getPapers(subjectName, selectedSession!.year) : [];
  const uploaded = selectedZone
    ? (pastPapers[subjectName] || []).filter(p => p.year === selectedSession!.year && p.session === selectedSession!.session)
    : [];

  const handleBack = () => {
    if (selectedZone) {
      setSelectedZone(null);
    } else if (selectedSession) {
      setSelectedSession(null);
    } else if (selectedYear) {
      setSelectedYear(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                {subjectName} Past Papers
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/past-papers">Back to Subjects</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedZone ? (
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                {papers.map(p => {
                  const exists = uploaded.some(u => u.paper === p);
                  return (
                    <div key={p} className="p-2 border rounded flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {p}
                      </span>
                      <a
                        href="#"
                        download
                        className="text-blue-600 text-sm flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                      {exists && <Badge variant="secondary">Uploaded</Badge>}
                    </div>
                  );
                })}
              </div>
              ) : selectedSession ? (
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                {['TZ1', 'TZ2'].map(zone => (
                  <div
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className="p-4 border rounded cursor-pointer flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      {zone}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            ) : selectedYear ? (
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                {['May', 'November'].map(sess => (
                  <div
                    key={sess}
                    onClick={() => setSelectedSession({ year: selectedYear, session: sess })}
                    className="p-4 border rounded cursor-pointer flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      {sess}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {years.map(y => (
                  <div
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className="p-4 border rounded cursor-pointer flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      {y}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PastPaperBrowser;