
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Plus, Clock, BookOpen, Users, Target } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Physics HL Exam', date: '2024-06-15', type: 'exam', time: '09:00' },
    { id: 2, title: 'Math IA Due', date: '2024-06-20', type: 'deadline', time: '23:59' },
    { id: 3, title: 'Study Group', date: '2024-06-12', type: 'study', time: '15:00' },
  ]);
  const { toast } = useToast();

  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      date: selectedDate.toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Event Added",
      description: `${eventData.title} has been added to your calendar.`,
    });
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'exam': return <Target className="w-4 h-4 text-red-600" />;
      case 'deadline': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'study': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'collaboration': return <Users className="w-4 h-4 text-green-600" />;
      default: return <CalendarIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'deadline': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'study': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'collaboration': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const eventsForSelectedDate = events.filter(event => 
    event.date === selectedDate.toISOString().split('T')[0]
  );

  const AddEventDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Event
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Event title..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Event type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="study">Study Session</SelectItem>
              <SelectItem value="collaboration">Collaboration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Input type="time" placeholder="Time..." />
          <Textarea placeholder="Description (optional)..." />
          <Button 
            onClick={() => handleAddEvent({
              title: "New Event",
              type: "study",
              time: "14:00"
            })} 
            className="w-full"
          >
            Add Event
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Calendar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Track your deadlines, exams, and important IB dates.
            </p>
          </div>
          <AddEventDialog />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow p-3 pointer-events-auto"
                />
              </CardContent>
            </Card>
          </div>

          {/* Events for Selected Date */}
          <div>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map((event) => (
                    <div 
                      key={event.id}
                      className={`p-3 rounded-lg border ${getEventTypeColor(event.type)} hover:shadow-sm transition-all duration-200`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getEventTypeIcon(event.type)}
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs opacity-70">{event.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No events for this date</p>
                    <p className="text-xs">Click "Add Event" to create one</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-2 rounded border border-gray-100 bg-white/50">
                    <div className="flex items-center gap-2">
                      {getEventTypeIcon(event.type)}
                      <div>
                        <p className="text-xs font-medium">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
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

export default Calendar;
