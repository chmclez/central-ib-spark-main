
import React from 'react';
import { Bell, Search, User, Calendar, FileText, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileMenu } from './ProfileMenu';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IB Central
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
              <Link to="/past-papers" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Past Papers</Link>
              <Link to="/study-notes" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Study Notes</Link>
              <Link to="/calendar" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Calendar</Link>
              <Link to="/collaborate" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Collaborate</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
