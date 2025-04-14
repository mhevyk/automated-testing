const isHeadless = process.env.HEADLESS !== "false";

export default {
  launch: {
    headless: isHeadless,
    slowMo: !isHeadless ? 50 : 0,
  },
};
