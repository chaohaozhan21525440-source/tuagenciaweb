import { chromium } from "playwright";
import path from "node:path";
import { promises as fs } from "node:fs";

const TARGETS = [
  { slug: "dentistlab", url: "https://dentistlab.surge.sh" },
  { slug: "chinaway", url: "https://chinaway.vercel.app/es" },
  { slug: "reformlab", url: "https://reformlab-barcelona.surge.sh" },
  { slug: "forma", url: "https://forma-clinica.surge.sh" },
];

async function main() {
  const out = path.join(process.cwd(), "public", "portfolio");
  await fs.mkdir(out, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

  for (const t of TARGETS) {
    const page = await ctx.newPage();
    console.log(`Capturing ${t.url}…`);
    try {
      await page.goto(t.url, { waitUntil: "load", timeout: 60_000 });
      // Best-effort wait for networkidle, but don't fail if it doesn't settle (analytics/polling)
      await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(out, `${t.slug}.png`), fullPage: false });
    } catch (e) {
      console.error(`Failed to capture ${t.url}:`, (e as Error).message);
    }
    await page.close();
  }

  // Hero variant (same as dentistlab) and placeholder (same image as a generic preview)
  try {
    await fs.copyFile(path.join(out, "dentistlab.png"), path.join(out, "dentistlab-hero.png"));
    await fs.copyFile(path.join(out, "dentistlab.png"), path.join(out, "placeholder.png"));
  } catch (e) {
    console.warn("Could not create derived images:", (e as Error).message);
  }

  await browser.close();
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
