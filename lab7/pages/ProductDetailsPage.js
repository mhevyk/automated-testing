import { expect } from "@/base";

export default class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.$addToCartButton = "#add-to-cart";
    this.$productName = ".name";
  }

  isProductTitleVisible() {
    return expect(this.page.locator(this.$productName)).toBeVisible();
  }

  addToCart() {
    return this.page.getByRole("link", { name: "Add to cart" }).click();
  }
}
