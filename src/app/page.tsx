import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileCog, FileText } from "lucide-react";

const features = [
  {
    title: "Smart Career AI",
    description: "Get personalized career advice and generate a custom learning roadmap with our AI.",
    href: "/career-ai",
    icon: <BrainCircuit className="size-8 text-primary" />,
  },
  {
    title: "Academic Hub",
    description: "Access semester-wise notes, PYQs, and curated video lectures for your courses.",
    href: "/academic-hub",
    icon: <BookOpen className="size-8 text-primary" />,
  },
  {
    title: "Resume Builder",
    description: "Create a professional resume in minutes with our easy-to-use builder.",
    href: "/resume-builder",
    icon: <FileText className="size-8 text-primary" />,
  },
  {
    title: "PDF Tools",
    description: "Convert and merge your documents with our integrated PDF utilities.",
    href: "/pdf-tools",
    icon: <FileCog className="size-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div 
        className="relative rounded-xl p-8 lg:p-12 text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://storage.googleapis.com/stately-studio-public/edumate-robot.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Welcome to EduMate.AI
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Your all-in-one platform for academic success and career guidance.
          </p>
        </div>
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transition-transform transform hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start gap-4">
                {feature.icon}
                <div className="flex-1">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full bg-primary/90 hover:bg-primary">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/10">
        <CardHeader>
          <CardTitle>About EduMate.AI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            First-year college students often struggle to find organized, reliable academic content and lack personalized career guidance. EduMate.AI is a powerful web platform designed to simplify college life and guide students through academic and career decisions. We combine an intelligent voice/chat assistant for career counseling with a comprehensive student portal for academic resources and productivity tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
