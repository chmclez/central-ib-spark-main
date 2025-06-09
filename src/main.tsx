import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SubjectsProvider } from '@/context/subjects-context';
import { PastPapersProvider } from '@/context/past-papers-context';

createRoot(document.getElementById('root')!).render(
  <SubjectsProvider>
    <PastPapersProvider>
      <App />
    </PastPapersProvider>
  </SubjectsProvider>
);
