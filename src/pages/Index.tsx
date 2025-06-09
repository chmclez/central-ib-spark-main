import React from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { QuickActions } from '@/components/QuickActions';
import { ProgressOverview } from '@/components/ProgressOverview';
import { UpcomingDeadlines } from '@/components/UpcomingDeadlines';
import { MotivationalWidget } from '@/components/MotivationalWidget';
import { SmartRevisionPlanner } from '@/components/SmartRevisionPlanner';
import { NoteVault } from '@/components/NoteVault';
import { getCurrentUser } from '@/auth';

const Index = () => {
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            IB Central Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your all-in-one platform for mastering the IB journey. Track progress, collaborate with friends, and achieve your goals.
          </p>
        </div>

        {isAdmin && <MotivationalWidget />}
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            {isAdmin && <SmartRevisionPlanner />}
            {isAdmin && <ProgressOverview />}
            {isAdmin && <NoteVault />}
          </div>
          {isAdmin && (
            <div className="space-y-8">
              <QuickActions />
              <UpcomingDeadlines />
            </div>
          )}
        </div>
        {!isAdmin && (
          <div className="text-center py-20 text-gray-500">
            Your dashboard is empty. Use the profile menu to add your own content.
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
