// React
import React, { Suspense } from "react";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// API & Utilities
import { getSubjects } from "@/lib/api/subjects.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import SubjectCard from "../_components/subject-card";

export default async function Page() {
  // Fetch subjects using error handling utility
  const [subjects, error] = await catchError(() => getSubjects(100));

  // Handle error state
  if (error) {
    return <div>Error loading subjects: {error}</div>;
  }

  return (
    <Card className="px-3 py-8 shadow-secondary rounded-2xl bg-transparent md:bg-white md:border border-none">
      <CardHeader className="p-0 pb-6 flex flex-row justify-between items-center">
        <CardTitle className="font-medium text-main text-2xl text-primaryMain">
          All Quizes
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-6 w-full">
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            {subjects?.subjects.map((subject) => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
