import { getCourseGroupColor } from "@/lib/utils";
import { CourseGroup, Division } from "@/types";
import clsx from "clsx";
import React from "react";
import { SchedulerHeaderProps } from "./schedulerHeader.type";

export const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({
  collapsedDivisions,
  collapsedCourseGroups,
  courseGroups,
  setCollapsedCourseGroups,
  setCollapsedDivisions,
}) => {
  const toggleDivision = (division: Division) => {
    setCollapsedDivisions((prev) => ({ ...prev, [division]: !prev[division] }));
  };

  const toggleCourseGroup = (courseGroup: CourseGroup) => {
    setCollapsedCourseGroups((prev) => ({
      ...prev,
      [courseGroup]: !prev[courseGroup],
    }));
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Teacher Scheduler (8-Day Cycle)
      </h1>

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <span className="font-semibold text-gray-700">Divisions:</span>
          <button
            onClick={() => toggleDivision("MS")}
            className={clsx(
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              collapsedDivisions.MS
                ? "bg-gray-300 text-gray-700"
                : "bg-green-500 text-white hover:bg-green-600"
            )}
          >
            MS {collapsedDivisions.MS ? "(Hidden)" : "(Visible)"}
          </button>
          <button
            onClick={() => toggleDivision("HS")}
            className={clsx(
              "px-3 py-1 rounded text-sm font-medium transition-colors",
              collapsedDivisions.HS
                ? "bg-gray-300 text-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            )}
          >
            HS {collapsedDivisions.HS ? "(Hidden)" : "(Visible)"}
          </button>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold text-gray-700">Course Groups:</span>
          {courseGroups.map((group) => (
            <button
              key={group}
              onClick={() => toggleCourseGroup(group)}
              className={clsx(
                "px-3 py-1 rounded text-sm font-medium transition-colors border",
                collapsedCourseGroups[group]
                  ? "bg-gray-200 text-gray-600 border-gray-400"
                  : clsx(
                      getCourseGroupColor(group),
                      "border-gray-300 hover:opacity-80"
                    )
              )}
            >
              {group} {collapsedCourseGroups[group] ? "→" : "↓"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
