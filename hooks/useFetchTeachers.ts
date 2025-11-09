import { Teacher } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchTeachers = () => {
  return useQuery({
    queryKey: ["teacher-list"],
    queryFn: async (): Promise<Teacher[]> => {
      const response = await fetch("http://localhost:3001/teachers");

      if (!response?.ok) throw new Error("Internal Server Error");

      return response?.json();
    },
  });
};
