import { promises as fs } from "node:fs";
import path from "node:path";

export type Locale = "es" | "en";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
};

export type Post = PostMeta & { content: string };

const ROOT = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(/^---\s*\n([\s\S]+?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const [, key, valueRaw] = kv;
    const value = valueRaw.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
  return { data, content: m[2] };
}

export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const dir = path.join(ROOT, locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const posts = await Promise.all(
    files.filter((f) => f.endsWith(".mdx")).map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data } = parseFrontmatter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? "1970-01-01"),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        cover: typeof data.cover === "string" ? data.cover : null,
      };
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const file = path.join(ROOT, locale, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      cover: typeof data.cover === "string" ? data.cover : null,
      content,
    };
  } catch {
    return null;
  }
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
