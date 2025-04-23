import { z } from "zod";

export const AddArticlesSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),

  location: z.string().optional().nullable(),

  categoryType: z.string(),
  categorySubType: z.string(),
  premiumCategoryType: z.string().optional().nullable(),
});

export const EmailSchema = z.object({
  email: z.string().email(),
});
