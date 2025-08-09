import { ResumeBuilderClient } from "@/components/resume-builder-client";

export default function ResumeBuilderPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Resume Builder
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create a professional resume that stands out. Fill in your details and see the magic happen.
        </p>
      </div>
      <ResumeBuilderClient />
    </div>
  );
}
