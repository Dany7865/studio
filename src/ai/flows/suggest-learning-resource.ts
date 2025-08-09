'use server';

/**
 * @fileOverview AI flow to suggest relevant learning resources based on a student's career roadmap.
 *
 * - suggestLearningResource - A function that suggests learning resources.
 * - SuggestLearningResourceInput - The input type for the suggestLearningResource function.
 * - SuggestLearningResourceOutput - The return type for the suggestLearningResource function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningResourceInputSchema = z.object({
  careerPath: z.string().describe('The career path the student is exploring.'),
  currentRoadmap: z.string().describe('The student\'s current learning roadmap.'),
  studentSkills: z.string().describe('The student\'s current skills and interests.'),
});
export type SuggestLearningResourceInput = z.infer<typeof SuggestLearningResourceInputSchema>;

const SuggestLearningResourceOutputSchema = z.object({
  resourceSuggestions: z.array(z.string()).describe('A list of suggested learning resources (e.g., courses, articles, videos).'),
});
export type SuggestLearningResourceOutput = z.infer<typeof SuggestLearningResourceOutputSchema>;

export async function suggestLearningResource(input: SuggestLearningResourceInput): Promise<SuggestLearningResourceOutput> {
  return suggestLearningResourceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningResourcePrompt',
  input: {schema: SuggestLearningResourceInputSchema},
  output: {schema: SuggestLearningResourceOutputSchema},
  prompt: `You are an expert career counselor specializing in suggesting relevant learning resources for students.

  Based on the student's career path, current roadmap, and skills, suggest a list of relevant learning resources.

  Career Path: {{{careerPath}}}
Current Roadmap: {{{currentRoadmap}}}
Student Skills: {{{studentSkills}}}

  Provide a list of resources that will help the student acquire the necessary knowledge and skills to advance in their chosen career path.
  Ensure the resources are relevant to the student's current roadmap.

  {{#if currentRoadmap}}
  Consider the current roadmap when suggesting resources.
  {{else}}
  Since the student does not yet have a roadmap, focus on foundational knowledge for the career path.
  {{/if}}
  Please provide a list of learning resources in a structured format.
`,
});

const suggestLearningResourceFlow = ai.defineFlow(
  {
    name: 'suggestLearningResourceFlow',
    inputSchema: SuggestLearningResourceInputSchema,
    outputSchema: SuggestLearningResourceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
