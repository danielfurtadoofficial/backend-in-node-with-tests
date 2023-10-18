import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("increase string date by 1 year", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(year + 1);
});
