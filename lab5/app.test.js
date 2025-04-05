const BASE_URL = "https://books.toscrape.com";

const getActiveBreadcrumbText = async (page) => {
  const activeBreadcrumb = await page.waitForSelector(".breadcrumb .active");
  return await activeBreadcrumb.evaluate((element) => element.textContent);
};

const clickAndWaitForNavigation = async (page, selector) => {
  await Promise.all([page.click(selector), page.waitForNavigation()]);
};

describe("Books to Scrape UI tests", () => {
  test("should open main page", async () => {
    await page.goto(BASE_URL);
    const title = await page.title();
    expect(title).toMatch("Books to Scrape");
  });

  test("should navigate to different category correctly", async () => {
    await page.goto(BASE_URL);

    await clickAndWaitForNavigation(
      page,
      'a[href="catalogue/category/books/travel_2/index.html"]'
    );

    expect(await getActiveBreadcrumbText(page)).toBe("Travel");
  });

  test("should open book details page correctly", async () => {
    await page.goto(BASE_URL);

    const bookTitle = "Sapiens: A Brief History of Humankind";

    await clickAndWaitForNavigation(
      page,
      `.product_pod img[alt='${bookTitle}']`
    );

    await page.waitForSelector(".table.table-striped");
    expect(await getActiveBreadcrumbText(page)).toBe(bookTitle);
  });

  test("should display price for all books in the visible list", async () => {
    await page.goto(BASE_URL);

    const prices = await page.$$eval(
      ".product_price .price_color",
      (elements) => elements.map((element) => element.textContent.trim())
    );

    prices.forEach((price) => {
      expect(price).toMatch(/^£\d+(\.\d{2})?$/);
    });
  });

  test("should open next paginated books page correctly", async () => {
    await page.goto(BASE_URL);
    await clickAndWaitForNavigation(page, ".pager .next a");

    expect(page.url()).toContain("page-2.html");
  });

  test("should open previous paginated books page correctly", async () => {
    const secondPageUrl = new URL("catalogue/page-2.html", BASE_URL).href;
    await page.goto(secondPageUrl);

    await clickAndWaitForNavigation(page, ".pager .previous a");

    expect(page.url()).toContain("page-1.html");
  });

  test("should not display pagination controls if the results count is less than 20", async () => {
    await page.goto(BASE_URL);

    await clickAndWaitForNavigation(
      page,
      'a[href="catalogue/category/books/travel_2/index.html"]'
    );

    const previousPaginationButton = await page.$(".pager .previous a");
    expect(previousPaginationButton).toBeNull();

    const nextPaginationButton = await page.$(".pager .next a");
    expect(nextPaginationButton).toBeNull();
  });
});
