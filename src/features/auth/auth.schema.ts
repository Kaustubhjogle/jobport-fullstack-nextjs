import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 charachter long")
    .max(255, "Name must not exceed 255 characters"),
  userName: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(255, "Username must not exceed 255 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  email: z
    .email()
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 charachter long")
    .max(255, "Password must not exceed 255 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase, uppercase and one number"
    ),
  role: z
    .enum(["applicant", "employer"], {
      error: "Role must be valid",
    })
    .default("applicant"),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;

export const registerUserWithConfirmPassSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type RegisterUserWithConfirmPassData = z.infer<
  typeof registerUserWithConfirmPassSchema
>;

export const loginUserSchema = z.object({
  email: z
    .email()
    .trim()
    .max(255, "Email cannot be larger than 255 characters")
    .toLowerCase(),
  password: z
    .string()
    .max(255, "Password must not exceed 255 characters"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
