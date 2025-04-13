import { expect } from "@/base";

export const productShape = expect.objectContaining({
  cat: expect.any(String),
  desc: expect.any(String),
  id: expect.any(Number),
  img: expect.any(String),
  price: expect.any(Number),
  title: expect.any(String),
});
