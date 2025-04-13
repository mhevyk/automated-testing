import { expect } from "@/base";

export const assersScreenshotOfElement = async (locatedElement) => {
  await expect(locatedElement).toBeVisible();
  await expect(locatedElement).toHaveScreenshot();
};
