
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Video, MessageSquare, Clock, UserPlus, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Collaborate = () => {
  const [studyRooms, setStudyRooms] = useState([
    {
      id: 1,
      name: 'Physics Study Group',
      subject: 'Physics HL',
      platform: 'Google Meet',
      participants: 3,
      maxParticipants: 6,
      status: 'active',
      created: '2 hours ago'
    },
    {
      id: 2,
      name: 'Math Cramming Session',
      subject: 'Mathematics HL',
      platform: 'Discord',
      participants: 2,
      maxParticipants: 4,
      status: 'waiting',
      created: '30 minutes ago'
    }
  ]);
  const { toast } = useToast();

  const handleCreateRoom = (roomData) => {
    const newRoom = {
      id: studyRooms.length + 1,
      ...roomData,
      participants: 1,
      status: 'waiting',
      created: 'Just now'
    };
    setStudyRooms([...studyRooms, newRoom]);
    toast({
      title: "Study Room Created",
      description: `${roomData.name} has been created. Share the link with your friends!`,
    });
  };

  const handleJoinRoom = (room) => {
    const updatedRooms = studyRooms.map(r => {
      if (r.id === room.id && r.participants < r.maxParticipants) {
        return { ...r, participants: r.participants + 1 };
      }
      return r;
    });
    setStudyRooms(updatedRooms);
    toast({
      title: "Joined Study Room",
      description: `You've joined ${room.name}. Opening ${room.platform}...`,
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Google Meet': return <Video className="w-4 h-4 text-blue-600" />;
      case 'Discord': return <MessageSquare className="w-4 h-4 text-indigo-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CreateRoomDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Study Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create New Study Room
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Room name (e.g., Math Study Group)..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select subject..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math-hl">Mathematics HL</SelectItem>
              <SelectItem value="physics-hl">Physics HL</SelectItem>
              <SelectItem value="chemistry-sl">Chemistry SL</SelectItem>
              <SelectItem value="english-sl">English A SL</SelectItem>
              <SelectItem value="economics-hl">Economics HL</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose platform..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google-meet">Google Meet</SelectItem>
              <SelectItem value="discord">Discord</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Max participants..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="4">4 people</SelectItem>
              <SelectItem value="6">6 people</SelectItem>
              <SelectItem value="8">8 people</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Description or study goals (optional)..." />
          <Button 
            onClick={() => handleCreateRoom({
              name: "Study Room",
              subject: "Mathematics HL",
              platform: "Google Meet",
              maxParticipants: 4
            })} 
            className="w-full"
          >
            Create Room
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
              Collaborate
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Study together with your friends and classmates.
            </p>
          </div>
          <CreateRoomDialog />
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-600" />
              Active Study Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            {studyRooms.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {studyRooms.map((room) => (
                  <div 
                    key={room.id}
                    className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{room.name}</h3>
                      <Badge className={getStatusColor(room.status)}>
                        {room.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Badge variant="outline" className="mr-2">{room.subject}</Badge>
                        <span>{getPlatformIcon(room.platform)}</span>
                        <span className="ml-1">{room.platform}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{room.participants}/{room.maxParticipants} participants</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {room.created}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleJoinRoom(room)}
                        disabled={room.participants >= room.maxParticipants}
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        Join Room
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No active study rooms</h3>
                <p>Create a study room to collaborate with your friends.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Study Room Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold mb-1">Google Meet</h4>
                <p className="text-sm text-gray-600">Video calls with screen sharing for visual learners</p>
              </div>
              <div className="text-center p-4">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                <h4 className="font-semibold mb-1">Discord</h4>
                <p className="text-sm text-gray-600">Voice chat with text channels and file sharing</p>
              </div>
              <div className="text-center p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold mb-1">Study Groups</h4>
                <p className="text-sm text-gray-600">Collaborate on assignments and share resources</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Collaborate;
