import { loadFromCollapsedState, saveToCollapsedState } from "@/lib/utils";
import { CourseGroup, Division } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { SchedulerBody } from "../schedulerBody";
import { SchedulerHeader } from "../schedulerHeader";
import { SchedulerProps } from "./scheduler.type";

export const Scheduler: React.FC<SchedulerProps> = ({
  teachers,
  onUpdateTeacher,
}) => {
  const [collapsedDivisions, setCollapsedDivisions] = useState<
    Record<Division, boolean>
  >(() =>
    loadFromCollapsedState("collapsedDivisions", { MS: false, HS: false })
  );
  const [collapsedCourseGroups, setCollapsedCourseGroups] = useState<
    Record<CourseGroup, boolean>
  >(() =>
    loadFromCollapsedState("collapsedCourseGroups", {
      CCW6: false,
      CCW7: false,
      CCW8: false,
      CCW9: false,
      CCW10: false,
      Grade1: false,
      Grade2: false,
    })
  );

  const courseGroups = useMemo(() => {
    const groups = new Set<CourseGroup>();
    teachers.forEach((teacher) => {
      teacher.courseAssignments.forEach((course) => {
        groups.add(course.courseGroup);
      });
    });
    return Array.from(groups).sort();
  }, [teachers]);

  useEffect(() => {
    saveToCollapsedState("collapsedDivisions", collapsedDivisions);
  }, [collapsedDivisions]);

  useEffect(() => {
    saveToCollapsedState("collapsedCourseGroups", collapsedCourseGroups);
  }, [collapsedCourseGroups]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <SchedulerHeader
        courseGroups={courseGroups}
        collapsedDivisions={collapsedDivisions}
        collapsedCourseGroups={collapsedCourseGroups}
        setCollapsedDivisions={setCollapsedDivisions}
        setCollapsedCourseGroups={setCollapsedCourseGroups}
      />

      <SchedulerBody
        teachers={teachers}
        courseGroups={courseGroups}
        collapsedDivisions={collapsedDivisions}
        collapsedCourseGroups={collapsedCourseGroups}
        onUpdateTeacher={onUpdateTeacher}
      />
    </div>
  );
};
