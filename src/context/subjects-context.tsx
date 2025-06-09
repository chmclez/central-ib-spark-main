import React, { createContext, useContext, useEffect, useState } from 'react';

export interface SubjectsContextProps {
  subjects: string[];
  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;
}

const SubjectsContext = createContext<SubjectsContextProps | undefined>(undefined);

const STORAGE_KEY = 'ib-central-subjects';

export const SubjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as string[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (subject: string) => {
    setSubjects(prev => (prev.includes(subject) ? prev : [...prev, subject]));
  };

  const removeSubject = (subject: string) => {
    setSubjects(prev => prev.filter(s => s !== subject));
  };

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject, removeSubject }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = (): SubjectsContextProps => {
  const ctx = useContext(SubjectsContext);
  if (!ctx) throw new Error('useSubjects must be used within a SubjectsProvider');
  return ctx;
};