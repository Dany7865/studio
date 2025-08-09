import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Book,
  FilePen,
  FileQuestion,
  GraduationCap,
  Upload,
  Video,
} from 'lucide-react';
import Link from 'next/link';

const courses = {
  'B.Tech': {
    semesters: 8,
    subjects: [
      'Engineering Mathematics',
      'Data Structures',
      'Algorithms',
      'Operating Systems',
      'Database Management',
      'Computer Networks',
      'Software Engineering',
      'Machine Learning',
    ],
  },
  BCA: {
    semesters: 6,
    subjects: [
      'Fundamentals of IT',
      'Programming in C',
      'Data Structures',
      'Object Oriented Programming',
      'Web Technologies',
      'Java Programming',
    ],
  },
  'B.Sc': {
    semesters: 6,
    subjects: [
      'Calculus',
      'Mechanics',
      'Electromagnetism',
      'Quantum Physics',
      'Organic Chemistry',
      'Botany & Zoology',
    ],
  },
  MBA: {
    semesters: 4,
    subjects: [
      'Managerial Economics',
      'Marketing Management',
      'Financial Accounting',
      'Human Resource Management',
      'Operations Management',
      'Business Strategy',
    ],
  },
  NIET: {
    semesters: 8,
    subjects: [
      'Applied Physics',
      'Programming for Problem Solving',
      'Emerging Technology for Engineering',
      'AI For Engineering',
      'Data Structures',
      'Computer Organization and Architecture',
      'Operating Systems',
      'Compiler Design',
    ]
  }
};

export default function AcademicHubPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Academic Hub
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find all your academic resources in one place, sourced from top
          institutions and communities.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="B.Tech" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              {Object.keys(courses).map((course) => (
                <TabsTrigger key={course} value={course}>
                  {course}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(courses).map(([courseName, courseData]) => (
              <TabsContent key={courseName} value={courseName} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{courseName} Resources</CardTitle>
                    <CardDescription>
                      Select a semester to view subjects and materials.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {[...Array(courseData.semesters)].map((_, i) => (
                        <AccordionItem key={i} value={`semester-${i + 1}`}>
                          <AccordionTrigger>Semester {i + 1}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-4">
                              {courseData.subjects
                                .slice(i, i + 4)
                                .map((subject) => (
                                  <Card key={subject} className="bg-muted/50">
                                    <CardHeader className="flex flex-row items-center justify-between p-4">
                                      <h3 className="font-semibold">
                                        {subject}
                                      </h3>
                                      <Badge variant="secondary">
                                        {Math.floor(Math.random() * 8) + 5}{' '}
                                        Resources
                                      </Badge>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                      <div className="flex flex-wrap gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          asChild
                                        >
                                          <Link
                                            href={`https://www.google.com/search?q=${encodeURIComponent(
                                              subject
                                            )}+notes+pdf`}
                                            target="_blank"
                                          >
                                            <Book className="mr-2 size-4" />{' '}
                                            Notes (PDF)
                                          </Link>
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          asChild
                                        >
                                          <Link
                                            href={`https://www.google.com/search?q=${encodeURIComponent(
                                              subject
                                            )}+handwritten+notes+pdf`}
                                            target="_blank"
                                          >
                                            <FilePen className="mr-2 size-4" />{' '}
                                            Handwritten (PDF)
                                          </Link>
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          asChild
                                        >
                                          <Link
                                            href={`https://www.google.com/search?q=${encodeURIComponent(
                                              subject
                                            )}+previous+year+questions+pdf`}
                                            target="_blank"
                                          >
                                            <FileQuestion className="mr-2 size-4" />{' '}
                                            PYQs (PDF)
                                          </Link>
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          asChild
                                        >
                                          <Link
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                              subject
                                            )}`}
                                            target="_blank"
                                          >
                                            <Video className="mr-2 size-4" />{' '}
                                            YouTube Videos
                                          </Link>
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Community Uploads</CardTitle>
              <CardDescription>
                Contribute by uploading your handwritten notes and other study
                materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Upload className="mr-2 size-4" /> Upload Content
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Automated Sourcing</CardTitle>
              <CardDescription>
                Our system constantly scrapes open repositories and sites like
                YouTube for the latest academic content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                New content is automatically added and categorized for you.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trusted Sources</CardTitle>
              <CardDescription>
                We aggregate notes and materials from top educational
                institutions, Google, and other open-source projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="size-5 text-primary" />
                <p>High-quality, verified materials.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
