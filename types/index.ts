export type Division = "MS" | "HS";

export type CourseGroup =
  | "CCW6"
  | "CCW7"
  | "CCW8"
  | "CCW9"
  | "CCW10"
  | "Grade1"
  | "Grade2";

export interface CourseAssignment {
  courseId: string;
  courseName: string;
  courseGroup: CourseGroup;
  load: number;
  isCPT?: boolean;
  students: number;
}

export interface Teacher {
  id: string;
  name: string;
  division: Division;
  otherRole?: string;
  maxLoad: number;
  preps: number;
  courseAssignments: CourseAssignment[];
}

export interface CalculatedTeacher extends Teacher {
  totalLoad: number;
  availablePeriods: number;
  totalStudents: number;
}

export interface CollapsedState {
  divisions: Record<Division, boolean>;
  courseGroups: Record<CourseGroup, boolean>;
}

export interface SortConfig {
  columnId: string | null;
  direction: "asc" | "desc";
}

export interface DragItem {
  teacherId: string;
  courseId: string;
  courseGroup: CourseGroup;
}
