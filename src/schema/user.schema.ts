import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain a special character"
    ),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.number().nullable(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain a special character"
    ),
});
