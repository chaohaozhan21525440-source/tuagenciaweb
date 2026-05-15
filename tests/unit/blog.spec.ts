import { describe, it, expect, beforeAll } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import { listPosts, getPost, readingTime } from "@/lib/blog";

const SEED = `---
title: Test Post
description: A short description.
date: 2026-05-10
tags: [seo, performance]
cover: /og/test.png
---

# Hello

Some markdown body with a few words to count.
`;

beforeAll(async () => {
  await fs.mkdir(path.join(process.cwd(), "content/blog/es"), { recursive: true });
  await fs.writeFile(path.join(process.cwd(), "content/blog/es/test-post.mdx"), SEED, "utf8");
});

describe("blog loader", () => {
  it("lists posts ordered by date desc", async () => {
    const posts = await listPosts("es");
    expect(posts[0].slug).toBe("test-post");
    expect(posts[0].title).toBe("Test Post");
  });

  it("gets a single post by slug with parsed frontmatter", async () => {
    const post = await getPost("es", "test-post");
    expect(post).not.toBeNull();
    expect(post!.title).toBe("Test Post");
    expect(post!.tags).toEqual(["seo", "performance"]);
    expect(post!.content).toContain("Hello");
  });

  it("returns null for unknown slug", async () => {
    const post = await getPost("es", "does-not-exist");
    expect(post).toBeNull();
  });

  it("estimates reading time in minutes (>=1)", () => {
    expect(readingTime("word ".repeat(200))).toBeGreaterThanOrEqual(1);
  });
});
