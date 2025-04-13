import { test, expect } from "@/base";

test.describe("E2E tests", () => {
  test("should login correctly", async ({ homePage }) => {
    await homePage.visit();
    await homePage.login(process.env.USER_USERNAME, process.env.USER_PASSWORD);
    await homePage.isLoggedIn();
  });

  test("should logout correctly", async ({ homePage }) => {
    await homePage.visit();
    await homePage.login(process.env.USER_USERNAME, process.env.USER_PASSWORD);
    await homePage.isLoggedIn();

    await homePage.logout();
    await homePage.isLoggedOut();
  });

  test("should send contact message correctly", async ({ homePage }) => {
    await homePage.visit();
    await homePage.clickNavbarLink("Contact");

    await homePage.fillContactForm({
      email: process.env.USER_EMAIL,
      name: process.env.USER_USERNAME,
      message: "Thanks for the message!!",
    });

    homePage.page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toContain("Thanks for the message!!");
      await dialog.accept();
    });
  });

  test("should place an order correctly", async ({
    homePage,
    productDetailsPage,
    cartPage,
  }) => {
    await homePage.visit();
    await homePage.login(process.env.USER_USERNAME, process.env.USER_PASSWORD);
    await homePage.isLoggedIn();

    await homePage.clickProductName("Iphone 6 32gb");
    await productDetailsPage.isProductTitleVisible();
    await productDetailsPage.addToCart();

    await homePage.clickNavbarLink("Home");

    await homePage.clickProductName("Samsung galaxy s6");
    await productDetailsPage.isProductTitleVisible();
    await productDetailsPage.addToCart();

    await homePage.clickNavbarLink("Cart", { exact: true });
    await cartPage.isCartVisible();
    await cartPage.isProductInCart("Iphone 6 32gb");
    await cartPage.isProductInCart("Samsung galaxy s6");

    await cartPage.clickPlaceOrderbutton();
    await cartPage.isPlaceOrderFormVisible();

    await cartPage.fillPlaceOrderForm({
      name: process.env.USER_USERNAME,
      country: "Test country",
      city: "Test city",
      creditCard: process.env.USER_CREDIT_CARD,
      month: "january",
      year: "2025",
    });

    await cartPage.finalizeOrder();
    await cartPage.isOrderCreatedSuccessfully();
  });
});
