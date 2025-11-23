// 导入 glob 加载器（loader）
import { glob } from "astro/loaders";
// 从 `astro:content` 导入工具函数
import { z, defineCollection } from "astro:content";

// Blog 集合
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

// Moments 集合
const moments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/pages/moments" }),
  schema: z.object({
    title: z.string().optional(),
    date: z.date(),
    images: z.array(z.string()).optional()
  })
});


// 导出集合
export const collections = { blog, moments };