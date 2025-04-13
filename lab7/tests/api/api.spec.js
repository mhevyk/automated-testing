import { test, expect } from "@/base";
import { productShape } from "@/utils/matchers";
import {
  getAllProducts,
  getProductById,
  getProductsFilteredByCategory,
} from "@/utils/requests";

test.describe("API tests", () => {
  let ctx;

  test.beforeAll(async ({ playwright }) => {
    const baseURL = process.env.API_BASE_URL;
    ctx = await playwright.request.newContext({ baseURL });
  });

  test.afterAll(async () => {
    await ctx.dispose();
  });

  test("should get all products correctly", async () => {
    const { data } = await getAllProducts(ctx);

    expect(data.Items).toEqual(expect.arrayContaining([productShape]));
  });

  test("should get existing product by id correctly", async () => {
    const { data } = await getProductById(ctx, { id: "1" });

    expect(data).toEqual(productShape);
  });

  test("should return response with error message if product was not found by id", async () => {
    const { data } = await getProductById(ctx, { id: "-5" });

    expect(data).not.toHaveProperty("id");
    expect(data.errorMessage).toMatch(/not found/i);
  });

  test("should filter by existing category correctly", async () => {
    const expectedCategory = "Phones";

    const { data } = await getProductsFilteredByCategory(ctx, {
      category: expectedCategory,
    });

    for (const item of data.Items) {
      expect(item.cat).toBe(expectedCategory);
    }
  });

  test("should return empty array if items for category were not found", async () => {
    const { data } = await getProductsFilteredByCategory(ctx, {
      category: "notexistingcategory",
    });

    expect(data.Items).toEqual([]);
  });
});
