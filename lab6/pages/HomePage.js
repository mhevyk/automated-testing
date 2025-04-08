import { expect } from "../base";

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.$loginLink = "#login2";
    this.$loginUsername = "#loginusername";
    this.$loginPassword = "#loginpassword";
    this.$loginButton = '//button[normalize-space(text()) = "Log in"]';
    this.$logoutLink = "#logout2";
    this.$productList = "#tbodyid";
    this.$contactEmail = "#recipient-email";
  }

  visit() {
    return this.page.goto("https://demoblaze.com/");
  }

  async login(username, password) {
    await this.page.click(this.$loginLink);
    await this.page.fill(this.$loginUsername, username);
    await this.page.fill(this.$loginPassword, password);
    await this.page.click(this.$loginButton);
  }

  isLoggedIn() {
    return expect(
      this.page.getByRole("link", { name: "Log out" })
    ).toBeVisible();
  }

  logout() {
    return this.page.click(this.$logoutLink);
  }

  isLoggedOut() {
    return expect(this.page.locator(this.$loginLink)).toBeVisible();
  }

  clickNavbarLink(linkText, options = {}) {
    return this.page.getByRole("link", { name: linkText, ...options }).click();
  }

  isProductListVisible() {
    return expect(this.page.locator(this.$productList)).toBeVisible();
  }

  async fillContactForm({ email, name, message }) {
    await this.page.fill(this.$contactEmail, email);

    await this.page
      .getByRole("textbox", { name: "Contact Email: Contact Name:" })
      .fill(name);

    await this.page.getByRole("textbox", { name: "Message:" }).fill(message);
  }

  clickProductName(productName) {
    return this.page.getByRole("link", { name: productName }).click();
  }
}
