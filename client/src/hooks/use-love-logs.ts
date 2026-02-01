import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertLoveLog } from "@shared/routes";

export function useCreateLoveLog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertLoveLog) => {
      // Basic client-side validation using the schema
      const validated = api.loveLogs.create.input.parse(data);
      
      const res = await fetch(api.loveLogs.create.path, {
        method: api.loveLogs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.loveLogs.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to save love log");
      }

      return api.loveLogs.create.responses[201].parse(await res.json());
    },
    // We don't really need to invalidate anything as we don't display the list, 
    // but good practice nonetheless
    onSuccess: () => {
      console.log("Love log created successfully");
    }
  });
}
