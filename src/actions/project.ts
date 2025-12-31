"use server";

import z from "zod";
import { projectSchema } from "@/schemas/project";

export const createProject = async (unsafeData: z.infer<typeof projectSchema>) => {
  const data = projectSchema.safeParse(unsafeData);

  if (!data.success) {
    return { success: false, message: z.prettifyError(data.error) };
  }

  return { success: true, message: "Project created successfully" };
};
