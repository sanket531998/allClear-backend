import { z } from "zod";

export const PremiumSchema = z.object({
  premiumCategory: z.string(),
});
