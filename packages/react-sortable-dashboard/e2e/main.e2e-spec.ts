import { launch, Browser } from "puppeteer";

jest.setTimeout(50000);
describe("dashboard", () => {
  let browser: Browser;
  const rootElementSelector = "#root";

  beforeEach(async () => {
    browser = await launch();
  });

  afterEach(async () => {
    await browser.close();
  });

  it("should have same equal width and height as parent", async () => {
    const page = await browser.newPage();
    page.setDefaultTimeout(0);

    await page.goto(
      `http://127.0.0.1:8080/iframe.html?id=dashboard--default&viewMode=story`,
      {
        waitUntil: "networkidle2",
        timeout: 0,
      }
    );

    await page.waitForSelector(rootElementSelector);
    const [containerWidth, containerHeight, dashboardWidth, dashboardHeight] =
      await page.evaluate((rootElementSelector) => {
        const container = document.querySelector(rootElementSelector);
        const dashboard = container?.firstElementChild;
        return [
          container?.clientWidth ?? 0,
          container?.clientHeight ?? 0,
          dashboard?.clientWidth ?? 0,
          dashboard?.clientHeight ?? 0,
        ];
      }, rootElementSelector);

    expect(containerWidth).toBe(dashboardWidth);
    expect(containerHeight).toBe(dashboardHeight);
  });
});
