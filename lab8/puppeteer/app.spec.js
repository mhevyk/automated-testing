const BASE_URL = "https://books.toscrape.com";

const clickAndWaitForNavigation = async (page, selector) => {
  await Promise.all([page.click(selector), page.waitForNavigation()]);
};

describe("UI tests", () => {
  beforeEach(async () => {
    await page.goto(BASE_URL);
  });

  test("should open main page", async () => {
    const title = await page.title();
    expect(title).toMatch("Books to Scrape");
  });

  test("should navigate to different category correctly", async () => {
    await clickAndWaitForNavigation(
      page,
      'a[href="catalogue/category/books/travel_2/index.html"]'
    );

    const activeBreadcrumb = await page.waitForSelector(".breadcrumb .active");
    const activeBreadcrumbText = await activeBreadcrumb.evaluate(
      (element) => element.textContent
    );

    expect(activeBreadcrumbText).toBe("Travel");
  });

  test("should open next paginated books page correctly", async () => {
    await clickAndWaitForNavigation(page, ".pager .next a");

    expect(page.url()).toContain("page-2.html");
  });
});
