
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp, Merge, Shuffle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PdfToolsPage() {
  const [fileToConvert, setFileToConvert] = useState<File | null>(null);
  const [filesToMerge, setFilesToMerge] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleConvertToPdf = () => {
    if (!fileToConvert) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to convert.",
      });
      return;
    }
    // This is a mock conversion. In a real app, you'd send the file to a server.
    toast({
      title: "Conversion Successful",
      description: `${fileToConvert.name} has been converted to PDF. (Demonstration)`,
    });
  };

  const handleMergePdfs = () => {
    if (!filesToMerge || filesToMerge.length < 2) {
      toast({
        variant: "destructive",
        title: "Not enough files",
        description: "Please select at least two PDF files to merge.",
      });
      return;
    }
    // This is a mock merge.
    toast({
      title: "Merge Successful",
      description: `${filesToMerge.length} files have been merged into a single PDF. (Demonstration)`,
    });
  };


  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          PDF Tools
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Quickly convert and merge your PDF documents.
        </p>
      </div>

      <Tabs defaultValue="converter" className="max-w-xl mx-auto w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="converter"><Shuffle className="mr-2 size-4" /> Converter</TabsTrigger>
          <TabsTrigger value="merger"><Merge className="mr-2 size-4" /> Merger</TabsTrigger>
        </TabsList>
        <TabsContent value="converter" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>PDF Converter</CardTitle>
              <CardDescription>Convert various file types to PDF.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="file-converter">Select File</Label>
                <Input id="file-converter" type="file" onChange={(e) => setFileToConvert(e.target.files?.[0] || null)} />
              </div>
              <Button className="w-full" onClick={handleConvertToPdf}>
                <FileUp className="mr-2 size-4" /> Convert to PDF
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="merger" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>PDF Merger</CardTitle>
              <CardDescription>Combine multiple PDF files into one.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="file-merger">Select Files</Label>
                <Input id="file-merger" type="file" multiple onChange={(e) => setFilesToMerge(e.target.files)} />
              </div>
              <Button className="w-full" onClick={handleMergePdfs}>
                <Merge className="mr-2 size-4" /> Merge PDFs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
