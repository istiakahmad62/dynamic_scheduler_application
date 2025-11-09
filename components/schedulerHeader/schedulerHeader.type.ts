import { CourseGroup, Division } from "@/types";

export interface SchedulerHeaderProps {
  collapsedDivisions: Record<Division, boolean>;
  collapsedCourseGroups: Record<CourseGroup, boolean>;
  courseGroups: CourseGroup[];
  setCollapsedDivisions: React.Dispatch<
    React.SetStateAction<Record<Division, boolean>>
  >;
  setCollapsedCourseGroups: React.Dispatch<
    React.SetStateAction<Record<CourseGroup, boolean>>
  >;
}
