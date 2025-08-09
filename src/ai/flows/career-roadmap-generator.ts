// Implemented the AI-powered career roadmap generator flow.
'use server';
/**
 * @fileOverview A career roadmap generator AI agent.
 *
 * - generateCareerRoadmap - A function that handles the career roadmap generation process.
 * - CareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * - CareerRoadmapOutput - The return type for the generateCareerRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerRoadmapInputSchema = z.object({
  skillsAndInterests: z
    .string()
    .describe(
      'A description of the students skills and interests to base the career roadmap on.'
    ),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

const CareerRoadmapOutputSchema = z.object({
  careerAdvice: z.string().describe('Personalized career advice for the student.'),
  roadmap: z.string().describe('A roadmap of relevant learning resources.'),
});
export type CareerRoadmapOutput = z.infer<typeof CareerRoadmapOutputSchema>;

export async function generateCareerRoadmap(input: CareerRoadmapInput): Promise<CareerRoadmapOutput> {
  return careerRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerRoadmapPrompt',
  input: {schema: CareerRoadmapInputSchema},
  output: {schema: CareerRoadmapOutputSchema},
  prompt: `You are a career counselor specializing in helping students find the right career path and resources.

You will use the following information about the student's skills and interests to generate personalized career advice and a roadmap of relevant learning resources.

Skills and Interests: {{{skillsAndInterests}}}`,
});

const careerRoadmapFlow = ai.defineFlow(
  {
    name: 'careerRoadmapFlow',
    inputSchema: CareerRoadmapInputSchema,
    outputSchema: CareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
