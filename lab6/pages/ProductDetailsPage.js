import { expect } from "../base";

export default class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    this.$addToCartButton = "#add-to-cart";
    this.$productName = ".name";
  }

  async visit({ productId }) {
    await this.page.goto(`https://demoblaze.com/prod.html?idp_=${productId}`);
  }

  async isProductTitleVisible() {
    await expect(this.page.locator(this.$productName)).toBeVisible();
  }

  async addToCart() {
    await this.page.getByRole("link", { name: "Add to cart" }).click();
  }
}
