'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateCareerRoadmap, type CareerRoadmapOutput } from '@/ai/flows/career-roadmap-generator';
import { suggestLearningResource, type SuggestLearningResourceOutput } from '@/ai/flows/suggest-learning-resource';
import { Loader2, Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Separator } from './ui/separator';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  skillsAndInterests: z.string().min(20, {
    message: 'Please describe your skills and interests in at least 20 characters.',
  }),
});

export function CareerAIClient() {
  const [roadmapResult, setRoadmapResult] = useState<CareerRoadmapOutput | null>(null);
  const [suggestionsResult, setSuggestionsResult] = useState<SuggestLearningResourceOutput | null>(null);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillsAndInterests: '',
    },
  });

  async function onRoadmapSubmit(values: z.infer<typeof formSchema>) {
    setIsLoadingRoadmap(true);
    setRoadmapResult(null);
    setSuggestionsResult(null);
    try {
      const result = await generateCareerRoadmap({ skillsAndInterests: values.skillsAndInterests });
      setRoadmapResult(result);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Roadmap',
        description: 'An unexpected error occurred. Please try again later.',
      });
      console.error(e);
    } finally {
      setIsLoadingRoadmap(false);
    }
  }

  async function onSuggestResources() {
    if (!roadmapResult) return;
    setIsLoadingSuggestions(true);
    setSuggestionsResult(null);
    try {
      const result = await suggestLearningResource({
        careerPath: 'Inferred from roadmap',
        currentRoadmap: roadmapResult.roadmap,
        studentSkills: form.getValues('skillsAndInterests'),
      });
      setSuggestionsResult(result);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error Suggesting Resources',
        description: 'An unexpected error occurred. Please try again later.',
      });
      console.error(e);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>1. Generate Your Career Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRoadmapSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="skillsAndInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills & Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I'm good at math and logic, and I enjoy building things with code. I'm interested in web development and machine learning..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingRoadmap}>
                {isLoadingRoadmap ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Roadmap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoadingRoadmap && (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      )}

      {roadmapResult && (
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card><CardHeader><CardTitle>Personalized Career Advice</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{roadmapResult.careerAdvice}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Your Custom Roadmap</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{roadmapResult.roadmap}</p></CardContent></Card>
          </div>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>2. Find Learning Resources</CardTitle>
              <CardDescription>Now, let's find some resources to help you follow your new roadmap.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={onSuggestResources} disabled={isLoadingSuggestions}>
                {isLoadingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Suggest Resources
              </Button>
            </CardContent>
          </Card>

          {isLoadingSuggestions && (
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          )}

          {suggestionsResult && (
            <Card>
              <CardHeader><CardTitle>Suggested Learning Resources</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {suggestionsResult.resourceSuggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
