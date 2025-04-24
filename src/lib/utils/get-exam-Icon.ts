export function getExamIcon(title: string): string {
  const icons: Record<string, string> = {
    html: "/assets/exams/html.png",
    css: "/assets/exams/css.png",
    javascript: "/assets/exams/javascript.png",
    bootstrap: "/assets/exams/bootstrap.png",
    react: "/assets/exams/react.png",
    angular: "/assets/exams/angluar.png",
  };

  const key = title.replace(/quiz/i, "").trim().toLowerCase();
  return icons[key] || "/assets/exams/html.png";
}
