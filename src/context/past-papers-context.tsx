import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UploadedPaper {
  subject: string;
  year: number;
  session: 'May' | 'November';
  paper: string;
}

interface PastPapersContextProps {
  pastPapers: Record<string, UploadedPaper[]>;
  addPastPaper: (paper: UploadedPaper) => void;
}

const PastPapersContext = createContext<PastPapersContextProps | undefined>(undefined);

const STORAGE_KEY = 'ib-central-past-papers';

export const PastPapersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pastPapers, setPastPapers] = useState<Record<string, UploadedPaper[]>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Record<string, UploadedPaper[]>;
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pastPapers));
  }, [pastPapers]);

  const addPastPaper = (paper: UploadedPaper) => {
    setPastPapers(prev => {
      const papers = prev[paper.subject] || [];
      const exists = papers.some(p => p.year === paper.year && p.session === paper.session && p.paper === paper.paper);
      if (exists) return prev;
      return { ...prev, [paper.subject]: [...papers, paper] };
    });
  };

  return (
    <PastPapersContext.Provider value={{ pastPapers, addPastPaper }}>
      {children}
    </PastPapersContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const usePastPapers = (): PastPapersContextProps => {
  const ctx = useContext(PastPapersContext);
  if (!ctx) throw new Error('usePastPapers must be used within a PastPapersProvider');
  return ctx;
};