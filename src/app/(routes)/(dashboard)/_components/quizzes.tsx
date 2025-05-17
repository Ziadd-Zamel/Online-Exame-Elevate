// React
import React, { Suspense } from "react";
import Link from "next/link";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// API & Utilities
import { getSubjects } from "@/lib/api/subjects.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import SubjectCard from "./subject-card";

export default async function QuestionsDialog() {
  // Fetch subjects using error handling utility
  const [subjects, error] = await catchError(() => getSubjects(6));

  // Handle error state
  if (error) {
    return <div>Error loading subjects: {error}</div>;
  }

  return (
    <Card className="px-3 py-8 shadow-secondary rounded-2xl bg-transparent md:bg-white md:border border-none">
      <CardHeader className="p-0 pb-6 flex flex-row justify-between items-center">
        <CardTitle className="font-medium text-main text-2xl text-primaryMain">
          Quizes
        </CardTitle>
        <Link
          href={"subjects"}
          className="font-medium text-primaryMain hidden sm:block text-2xl p-0"
        >
          View All
        </Link>
      </CardHeader>

      <CardContent className="p-0 space-y-6 w-full">
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {/* Render subjects with fallback during loading */}
          <Suspense fallback={<div>Loading...</div>}>
            {subjects?.subjects.map((subject) => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </Suspense>
          <Link
            href="subjects"
            className="font-medium text-primaryMain sm:hidden block text-2xl p-0"
          >
            View All
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
