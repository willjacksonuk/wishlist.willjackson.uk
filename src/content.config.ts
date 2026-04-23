import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const wishlist = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/wishlist" }),
  schema: z.object({
    title: z.string(),
    brand: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    price: z.string().optional(),
    code: z.string().optional(),
    priority: z.enum(["high", "medium", "low"]).optional(),
  }),
});

export const collections = { wishlist };
