import * as utils from "./sample";

describe("test", () => {
  test("should return 0 for log2 of 1", () => {
    expect(utils.log2(1)).toBe(0);
  });

  test("should return 1 for log2 of 2", () => {
    expect(utils.log2(2)).toBe(1);
  });

  test("should return 2 for log2 of 4", () => {
    expect(utils.log2(4)).toBe(2);
  });

  test("should return 3 for log2 of 8", () => {
    expect(utils.log2(8)).toBe(3);
  });

  test("should return Infinity for log2 of 0", () => {
    const result = utils.log2(0);
    expect(Number.isFinite(result)).toBe(false);
  });
});

describe("exp", () => {
  test("should return 1 for exp of 0", () => {
    expect(utils.exp(0)).toBe(1);
  });

  test("should return Euler's number for exp of 1", () => {
    expect(utils.exp(1)).toBeCloseTo(Math.E);
  });

  test("should return 1/E for exp of -1", () => {
    expect(utils.exp(-1)).toBeCloseTo(1 / Math.E);
  });

  test("should return E squared for exp of 2", () => {
    expect(utils.exp(2)).toBeCloseTo(Math.E ** 2);
  });

  test("should return 1/(E squared) for exp of -2", () => {
    expect(utils.exp(-2)).toBeCloseTo(1 / Math.E ** 2);
  });
});

describe("sin", () => {
  test("should return 0 for sin of 0", () => {
    expect(utils.sin(0)).toBe(0);
  });

  test("should return 1 for sin of π/2", () => {
    expect(utils.sin(Math.PI / 2)).toBeCloseTo(1);
  });

  test("should return 0 for sin of π", () => {
    expect(utils.sin(Math.PI)).toBeCloseTo(0);
  });

  test("should return -1 for sin of 3π/2", () => {
    expect(utils.sin((3 * Math.PI) / 2)).toBeCloseTo(-1);
  });

  test("should return 0 for sin of 2π", () => {
    expect(utils.sin(2 * Math.PI)).toBeCloseTo(0);
  });
});
