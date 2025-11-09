import { Teacher } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTeacher = () => {
  return useMutation({
    mutationFn: async (payload: Teacher) => {
      const response = await fetch(
        `http://localhost:3001/teachers/${payload.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response?.ok) throw new Error("Internal Server Error");

      return response?.json();
    },
  });
};
