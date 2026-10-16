const { chromium } = require("playwright");

async function runQualityChecks() {
  console.log("Starting Playwright Quality Checks on http://localhost:3000 ...");

  const browser = await chromium.launch();
  const consoleErrors = [];

  // 1. DESKTOP TEST: 1440x900
  console.log("\n--- Checking Desktop (1440x900) ---");
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Browser Console Error]: ${msg.text()}`);
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await desktopPage.waitForTimeout(1000);

  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log(
    `Desktop ScrollWidth: ${desktopOverflow.scrollWidth}px, InnerWidth: ${desktopOverflow.innerWidth}px`
  );
  console.log(`Desktop Zero Overflow Passed: ${!desktopOverflow.hasOverflow}`);

  await desktopPage.screenshot({ path: "screenshot_desktop.png", fullPage: false });
  console.log("Saved screenshot_desktop.png");

  // Test ID Card hover/flip with force: true (since pendulum is dynamically swaying)
  const idCard = desktopPage.locator('[role="button"][aria-label*="Developer ID card"]');
  if (await idCard.count() > 0) {
    await idCard.hover({ force: true });
    await desktopPage.waitForTimeout(500);
    console.log("ID Card hovered successfully.");
  }

  // 2. MOBILE TEST: 390x844
  console.log("\n--- Checking Mobile (390x844) ---");
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Mobile Console Error]: ${msg.text()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await mobilePage.waitForTimeout(1000);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log(
    `Mobile ScrollWidth: ${mobileOverflow.scrollWidth}px, InnerWidth: ${mobileOverflow.innerWidth}px`
  );
  console.log(`Mobile Zero Overflow Passed: ${!mobileOverflow.hasOverflow}`);

  await mobilePage.screenshot({ path: "screenshot_mobile.png", fullPage: false });
  console.log("Saved screenshot_mobile.png");

  // Mobile menu test
  const menuBtn = mobilePage.locator('button:has-text("Menu")');
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({ path: "screenshot_mobile_menu.png" });
    console.log("Saved screenshot_mobile_menu.png (Menu opened successfully)");
  }

  // 3. CONSOLE ERRORS REPORT
  console.log("\n--- Console Errors Check ---");
  if (consoleErrors.length === 0) {
    console.log("PASSED: 0 runtime console errors detected.");
  } else {
    console.warn(`Encountered ${consoleErrors.length} console errors:`);
    consoleErrors.forEach((e) => console.log(e));
  }

  await browser.close();

  if (desktopOverflow.hasOverflow || mobileOverflow.hasOverflow) {
    process.exit(1);
  }
}

runQualityChecks().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
