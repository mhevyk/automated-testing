import { expect } from "../base";

export default async function showsAlertWithText(page, text) {
  await page.once("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain(text);
    await dialog.accept();
  });
}
