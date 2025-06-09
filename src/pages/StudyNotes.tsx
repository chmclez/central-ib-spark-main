
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { BookOpen, Folder, Plus, Upload, File, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useSubjects } from '@/context/subjects-context';

const createFolder = (name: string) => ({ name, icon: '📁', files: 0, subfolders: [] });

const StudyNotes = () => {
  const { subjects } = useSubjects();
  const [folders, setFolders] = useState(() => subjects.map(createFolder));
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setFolders(subjects.map(createFolder));
  }, [subjects]);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleCreateSubfolder = (parentFolder, subfolderName) => {
    const updatedFolders = folders.map(folder => {
      if (folder.name === parentFolder.name) {
        return {
          ...folder,
          subfolders: [...folder.subfolders, { name: subfolderName, files: 0 }]
        };
      }
      return folder;
    });
    setFolders(updatedFolders);
    toast({
      title: "Subfolder Created",
      description: `${subfolderName} has been created in ${parentFolder.name}`,
    });
  };

  const handleFileUpload = (folderName, fileName) => {
    const updatedFolders = folders.map(folder => {
      if (folder.name === folderName) {
        return { ...folder, files: folder.files + 1 };
      }
      return folder;
    });
    setFolders(updatedFolders);
    toast({
      title: "File Uploaded",
      description: `${fileName} has been uploaded to ${folderName}`,
    });
  };

  const CreateSubfolderDialog = ({ parentFolder }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="w-3 h-3 mr-1" />
          New Subfolder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Subfolder in {parentFolder?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Subfolder name..." />
          <Button 
            onClick={() => handleCreateSubfolder(parentFolder, "New Topic")} 
            className="w-full"
          >
            Create Subfolder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const UploadFileDialog = ({ folderName }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="w-3 h-3 mr-1" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File to {folderName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg" />
          <Input placeholder="File name (optional)..." />
          <Button 
            onClick={() => handleFileUpload(folderName, "study-notes.pdf")} 
            className="w-full"
          >
            Upload File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Study Notes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize and access all your IB study materials in one place.
          </p>
        </div>

        {selectedFolder ? (
          // Folder Detail View
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{selectedFolder.icon}</span>
                  {selectedFolder.name}
                </CardTitle>
                <div className="flex gap-2">
                  <CreateSubfolderDialog parentFolder={selectedFolder} />
                  <UploadFileDialog folderName={selectedFolder.name} />
                  <Button variant="outline" onClick={() => setSelectedFolder(null)}>
                    Back to All Folders
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedFolder.subfolders.map((subfolder, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Folder className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium">{subfolder.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{subfolder.files} files</p>
                  </div>
                ))}
                
                {selectedFolder.files > 0 && (
                  <div className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center mb-2">
                      <File className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium">study-notes.pdf</span>
                    </div>
                    <p className="text-sm text-gray-600">Uploaded today</p>
                  </div>
                )}
                
                {selectedFolder.subfolders.length === 0 && selectedFolder.files === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>This folder is empty. Create a subfolder or upload files to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Main Folders View
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Your Study Folders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {folders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {folders.map((folder, index) => (
                  
                  <div 
                    key={folder.name}
                    className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => handleFolderClick(folder)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{folder.icon}</span>
                        <h3 className="font-semibold text-gray-800">{folder.name}</h3>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>{folder.files} files • {folder.subfolders.length} subfolders</p>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Add subjects to create your first folders.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default StudyNotes;
