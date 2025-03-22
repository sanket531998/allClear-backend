import { z } from "zod";

export const AddCategoriesSchema = z.object({
  category: z.string(),
  subCategory: z.string(),
  description: z.string(),
  email: z.string().email(),
});
