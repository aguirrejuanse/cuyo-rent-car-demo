import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "https://cuyo-rent-car-demo.vercel.app";
const OUT = new URL("./public/shots/", import.meta.url).pathname;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

const shot = async (name) => {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}${name}.png` });
  console.log("✓", name);
};

// 01 — hero
await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
await shot("hero");

// 02 — flota
await page.locator("text=Nuestra flota").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollBy(0, -90));
await shot("flota");

// 03 — reserva: step 0 (trip)
await page.goto(`${BASE}/es/reservar?utm_source=instagram`, { waitUntil: "networkidle" });
await shot("reserva-viaje");

// step 1 (car pick)
await page.getByRole("button", { name: "Continuar" }).first().click();
await shot("reserva-auto");

// step 2 (extras) — check "Entrega a domicilio"-style first extra
await page.getByRole("button", { name: "Continuar" }).first().click();
await page.locator("input[type=checkbox]").first().check();
await shot("reserva-extras");

// step 3 (details + summary)
await page.getByRole("button", { name: "Continuar" }).first().click();
await page.locator("input").nth(0).fill("Martín González");
await page.locator("input[type=email]").fill("martin@mail.com");
await page.locator("input").nth(2).fill("+54 9 261 555 1234");
await page.locator("input").nth(3).fill("B-12345678");
await shot("reserva-datos");

// 05 — confirmation
await page.getByRole("button", { name: "Confirmar reserva" }).click();
await page.waitForTimeout(800);
await shot("confirmada");

// 07 — panel
await page.goto(`${BASE}/es/panel`, { waitUntil: "networkidle" });
await shot("panel");

await browser.close();
console.log("done →", OUT);
