import { z } from "zod";

export const createActivitySchema = z.object({
  activity: z.string().min(3, "Activity must be at least 3 characters"),
});

export const updateActivitySchema = z.object({
  activity: z.string().min(3, "Activity must be at least 3 characters"),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
