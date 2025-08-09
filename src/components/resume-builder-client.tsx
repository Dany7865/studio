'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download, PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const resumeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  summary: z.string().min(10, 'Summary should be at least 10 characters'),
  education: z.array(z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    year: z.string().min(4, 'Year is required'),
  })),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    years: z.string().min(1, 'Years are required'),
    description: z.string().min(1, 'Description is required'),
  })),
  achievements: z.array(z.object({
    description: z.string().min(1, 'Achievement is required'),
  })),
  hackathons: z.array(z.object({
    name: z.string().min(1, 'Hackathon name is required'),
    date: z.string().min(1, 'Date is required'),
    description: z.string().min(1, 'Description is required'),
  })),
  skills: z.string().min(1, 'At least one skill is required'),
});

type ResumeData = z.infer<typeof resumeSchema>;

export function ResumeBuilderClient() {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      fullName: '', email: '', phone: '', address: '', summary: '',
      education: [{ institution: '', degree: '', year: '' }],
      experience: [{ company: '', role: '', years: '', description: '' }],
      achievements: [{ description: '' }],
      hackathons: [{ name: '', date: '', description: '' }],
      skills: '',
    },
  });
  
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: achFields, append: appendAch, remove: removeAch } = useFieldArray({ control: form.control, name: 'achievements' });
  const { fields: hackFields, append: appendHack, remove: removeHack } = useFieldArray({ control: form.control, name: 'hackathons' });

  const resumeData = form.watch();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-6 print:hidden">
        <Card>
          <CardHeader><CardTitle>Enter Your Details</CardTitle><CardDescription>Fill out the form to build your resume.</CardDescription></CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="summary" render={({ field }) => ( <FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem> )} />
                <Separator />
                <h3 className="text-lg font-semibold border-b pb-2">Education</h3>
                {eduFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-4 relative bg-muted/50">
                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => ( <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`education.${index}.year`} render={({ field }) => ( <FormItem><FormLabel>Year of Completion</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="size-4 text-destructive"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ institution: '', degree: '', year: '' })}><PlusCircle className="mr-2 size-4" /> Add Education</Button>
                <Separator />
                <h3 className="text-lg font-semibold border-b pb-2">Work Experience</h3>
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-4 relative bg-muted/50">
                    <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`experience.${index}.role`} render={({ field }) => ( <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`experience.${index}.years`} render={({ field }) => ( <FormItem><FormLabel>Years</FormLabel><FormControl><Input placeholder="e.g., 2020 - Present" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="size-4 text-destructive"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ company: '', role: '', years: '', description: '' })}><PlusCircle className="mr-2 size-4" /> Add Experience</Button>
                <Separator />
                <h3 className="text-lg font-semibold border-b pb-2">Achievements</h3>
                {achFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-4 relative bg-muted/50">
                    <FormField control={form.control} name={`achievements.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Achievement</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeAch(index)}><Trash2 className="size-4 text-destructive"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendAch({ description: '' })}><PlusCircle className="mr-2 size-4" /> Add Achievement</Button>
                <Separator />
                <h3 className="text-lg font-semibold border-b pb-2">Hackathons</h3>
                {hackFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-4 relative bg-muted/50">
                    <FormField control={form.control} name={`hackathons.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Hackathon Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`hackathons.${index}.date`} render={({ field }) => ( <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`hackathons.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeHack(index)}><Trash2 className="size-4 text-destructive"/></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendHack({ name: '', date: '', description: '' })}><PlusCircle className="mr-2 size-4" /> Add Hackathon</Button>
                <Separator />
                <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
                <FormField control={form.control} name="skills" render={({ field }) => ( <FormItem><FormLabel>Skills (comma separated)</FormLabel><FormControl><Textarea placeholder="e.g., React, Node.js, Python, SQL" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <div className="sticky top-4">
          <div className="flex justify-between items-center mb-4 print:hidden">
            <h3 className="text-xl font-semibold">Resume Preview</h3>
            <Button onClick={handlePrint}><Download className="mr-2 size-4"/> Download PDF</Button>
          </div>
          <Card id="resume-preview" className="p-8 aspect-[1/1.414] overflow-auto shadow-lg">
            <style>{`@media print { body * { visibility: hidden; } #resume-preview, #resume-preview * { visibility: visible; } #resume-preview { position: absolute; left: 0; top: 0; width: 100%; height: 100%; margin: 0; padding: 2rem; box-shadow: none; border: none; } }`}</style>
            <div className="text-center mb-8"><h1 className="text-3xl font-bold">{resumeData.fullName || 'Your Name'}</h1><p className="text-sm text-muted-foreground">{resumeData.email || 'your.email@example.com'} | {resumeData.phone || '(123) 456-7890'} | {resumeData.address || 'Your City, State'}</p></div>
            <div className="space-y-6">
              <div><h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">PROFESSIONAL SUMMARY</h2><p className="text-sm">{resumeData.summary || 'A brief summary about your professional background and career goals.'}</p></div>
              <div>
                <h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">WORK EXPERIENCE</h2>
                {resumeData.experience.map((exp, i) => (exp.company && <div key={i} className="mb-4"><div className="flex justify-between items-baseline"><h3 className="font-semibold">{exp.role || 'Your Role'}</h3><p className="text-sm text-muted-foreground">{exp.years || '20XX-20XX'}</p></div><p className="text-sm italic">{exp.company || 'Company Name'}</p><p className="text-sm mt-1">{exp.description || 'Description of your responsibilities and achievements.'}</p></div>))}
              </div>
              <div>
                <h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">EDUCATION</h2>
                {resumeData.education.map((edu, i) => (edu.institution && <div key={i} className="mb-2"><div className="flex justify-between items-baseline"><h3 className="font-semibold">{edu.institution || 'University Name'}</h3><p className="text-sm text-muted-foreground">{edu.year || '20XX'}</p></div><p className="text-sm italic">{edu.degree || 'Your Degree'}</p></div>))}
              </div>
              <div>
                <h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">ACHIEVEMENTS</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {resumeData.achievements?.map((ach, i) => (ach.description && <li key={i} className="text-sm">{ach.description}</li>))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">HACKATHONS</h2>
                {resumeData.hackathons?.map((hack, i) => (hack.name && <div key={i} className="mb-4"><div className="flex justify-between items-baseline"><h3 className="font-semibold">{hack.name || 'Hackathon Name'}</h3><p className="text-sm text-muted-foreground">{hack.date || 'YYYY-MM'}</p></div><p className="text-sm mt-1">{hack.description || 'Description of your project and role in the hackathon.'}</p></div>))}
              </div>
              <div>
                <h2 className="text-lg font-bold border-b-2 border-primary mb-2 text-primary">SKILLS</h2>
                <div className="flex flex-wrap gap-2">{(resumeData.skills || 'Your, Skills, Here').split(',').map(skill => skill.trim()).filter(Boolean).map((skill, i) => (<Badge key={i} variant="secondary" className="text-sm">{skill}</Badge>))}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
