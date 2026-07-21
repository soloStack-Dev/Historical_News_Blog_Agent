import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(10000, "Content must be at most 10000 characters"),
  category: z.enum(["politics", "society", "science", "archive", "letters", "gallery"], {
    message: "Please select a valid category",
  }),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
