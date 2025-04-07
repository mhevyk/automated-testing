import { expect } from "../base";

export default class CartPage {
  constructor(page) {
    this.page = page;

    this.$cartTable = ".table";
  }

  async visit() {
    await this.page.goto("https://demoblaze.com/cart.html");
  }

  async isProductInCart(productName) {
    await expect(this.page.locator(this.$cartTable)).toContainText(productName);
  }

  async isPlaceOrderFormVisible() {
    await expect(
      this.page.getByRole("button", { name: "Place Order" })
    ).toBeVisible();
  }

  async clickPlaceOrderbutton() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }

  async fillPlaceOrderForm({ name, country, city, creditCard, month, year }) {
    await this.page.getByRole("textbox", { name: "Name:" }).fill(name);
    await this.page.getByRole("textbox", { name: "Country:" }).fill(country);
    await this.page.getByRole("textbox", { name: "City:" }).fill(city);

    await this.page
      .getByRole("textbox", { name: "Credit Card:" })
      .fill(creditCard);

    await this.page.getByRole("textbox", { name: "Month:" }).fill(month);
    await this.page.getByRole("textbox", { name: "Year:" }).fill(year);
  }

  async finalizeOrder() {
    await this.page.getByRole("button", { name: "Purchase" }).click();
  }

  async isOrderCreatedSuccessfully() {
    await expect(
      this.page.getByText("Thank you for your purchase!")
    ).toBeVisible();

    await expect(this.page.getByText("Id:")).toBeVisible();
    await expect(this.page.getByText("Amount:")).toBeVisible();
    await expect(this.page.getByText("Card Number:")).toBeVisible();
    await expect(this.page.getByText("Name:", { exact: true })).toBeVisible();
    await expect(this.page.getByText("Date:")).toBeVisible();
    await expect(this.page.getByRole("button", { name: "OK" })).toBeVisible();
  }
}
