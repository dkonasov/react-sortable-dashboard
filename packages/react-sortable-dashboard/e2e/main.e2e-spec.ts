import { launch, Browser } from "puppeteer";

jest.setTimeout(50000);

interface WidgetDimensions {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

describe("dashboard", () => {
  let browser: Browser;
  const rootElementSelector = "#root";
  const storybookBaseAddress = `http://127.0.0.1:8080/iframe.html?id=dashboard--default&viewMode=story`;

  const preparePage = async (args?: string) => {
    const url = args
      ? storybookBaseAddress + `&args=${args}`
      : storybookBaseAddress;
    const page = await browser.newPage();
    page.setDefaultTimeout(0);

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    await page.waitForSelector(rootElementSelector);

    return page;
  };

  beforeEach(async () => {
    browser = await launch();
  });

  afterEach(async () => {
    await browser.close();
  });

  it("should have same equal width and height as parent", async () => {
    const page = await preparePage();

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

  it("width and height should be greater than zero", async () => {
    const page = await preparePage();

    const [width, height] = await page.evaluate((rootElementSelector) => {
      const container = document.querySelector(rootElementSelector);
      const dashboard = container?.firstElementChild;
      return [dashboard?.clientWidth ?? 0, dashboard?.clientHeight ?? 0];
    }, rootElementSelector);

    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  describe("with widgets", () => {
    it("should render single widget with valid width, height and offset", async () => {
      const page = await preparePage();

      const [
        dashboardWidth,
        dashboardHeight,
        widgetWidth,
        widgetHeight,
        widgetX,
        widgetY,
      ] = await page.evaluate((rootElementSelector) => {
        const container = document.querySelector(rootElementSelector);
        const dashboard = container?.firstElementChild;

        return [
          dashboard?.clientWidth ?? 0,
          dashboard?.clientHeight ?? 0,
          dashboard?.firstElementChild?.clientWidth ?? 0,
          dashboard?.firstElementChild?.clientHeight ?? 0,
          (dashboard?.firstElementChild as HTMLElement).offsetLeft ?? 0,
          (dashboard?.firstElementChild as HTMLElement).offsetTop ?? 0,
        ];
      }, rootElementSelector);

      expect(widgetWidth).toEqual(dashboardWidth);
      expect(widgetHeight).toEqual(dashboardHeight);
      expect(widgetX).toBe(0);
      expect(widgetY).toBe(0);
    });

    it("should render two widgets with valid width, height and offset", async () => {
      const page = await preparePage(
        "columns:2;widgets[1][0]:1;widgets[1][1]:1"
      );

      const [dashboardWidth, dashboardHeight, widgetDimensions] =
        await page.evaluate((rootElementSelector) => {
          const container = document.querySelector(rootElementSelector);
          const dashboard = container?.firstElementChild;

          return [
            dashboard?.clientWidth ?? 0,
            dashboard?.clientHeight ?? 0,
            [
              {
                width: dashboard?.children[0].clientWidth ?? 0,
                height: dashboard?.children[0].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[0] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[0] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[1].clientWidth ?? 0,
                height: dashboard?.children[1].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[1] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[1] as HTMLElement).offsetTop ?? 0,
              },
            ],
          ] as [number, number, WidgetDimensions[]];
        }, rootElementSelector);

      expect(widgetDimensions[0].width).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[1].width).toEqual(dashboardWidth / 2);

      expect(widgetDimensions[0].height).toEqual(dashboardHeight);
      expect(widgetDimensions[1].height).toEqual(dashboardHeight);

      expect(widgetDimensions[0].offsetX).toEqual(0);
      expect(widgetDimensions[1].offsetX).toEqual(dashboardWidth / 2);

      expect(widgetDimensions[0].offsetY).toEqual(0);
      expect(widgetDimensions[1].offsetY).toEqual(0);
    });

    it("should render two widgets with different columns count with valid width, height and offset", async () => {
      const page = await preparePage(
        "columns:3;widgets[0][0]:2;widgets[1][0]:1;widgets[1][1]:1"
      );

      const [dashboardWidth, dashboardHeight, widgetDimensions] =
        await page.evaluate((rootElementSelector) => {
          const container = document.querySelector(rootElementSelector);
          const dashboard = container?.firstElementChild;

          return [
            dashboard?.clientWidth ?? 0,
            dashboard?.clientHeight ?? 0,
            [
              {
                width: dashboard?.children[0].clientWidth ?? 0,
                height: dashboard?.children[0].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[0] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[0] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[1].clientWidth ?? 0,
                height: dashboard?.children[1].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[1] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[1] as HTMLElement).offsetTop ?? 0,
              },
            ],
          ] as [number, number, WidgetDimensions[]];
        }, rootElementSelector);

      expect(widgetDimensions[0].width).toEqual((dashboardWidth / 3) * 2);
      expect(widgetDimensions[1].width).toEqual(dashboardWidth / 3);

      expect(widgetDimensions[0].height).toEqual(dashboardHeight);
      expect(widgetDimensions[1].height).toEqual(dashboardHeight);

      expect(widgetDimensions[0].offsetX).toEqual(0);
      expect(widgetDimensions[1].offsetX).toEqual((dashboardWidth / 3) * 2);

      expect(widgetDimensions[0].offsetY).toEqual(0);
      expect(widgetDimensions[1].offsetY).toEqual(0);
    });

    it("should render widgets on two rows with valid width, height and offset", async () => {
      const page = await preparePage(
        "columns:2;rows:2;widgets[1][0]:1;widgets[1][1]:1;widgets[2][0]:1;widgets[2][1]:1"
      );

      const [dashboardWidth, dashboardHeight, widgetDimensions] =
        await page.evaluate((rootElementSelector) => {
          const container = document.querySelector(rootElementSelector);
          const dashboard = container?.firstElementChild;

          return [
            dashboard?.clientWidth ?? 0,
            dashboard?.clientHeight ?? 0,
            [
              {
                width: dashboard?.children[0].clientWidth ?? 0,
                height: dashboard?.children[0].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[0] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[0] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[1].clientWidth ?? 0,
                height: dashboard?.children[1].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[1] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[1] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[2].clientWidth ?? 0,
                height: dashboard?.children[2].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[2] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[2] as HTMLElement).offsetTop ?? 0,
              },
            ],
          ] as [number, number, WidgetDimensions[]];
        }, rootElementSelector);

      expect(widgetDimensions[0].width).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[1].width).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[2].width).toEqual(dashboardWidth / 2);

      expect(widgetDimensions[0].height).toEqual(dashboardHeight / 2);
      expect(widgetDimensions[1].height).toEqual(dashboardHeight / 2);
      expect(widgetDimensions[2].height).toEqual(dashboardHeight / 2);

      expect(widgetDimensions[0].offsetX).toEqual(0);
      expect(widgetDimensions[1].offsetX).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[2].offsetX).toEqual(0);

      expect(widgetDimensions[0].offsetY).toEqual(0);
      expect(widgetDimensions[1].offsetY).toEqual(0);
      expect(widgetDimensions[2].offsetY).toEqual(dashboardHeight / 2);
    });

    it("should render widgets on two rows with multi-row widget with valid width, height and offset", async () => {
      const page = await preparePage(
        "columns:2;rows:2;widgets[0][1]:2;widgets[1][0]:1;widgets[1][1]:1;widgets[2][0]:1;widgets[2][1]:1"
      );

      const [dashboardWidth, dashboardHeight, widgetDimensions] =
        await page.evaluate((rootElementSelector) => {
          const container = document.querySelector(rootElementSelector);
          const dashboard = container?.firstElementChild;

          return [
            dashboard?.clientWidth ?? 0,
            dashboard?.clientHeight ?? 0,
            [
              {
                width: dashboard?.children[0].clientWidth ?? 0,
                height: dashboard?.children[0].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[0] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[0] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[1].clientWidth ?? 0,
                height: dashboard?.children[1].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[1] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[1] as HTMLElement).offsetTop ?? 0,
              },
              {
                width: dashboard?.children[2].clientWidth ?? 0,
                height: dashboard?.children[2].clientHeight ?? 0,
                offsetX:
                  (dashboard?.children[2] as HTMLElement).offsetLeft ?? 0,
                offsetY: (dashboard?.children[2] as HTMLElement).offsetTop ?? 0,
              },
            ],
          ] as [number, number, WidgetDimensions[]];
        }, rootElementSelector);

      expect(widgetDimensions[0].width).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[1].width).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[2].width).toEqual(dashboardWidth / 2);

      expect(widgetDimensions[0].height).toEqual(dashboardHeight);
      expect(widgetDimensions[1].height).toEqual(dashboardHeight / 2);
      expect(widgetDimensions[2].height).toEqual(dashboardHeight / 2);

      expect(widgetDimensions[0].offsetX).toEqual(0);
      expect(widgetDimensions[1].offsetX).toEqual(dashboardWidth / 2);
      expect(widgetDimensions[2].offsetX).toEqual(dashboardWidth / 2);

      expect(widgetDimensions[0].offsetY).toEqual(0);
      expect(widgetDimensions[1].offsetY).toEqual(0);
      expect(widgetDimensions[2].offsetY).toEqual(dashboardHeight / 2);
    });

    it("should not render widget if it overflows dashboard", async () => {
      const page = await preparePage(
        "columns:2;widgets[1][0]:1;widgets[1][1]:1;widgets[2][0]:1;widgets[2][1]:1"
      );

      const widgetsCount = await page.evaluate((rootElementSelector) => {
        const container = document.querySelector(rootElementSelector);
        const dashboard = container?.firstElementChild;

        return dashboard?.children.length;
      }, rootElementSelector);

      expect(widgetsCount).toBe(2);
    });
  });
});
