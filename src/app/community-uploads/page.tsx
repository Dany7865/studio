
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url: string;
  course: string;
  subject: string;
  uploader: string;
  previewUrl?: string;
}

const sampleUploads: UploadedFile[] = [
  { id: '1', name: 'DS_Unit1_Notes.pdf', type: 'PDF', course: 'B.Tech', subject: 'Data Structures', uploader: 'Rohan Sharma', url: 'https://placehold.co/600x400.png', previewUrl: 'https://placehold.co/600x400.png' },
  { id: '2', name: 'C-Lang-PYQ-2022.pdf', type: 'PDF', course: 'BCA', subject: 'Programming in C', uploader: 'Priya Singh', url: 'https://placehold.co/600x400.png', previewUrl: 'https://placehold.co/600x400.png' },
  { id: '3', name: 'EM_Lecture3.mp4', type: 'Video', course: 'B.Sc', subject: 'Electromagnetism', uploader: 'Ankit Gupta', url: 'https://placehold.co/600x400.png', previewUrl: 'https://placehold.co/600x400.png' },
  { id: '4', name: 'ML_Handwritten_Notes.zip', type: 'ZIP', course: 'B.Tech', subject: 'Machine Learning', uploader: 'Sneha Reddy', url: 'https://placehold.co/600x400.png', previewUrl: 'https://placehold.co/600x400.png' },
];

export default function CommunityUploadsPage() {
  const [uploads, setUploads] = useState<UploadedFile[]>(sampleUploads);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const { toast } = useToast();

  const handleFileUpload = () => {
    if (!fileToUpload || !course || !subject) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a file, course, and subject to upload.',
      });
      return;
    }

    const newUpload: UploadedFile = {
      id: (uploads.length + 1).toString(),
      name: fileToUpload.name,
      type: fileToUpload.type.split('/')[1].toUpperCase(),
      url: URL.createObjectURL(fileToUpload),
      course,
      subject,
      uploader: 'You',
      previewUrl: fileToUpload.type.startsWith('image/') ? URL.createObjectURL(fileToUpload) : 'https://placehold.co/600x400.png',
    };

    setUploads([newUpload, ...uploads]);
    setFileToUpload(null);
    setCourse('');
    setSubject('');
    
    toast({
      title: 'Upload Successful',
      description: `Successfully uploaded ${fileToUpload.name}.`,
    });
  };
  
  const handleDelete = (id: string) => {
    setUploads(uploads.filter(upload => upload.id !== id));
    toast({
        title: 'File Deleted',
        description: 'The selected file has been removed.'
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Community Uploads
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Share your study materials and browse resources from your peers.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Shared Resources</CardTitle>
                    <CardDescription>Browse files uploaded by the community.</CardDescription>
                </CardHeader>
                <CardContent>
                    {uploads.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {uploads.map(upload => (
                            <Card key={upload.id} className="group">
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                     <h3 className="font-semibold truncate">{upload.name}</h3>
                                     <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(upload.id)}>
                                        <Trash2 className="size-4"/>
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-2">
                                    <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2 gap-y-1">
                                        <span>Course: <strong>{upload.course}</strong></span>
                                        <span>Subject: <strong>{upload.subject}</strong></span>
                                        <span>By: <strong>{upload.uploader}</strong></span>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                                        <a href={upload.url} download={upload.name}>
                                            <Download className="mr-2 size-4" /> Download ({upload.type})
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No community uploads yet.</p>
                            <p>Be the first to share something!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Upload Your Content</CardTitle>
                    <CardDescription>
                    Help your peers by sharing your notes and materials.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="course">Course</Label>
                        <Select value={course} onValueChange={setCourse}>
                            <SelectTrigger id="course">
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="B.Tech">B.Tech</SelectItem>
                                <SelectItem value="BCA">BCA</SelectItem>
                                <SelectItem value="B.Sc">B.Sc</SelectItem>
                                <SelectItem value="MBA">MBA</SelectItem>
                                <SelectItem value="NIET">NIET</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Data Structures" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="file-upload">Select File</Label>
                        <Input id="file-upload" type="file" onChange={(e) => setFileToUpload(e.target.files?.[0] || null)} />
                    </div>
                    <Button className="w-full" onClick={handleFileUpload}>
                        <FileUp className="mr-2 size-4" /> Upload
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
