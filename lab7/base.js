import { test as base } from "@playwright/test";
import HomePage from "@/pages/HomePage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import CartPage from "@/pages/CartPage";

export const test = base.extend({
  homePage: ({ page }, use) => use(new HomePage(page)),
  productDetailsPage: ({ page }, use) => use(new ProductDetailsPage(page)),
  cartPage: ({ page }, use) => use(new CartPage(page)),
});

export { expect } from "@playwright/test";
