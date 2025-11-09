import { Teacher, CalculatedTeacher, CourseGroup } from "@/types";

export function calculateTeacherMetrics(teacher: Teacher): CalculatedTeacher {
  const totalLoad = teacher.courseAssignments
    .filter((course) => !course.isCPT)
    .reduce((sum, course) => sum + course.load, 0);

  const availablePeriods = teacher.maxLoad - totalLoad;

  const totalStudents = teacher.courseAssignments.reduce(
    (sum, course) => sum + course.students,
    0
  );

  return {
    ...teacher,
    totalLoad,
    availablePeriods,
    totalStudents,
  };
}

export function getCourseGroupColor(courseGroup: CourseGroup): string {
  const colorMap: Record<CourseGroup, string> = {
    CCW6: "bg-yellow-100",
    CCW7: "bg-emerald-100",
    CCW8: "bg-pink-100",
    CCW9: "bg-yellow-100",
    CCW10: "bg-blue-100",
    Grade1: "bg-green-300",
    Grade2: "bg-green-400",
  };
  return colorMap[courseGroup] || "bg-gray-100";
}

export function getDivisionColor(division: "MS" | "HS"): string {
  return division === "MS" ? "bg-green-50" : "bg-blue-50";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveToCollapsedState(key: string, value: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function loadFromCollapsedState<T>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export function clsx(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
