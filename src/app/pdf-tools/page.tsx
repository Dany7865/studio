
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileUp, Merge, Shuffle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

export default function PdfToolsPage() {
  const [fileToConvert, setFileToConvert] = useState<File | null>(null);
  const [filesToMerge, setFilesToMerge] = useState<FileList | null>(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [mergedFileUrl, setMergedFileUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvertToPdf = () => {
    if (!fileToConvert) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a file to convert.',
      });
      return;
    }

    const isImage = fileToConvert.type.startsWith('image/');
    if (!isImage) {
      toast({
        variant: 'destructive',
        title: 'Unsupported File Type',
        description: 'Currently, only image to PDF conversion is supported.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target?.result as string;
      const doc = new jsPDF();
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        setConvertedFileUrl(url);
        toast({
          title: 'Conversion Successful',
          description: 'Your image has been converted to a PDF.',
        });
      };
    };
    reader.readAsDataURL(fileToConvert);
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
    const fileNames = Array.from(filesToMerge).map(f => f.name).join(', ');
    const blob = new Blob([`This is a mock merged PDF from: ${fileNames}`], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setMergedFileUrl(url);

    toast({
      title: "Merge Successful (Demonstration)",
      description: `${filesToMerge.length} files have been merged into a single PDF. This is for demonstration purposes.`,
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
              <CardTitle>Image to PDF Converter</CardTitle>
              <CardDescription>Convert JPEG or PNG images to PDF.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="file-converter">Select Image File</Label>
                <Input id="file-converter" type="file" accept="image/jpeg, image/png" onChange={(e) => { setFileToConvert(e.target.files?.[0] || null); setConvertedFileUrl(null); }} />
              </div>
              <Button className="w-full" onClick={handleConvertToPdf}>
                <FileUp className="mr-2 size-4" /> Convert to PDF
              </Button>
              {convertedFileUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={convertedFileUrl} download={`${fileToConvert?.name.split('.')[0] || 'converted'}.pdf`}>
                    <Download className="mr-2 size-4" /> Download PDF
                  </a>
                </Button>
              )}
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
                <Input id="file-merger" type="file" multiple accept="application/pdf" onChange={(e) => { setFilesToMerge(e.target.files); setMergedFileUrl(null); }} />
              </div>
              <Button className="w-full" onClick={handleMergePdfs}>
                <Merge className="mr-2 size-4" /> Merge PDFs
              </Button>
              {mergedFileUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={mergedFileUrl} download="merged.pdf">
                    <Download className="mr-2 size-4" /> Download Merged PDF
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
