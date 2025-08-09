import { CareerAIClient } from "@/components/career-ai-client";

export default function CareerAIPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Smart Career AI
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let our AI help you chart your future. Describe your skills and interests to generate a personalized career roadmap.
        </p>
      </div>
      <CareerAIClient />
    </div>
  );
}
