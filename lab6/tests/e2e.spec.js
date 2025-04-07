import { test } from "../base";
import showsAlertWithText from "../utils/showsAlertWithText";

const { USER_EMAIL, USER_USERNAME, USER_PASSWORD } = process.env;

test.describe("e2e tests suite", () => {
  test("should login correctly", async ({ homePage }) => {
    await homePage.visit();
    await homePage.login(USER_USERNAME, USER_PASSWORD);
    await homePage.isLoggedIn();
  });

  test.describe(() => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.visit();
      await homePage.login(USER_USERNAME, USER_PASSWORD);
    });

    test("should logout correctly", async ({ homePage }) => {
      await homePage.logout();
      await homePage.isLoggedOut();
    });

    test("should send contact message correctly", async ({ homePage }) => {
      await homePage.clickNavbarLink("Contact");

      await homePage.fillContactForm({
        email: USER_EMAIL,
        name: USER_USERNAME,
        message: "Thanks for the message!!",
      });

      await showsAlertWithText(homePage.page, "Thanks for the message!!");
    });

    test("should place an order correctly", async ({
      homePage,
      productDetailsPage,
      cartPage,
    }) => {
      await homePage.clickProductName("Iphone 6 32gb");
      await productDetailsPage.isProductTitleVisible();
      await productDetailsPage.addToCart();
      await showsAlertWithText(productDetailsPage.page, "Product added");

      await homePage.visit();
      await homePage.isProductListVisible();

      await homePage.clickProductName("Samsung galaxy s6");
      await productDetailsPage.isProductTitleVisible();
      await productDetailsPage.addToCart();
      await showsAlertWithText(productDetailsPage.page, "Product added");

      await homePage.visit();
      await homePage.isProductListVisible();

      await homePage.clickNavbarLink("Cart");
      await cartPage.isProductInCart("Iphone 6 32gb");
      await cartPage.isProductInCart("Samsung galaxy s6");

      await cartPage.clickPlaceOrderbutton();
      await cartPage.isPlaceOrderFormVisible();

      await cartPage.fillPlaceOrderForm({
        name: USER_USERNAME,
        country: "Test country",
        city: "Test city",
        creditCard: "1234567890123456",
        month: "january",
        year: "2025",
      });

      await cartPage.finalizeOrder();
      await cartPage.isOrderCreatedSuccessfully();
    });
  });
});
