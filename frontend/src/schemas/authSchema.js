// schemas/authSchemas.js
import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
});