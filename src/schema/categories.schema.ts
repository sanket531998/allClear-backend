import { z } from "zod";

export const AddCategoriesSchema = z.object({
  category: z.string(),
  subCategory: z.string(),
  description: z.string(),
  // email: z.string().email(),
});

export const categorySingle = z.object({
  category: z.string(),
});

export const EditCategoriesSchema = z.object({
  categoryId: z.number(),
  category: z.string().optional().nullable(),
  subCategory: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});
