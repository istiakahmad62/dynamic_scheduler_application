import { CourseGroup, Division, Teacher } from "@/types";

export interface SchedulerBodyProps {
  teachers: Teacher[];
  courseGroups: CourseGroup[];
  collapsedDivisions: Record<Division, boolean>;
  collapsedCourseGroups: Record<CourseGroup, boolean>;
  onUpdateTeacher: (teacher: Teacher) => void;
}
