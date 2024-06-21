import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, 'Title should not be empty'),
  topicId: z.string().min(1, 'Select a topic'),
  // text: z.string().min(1, 'Text should not be empty'),
});
