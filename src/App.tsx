import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileMenuProvider } from "@/context/profile-menu-provider";
import Index from "@/pages/Index";
import PastPapers from "@/pages/PastPapers";
import StudyNotes from "@/pages/StudyNotes";
import Calendar from "@/pages/Calendar";
import Collaborate from "@/pages/Collaborate";
import NotFound from "@/pages/NotFound";
import Login from "./pages/Login";
import { getCurrentUser } from "@/auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const user = getCurrentUser();
  return user ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfileMenuProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/study-notes" element={<StudyNotes />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProfileMenuProvider>
  </QueryClientProvider>
);

export default App;