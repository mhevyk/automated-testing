import { test, expect } from "@/base";
import {
  getAllProducts,
  getProductById,
  getProductsFilteredByCategory,
} from "@/utils/requests";

test.describe("API tests", () => {
  test("should return product list from getAllProducts", async () => {
    const mockJson = async () => [{ id: 1, title: "Product 1" }];
    const mockCtx = { get: async () => ({ json: mockJson }) };

    const { data } = await getAllProducts(mockCtx);
    expect(data).toEqual([{ id: 1, title: "Product 1" }]);
  });

  test("should return a single product from getProductById", async () => {
    const expectedId = 2;

    const mockJson = async () => ({ id: expectedId, title: "Product 2" });
    const mockCtx = {
      post: async (url, payload) => {
        expect(url).toBe("/view");
        expect(payload).toEqual({ data: { id: expectedId } });
        return { json: mockJson };
      },
    };

    const { data } = await getProductById(mockCtx, { id: expectedId });
    expect(data).toEqual({ id: expectedId, title: "Product 2" });
  });

  test("should return error message from getProductById when ID is invalid", async () => {
    const invalidId = -1;
    const mockJson = async () => ({ errorMessage: "Product not found" });

    const mockCtx = {
      post: async (url, payload) => {
        expect(url).toBe("/view");
        expect(payload).toEqual({ data: { id: invalidId } });
        return { json: mockJson };
      },
    };

    const { data } = await getProductById(mockCtx, { id: invalidId });
    expect(data).toEqual({ errorMessage: "Product not found" });
  });

  test("should return filtered products from getProductsFilteredByCategory", async () => {
    const category = "books";

    const mockJson = async () => [{ id: 3, cat: category }];
    const mockCtx = {
      post: async (url, payload) => {
        expect(url).toBe("/bycat");
        expect(payload).toEqual({ data: { cat: category } });
        return { json: mockJson };
      },
    };

    const { data } = await getProductsFilteredByCategory(mockCtx, {
      category,
    });

    expect(data).toEqual([{ id: 3, cat: category }]);
  });

  test("should return empty array from getProductsFilteredByCategory when no products found", async () => {
    const unknownCategory = "unknown";

    const mockJson = async () => [];
    const mockCtx = {
      post: async (url, payload) => {
        expect(url).toBe("/bycat");
        expect(payload).toEqual({ data: { cat: unknownCategory } });
        return { json: mockJson };
      },
    };

    const { data } = await getProductsFilteredByCategory(mockCtx, {
      category: unknownCategory,
    });

    expect(data).toEqual([]);
  });
});
