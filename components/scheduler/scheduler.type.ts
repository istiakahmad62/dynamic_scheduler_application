import { Teacher } from "@/types";

export interface SchedulerProps {
  teachers: Teacher[];
  onUpdateTeacher: (teacher: Teacher) => void;
}
