import z from "zod";

export const projectStatusEnum = ["active", "inactive", "completed"] as const;

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Project name must be at least 2 characters long" })
    .max(100, { error: "Project name cannot be longer than 100 characters." }),
  status: z.enum(projectStatusEnum),
  description: z
    .string()
    .optional()
    .transform((value) => value || undefined),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.email() }))
    .min(1, { error: "At least one user must be assigned to the project." })
    .max(5, { error: "Maximum of 5 users can be assigned to the project." }),
});
