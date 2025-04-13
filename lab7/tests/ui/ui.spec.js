import { test } from "@/base";
import { assersScreenshotOfElement } from "../../utils/screenshots";

test.describe("UI tests", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.visit();
  });

  test("should display company logo correctly", async ({ homePage }) => {
    const logo = homePage.page.locator("#nava > img");
    await assersScreenshotOfElement(logo);
  });

  test("should display navbar menu correctly", async ({ homePage }) => {
    const navbarMenu = homePage.page.locator("#navbarExample > ul");
    await assersScreenshotOfElement(navbarMenu);
  });

  test("should display footer correctly", async ({ homePage }) => {
    const footer = homePage.page.locator("#footc");
    await assersScreenshotOfElement(footer);
  });

  test("should display copyright correctly", async ({ homePage }) => {
    const copyright = homePage.page.getByRole("contentinfo");
    await assersScreenshotOfElement(copyright);
  });

  test("should display login form correctly", async ({ homePage }) => {
    await homePage.clickNavbarLink("Log in");

    const loginForm = homePage.page.getByText("Log in × Username: Password:");
    await assersScreenshotOfElement(loginForm);
  });
});
