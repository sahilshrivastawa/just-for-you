import { useMutation } from "@tanstack/react-query";
import { api, type InsertLoveLog } from "@shared/routes";

export function useCreateLoveLog() {
  return useMutation({
    mutationFn: async (data: InsertLoveLog) => {
      const res = await fetch(api.loveLogs.create.path, {
        method: api.loveLogs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
  });
}
