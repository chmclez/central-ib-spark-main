import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SubjectsProvider } from '@/context/subjects-context';

createRoot(document.getElementById('root')!).render(
  <SubjectsProvider>
    <App />
  </SubjectsProvider>
);
