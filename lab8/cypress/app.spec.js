const BASE_URL = "https://books.toscrape.com";

describe("UI tests", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("should open main page", () => {
    cy.title().should("include", "Books to Scrape");
  });

  it("should navigate to different category correctly", () => {
    cy.get('a[href="catalogue/category/books/travel_2/index.html"]').click();
    cy.get(".breadcrumb .active").should("have.text", "Travel");
  });

  it("should open next paginated books page correctly", () => {
    cy.get(".pager .next a").click();
    cy.url().should("include", "page-2.html");
  });
});
